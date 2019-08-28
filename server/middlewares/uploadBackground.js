import Settings from '../models/settings';

module.exports = async (req, res, next) => {
	try {
		const settings = await Settings.find({});
		if (!settings[0].uploadBackground) {
			throw new Error('Background upload is blocked!');
		}

		next();
	} catch (err) {
		res.status(401).send(err.message);
	}
}