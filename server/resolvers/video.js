import Video from '../models/video';
import User from '../models/user';

export default {
	Query: {
		videos: async (parent, args) => {
			try {
				const videos = await Video.find();
				return videos;
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
		}
	}
}