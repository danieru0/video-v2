import User from '../models/user';
import Settings from '../models/settings';

module.exports = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId).select('rules');
		if (!user.rules.canUpload) {
			throw error('Video upload is blocked for you!');
		}

		const settings = await Settings.find({});
		if (!settings[0].videoUpload) {
			throw error('Video upload is blocked!');
		}

		next();
	} catch (err) {
		res.sendStatus(401);
	}
}