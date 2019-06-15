import User from '../models/user';

export default {
	Mutation: {
		createUser: (parent, args) => {
			const user = new User({
				email: args.email,
				password: args.password,
				nick: args.nick
			});

			return user.save().then(result => {
				return result;
			}).catch(err => {
				throw err;
			})
		}
	}
}