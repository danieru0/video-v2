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

				if (req.userId) {
					if (args.title) {
						const user = await User.findById(req.userId).select('history');
						user.history.search.push(args.title);
						await user.save();
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
		},
		changeVideoInfo: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const user = await User.findById(req.userId).select("uploadedVideos");
				if (!user.uploadedVideos.includes(args.id)) throw new Error('This video is not uploaded by you!');

				const selectedVideo = await Video.findById(args.id);
				if (!selectedVideo) throw new Error('Video not found!');

				args.title && (selectedVideo.title = args.title);
				args.description && (selectedVideo.description = args.description);
				if (args.miniature == 'default') {
					selectedVideo.miniature = 'https://beamimagination.com/wp-content/uploads/2017/09/video-placeholder.png';
				} else if (args.miniature) {
					selectedVideo.miniature = args.miniature;
				}

				const result = await selectedVideo.save();
				return result;
			} catch (err) {
				throw err;
			}
		},
		addVideoToHistory: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const user = await User.findById(req.userId);
				user.history.videos.push(args.id);
				const result = await user.save();

				return result;
			} catch (err) {
				throw err;
			}	
		}
	}
}