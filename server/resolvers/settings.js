import Settings from '../models/settings';
import user from './user';

export default {
	Query: {
		getSettings: async (parent, args) => {
			const settings = await Settings.find({});

			return settings[0];
		}
	},
	Mutation: {
		changeSettings: async (parent, args, req) => {
			try {

				const result = await Settings.findOneAndUpdate({}, { ...args }, { new: true });
				return result;
			} catch (err) {
				throw err;
			}
		}
	}
}