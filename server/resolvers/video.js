import Video from '../models/video';

export default {
	Mutation: {
		createVideo: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');
				const video = new Video({
					title: args.title,
					description: args.description,
					miniature: args.miniature,
					status: args.status,
					author: req.userId,
					path: args.path
				})

				const result = await video.save();
				return result;
			} catch (err) {
				throw err;
			}
		}
	}
}