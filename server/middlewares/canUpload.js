import User from '../models/user';

module.exports = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId).select('rules');
		if (!user.rules.canUpload) {
			throw error('Video upload is blocked for you!');
		}

		next();
	} catch (err) {
		res.sendStatus(401);
	}
}