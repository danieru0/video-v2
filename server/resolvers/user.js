import User from '../models/user';
import Video from '../models/video';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import SECRET from '../secret';

export default {
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
		}
	}
}