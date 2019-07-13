import User from '../models/user';
import Video from '../models/video';

export default {
	User: {
		playlists: async (parent, args) => {
			if (args.id) {
				const user = await User.find({_id: parent._id, "playlists._id": args.id}, { "playlists.$": 1 }).populate({
					path: "playlists.videos"
				});
				return user[0].playlists;			
			} else {
				const user = await User.findById(parent._id).populate('playlists.videos');
				return user.playlists;
			}
		}
	},
	Mutation: {
		createPlaylist: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

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
		},
		removePlaylist: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const result = await User.findByIdAndUpdate(req.userId, {
					$pull: {
						playlists: {
							_id: args.id
						}
					}
				}, { new: true });

				return result.playlists;
			} catch (err) {
				throw err;
			}
		},
		addVideoToPlaylist: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const user = await User.findById(req.userId);
				const selectedPlaylist = user.playlists.filter(playlist => playlist._id == args.playlistid)[0];

				selectedPlaylist.videos.push(args.videoid);
				const result = await user.save();

				return result.playlists;
			} catch (err) {
				throw err;
			}
		},
		removeVideoFromPlaylist: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				const result = await User.findOneAndUpdate({ _id: req.userId, "playlists._id": args.playlistid }, {
					$pull: {
						"playlists.$.videos": args.videoid
					}
				}, { new: true });

				return result.playlists;
			} catch (err) {
				throw err;
			}
		},
		changePlaylistStatus: async (parent, args, req) => {
			try {
				if (!req.userId) throw new Error('Not authenticated!');

				if (args.status !== 'public' && args.status !== 'private') throw new Error('Wrong status type! Available: public, private');
				
				const result = await User.findOneAndUpdate({ _id: req.userId, "playlists._id": args.playlistid }, {
					"playlists.$.status": args.status
				}, { new: true });

				return result.playlists;

			} catch (err) {
				throw err;
			}
		}
	}
}