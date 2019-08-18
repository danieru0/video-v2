import Video from '../models/video';
import User from '../models/user';

export default {
	Video: {
		author: async (parent, args, req) => {
			const video = await Video.findById(parent._id).populate('author').select('-password');
	
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
				if (req.userId) {
					const user = await User.findById(req.userId).select('isAdmin');
					if (!user.isAdmin) {
						args.author !== req.userId && (query.status = 'public');
					}
				} else {
					query.status = 'public';
				}
			
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
		},
		getVideo: async (parent, args, req) => {
			try {
				const video = await Video.findById(args.id);
				if (!video) throw new Error('Video not found!');

				if (video.status === 'private') {
					if (req.userId) {
						if (req.userId === video.author) {
							return video;
						} else {
							throw new Error('Video is private!');
						}
					}
				}

				return video;
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
					path: args.path,
					length: args.length,
					_id: args._id
				});

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
				if (!me.rules.canComment) throw new Error('You cant make comments!');

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

				const user = await User.findById(req.userId).select("uploadedVideos rules");
				if (!user.uploadedVideos.includes(args.id)) throw new Error('This video is not uploaded by you!');

				if (!user.rules.canEditVideos) throw new Error('You cant edit videos!');

				const selectedVideo = await Video.findById(args.id);
				if (!selectedVideo) throw new Error('Video not found!');

				args.title && (selectedVideo.title = args.title);
				args.description && (selectedVideo.description = args.description);
				args.status && (selectedVideo.status = args.status);
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
		},
		removeVideo: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const user = await User.findById(req.userId);
				if (!user.uploadedVideos.includes(args.id)) throw new Error('This video is not uploaded by you!');

				const selectedVideo = await Video.findById(args.id);
				if (!selectedVideo) throw new Error('Video not found!');

				await Video.findByIdAndRemove(args.id);
				user.uploadedVideos.pull(args.id);
				await user.save();

				return true
			} catch (err) {
				throw err;
			}
		}
	}
}