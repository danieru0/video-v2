import jwt from 'jsonwebtoken';

import SECRET from '../secret';

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (!token) throw new Error('No token provided!');

		const { userId } = await jwt.verify(token, SECRET);
		req.userId = userId;
		next();
	} catch (err ) {
		res.status(401).send(err);
	}
}