import jwt from 'jsonwebtoken';

import SECRET from '../secret';

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		if (token) {
			const { userId } = await jwt.verify(token, SECRET);
			req.userId = userId;
		}
	} catch (err) {
		req.userId = null;
	}

	req.next();
}