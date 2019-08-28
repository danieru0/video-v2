import User from '../models/user';

module.exports = async (req, res, next) => {
	try {
		const user = await User.findById(req.userId).select('rules');
		if (!user.rules.canUseSettings) {
			throw new Error('Settings are blocked for you!');
		}

		next();
	} catch (err) {
		res.status(401).send(err.message)
	}
}