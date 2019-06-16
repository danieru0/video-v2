import User from '../models/user';
import Video from '../models/video';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import SECRET from '../secret';

export default {
	User: {
		uploadedVideos: async (parent, args) => {
			const user = await User.findById(parent._id).populate('uploadedVideos');
			
			return user.uploadedVideos;
		},
		playlists: async (parent, args) => {
			const user = await User.findById(parent._id).populate('playlists.videos');

			return user.playlists;
		}
	},
	Query: {
		users: async (parent, args) => {
			try {
				const query = {};
				args.nick && (query.nick = {"$regex": args.nick, "$options": "i"});
				args.id && (query._id = args.id);

				const options = {
					page: args.page,
					limit: args.limit
				}

				const result = await User.paginate(query, options);
				return result.docs;
			} catch (err) {
				throw err;
			}
		},
		me: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const user = await User.findById(req.userId);
				return user;
			} catch (err) {
				throw err;
			}
		}
	},
	Mutation: {
		createUser: async (parent, args) => {
			try {
				const existingUser = await User.findOne({ email: args.email });
				if (existingUser) throw new Error('User already exists');
	
				const hashedPassword = await bcryptjs.hash(args.password, 12);
				const user = new User({
					email: args.email,
					password: hashedPassword,
					nick: args.nick
				});
	
				const result = await user.save();
				return result;			
			} catch (err) {
				throw err;
			}
		},
		loginUser: async (parent, args) => {
			try {
				const existingUser = await User.findOne({ email: args.email });
				if (!existingUser) throw new Error('Wrong email or password!');

				const valid = await bcryptjs.compare(args.password, existingUser.password);
				if (!valid) throw new Error('Wrong email or password!');

				const token = jwt.sign({ userId: existingUser.id }, SECRET, { expiresIn: '30d' });
				return {
					token,
					user: existingUser
				}
			} catch (err) {
				throw err;
			}
		},
		createPlaylist: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated');

				const user = await User.findById(req.userId);
				if (!user) throw new Error('User not found');

				const playlist = {
					status: args.status,
					name: args.name,
					videos: []
				}
				user.playlists.push(playlist);
				const result = await user.save();
				return result.playlists;
			} catch (err) {
				throw err;
			}
		}
	}
}