import Video from '../models/video';
import User from '../models/user';

export default {
	Video: {
		author: async (parent, args, req) => {
			const video = await Video.findById(parent._id).populate('author');

			return video.author;
		},
		comments: async (parent, args) => {
			const video = await Video.findById(parent._id).populate('comments.author');

			return video.comments;
		}
	},
	Query: {
		videos: async (parent, args, req) => {
			try {
				const query = {};
				args.author && (query.author = args.author);
				args.title && (query.title = {"$regex": args.title, "$options": "i"});
				args.id && (query._id = args.id);
				if (req.userId) args.author !== req.userId && (query.status = 'public');

				const options = {
					page: args.page,
					limit: args.limit
				}
				if (args.sort) {
					switch (args.sort) {
						case 'newest':
							options.sort = { createdAt: '-1' }
							break;
						case 'oldest':
							options.sort = { createdAt: '1' }
							break;
						case 'popular':
							options.sort = { views: '-1' }
						default: break;
					}
				}

				const result = await Video.paginate(query, options);
				return result.docs;
			} catch (err) {
				throw err;
			}
		}
	},
	Mutation: {
		createVideo: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const user = await User.findById(req.userId);
				if (!user) throw new Error('User not found');

				const video = new Video({
					title: args.title,
					description: args.description,
					miniature: args.miniature,
					status: args.status,
					author: req.userId,
					path: args.path
				})

				user.uploadedVideos.push(video);
				await user.save();

				const result = await video.save();
				return result;
			} catch (err) {
				throw err;
			}
		},
		increaseViews: async (parent, args) => {
			try {
				const result = await Video.findByIdAndUpdate(args.id, { $inc: { views: 1 } }, { new: true });
				return { views: result.views };
			} catch (err) {
				throw err;
			}
		},
		addComment: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const me = await User.findById(req.userId).select('rules');
				if (!me.rules.canComment) throw new Error('Comments has been bocked! Contact administrator!');

				const video = await Video.findById(args.videoid);
				if (!video) throw new Error('Video not found');

				const comment = {
					text: args.text,
					author: req.userId
				}
				video.comments.push(comment);

				const result = await video.save();
				return {
					text: args.text,
					author: result
				}
			} catch (err) {
				throw err;
			}
		}
	}
}