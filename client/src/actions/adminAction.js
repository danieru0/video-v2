import axios from 'axios';
import stringifyObject from 'stringify-object';

export const getUsers = args => {
	const argsForGraphql = stringifyObject(args, { singleQuotes: false });
	const query = argsForGraphql.substring(1, argsForGraphql.length - 1);

	return async dispatch => {
		try {
			const result = await axios({
				url: '/graphql',
				method: 'post',
				data: {
					query: `
						query {
							users(${query}) {
								_id
								email
								nick
								rules {
									canUpload
									canComment
									canUseSettings
									canEditVideos
								}
								profile {
									background
									avatar
									description
									joined
								}
								isAdmin
							}
						}
					`
				}	
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			dispatch({
				type: 'UPDATE_USERS',
				data: result.data.data.users
			});
		} catch (err) {

		}
	}
}