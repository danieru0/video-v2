import jwt from 'jsonwebtoken';
import User from '../models/user';

import SECRET from '../secret';

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (!token) throw new Error('No token provided!');

		const { userId } = await jwt.verify(token, SECRET);
		if (!userId) throw error('Not authenticated!');
		
		req.userId = userId;

		const user = await User.findById(userId).select('rules');
		if (!user.rules.canUpload) {
			throw error('Video upload is blocked for you!');
		}

		next();
	} catch (err) {
		res.sendStatus(401);
	}
}