import User from '../models/user';
import Video from '../models/video';

export default {
	Mutation: {
		adminSetRules: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const me = await User.findById(req.userId).select('isAdmin');
				if (!me.isAdmin) throw new Error('Not admin!');
				
				const selectedUser = await User.findById(args.id).select('rules');
				if (!selectedUser) throw new Error('User not found!');

				const rules = {};
				args.hasOwnProperty('canUpload') && (rules.canUpload = args.canUpload);
				args.hasOwnProperty('canComment') && (rules.canComment = args.canComment);
				args.hasOwnProperty('canUseSettings') && (rules.canUseSettings = args.canUseSettings);
				args.hasOwnProperty('canEditVideos') && (rules.canEditVideos = args.canEditVideos);

				const newRules = {...selectedUser.rules, ...rules};
				delete newRules['$init'];
				selectedUser.rules = newRules;

				const result = await selectedUser.save();
				return result.rules
			} catch (err) {
				throw err;
			}
		},
		adminSetVideoInfo: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const me = await User.findById(req.userId).select('isAdmin');
				if (!me.isAdmin) throw new Error('Not admin!');

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
		adminChangeProfileInfo: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const me = await User.findById(req.userId).select('isAdmin');
				if (!me.isAdmin) throw new Error('Not admin!');

				const selectedUser = await User.findById(args.id).select('profile isAdmin');
				if (!selectedUser) throw new Error('User not found!');

				args.hasOwnProperty('admin') && (selectedUser.isAdmin = args.admin);

				selectedUser.profile = { ...selectedUser.profile, ...args };
				const result = await selectedUser.save();

				return result.profile;
			} catch (err) {
				throw err;
			}
		},
		adminRemoveVideo: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const me = await User.findById(req.userId).select('isAdmin');
				if (!me.isAdmin) throw new Error('Not admin!');

				const selectedVideo = await Video.findById(args.id);
				if (!selectedVideo) throw new Error('Video not found!');
				
				const author = await User.findById(selectedVideo.author);
				author.uploadedVideos.pull(args.id);
				await Video.findByIdAndRemove(args.id);
				const result = await author.save();

				return result;
			} catch (err) {
				throw err;
			}
		}
	}
}