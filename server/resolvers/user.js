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
		likedVideos: async (parent, args) => {
			const user = await User.findById(parent._id).populate('likedVideos');

			return user.likedVideos;
		},
		history: async (parent, args) => {
			const user = await User.findById(parent._id).populate('history.videos');

			return user.history;
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
		},
		checkIfUserLikedVideo: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const user = await User.findById(req.userId).select("likedVideos");

				if (user.likedVideos.includes(args.id)) {
					return {
						result: true
					}
				} else {
					return {
						result: false
					}
				}
			} catch (err) {
				throw err;
			}
		}
	},
	Mutation: {
		createUser: async (parent, args) => {
			try {
				if (args.nick.trim().length > 10) throw new Error('nick:Nick is too long! Maximum length is 10 characters!');

				const existingUserNick = await User.findOne({ nick: args.nick });
				if (existingUserNick) throw new Error('nick:This nick is taken!');

				const existingUserEmail = await User.findOne({ email: args.email });
				if (existingUserEmail) throw new Error('email:This email is taken');

				const hashedPassword = await bcryptjs.hash(args.password, 12);
				const user = new User({
					email: args.email,
					password: hashedPassword,
					nick: args.nick.trim()
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
		changeProfileInfo: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const me = await User.findById(req.userId).select('profile rules');
				if (!me.rules.canUseSettings) throw new Error('You cant use settings!');

				me.profile = {...me.profile, ...args};
				const result = await me.save();

				return result.profile;
			} catch (err) {
				throw err;
			}
		},
		toggleLikeVideo: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const video = await Video.findById(args.id);
				if (!video) throw new Error('Video not found!');

				const user = await User.findById(req.userId);
				if (args.boolean) {
					if (user.likedVideos.includes(video._id)) throw new Error('Video is already liked!');
					user.likedVideos.push(video._id);
					video.likes += 1;
					await user.save();
					await video.save();
					return {
						result: true
					}
				} else {
					if (!user.likedVideos.includes(video._id)) throw new Error('Video is not liked!');
					user.likedVideos.pull(video._id);
					video.likes -= 1;
					await user.save();
					await video.save();
					return {
						result: false
					}
				}
			} catch (err) {
				throw err;
			}
		}
	}
}