import axios from 'axios';
import stringifyObject from 'stringify-object';

export const getUsers = (args, showMore) => {
	const argsForGraphql = stringifyObject(args, { singleQuotes: false });
	const query = argsForGraphql.substring(1, argsForGraphql.length - 1);

	return async dispatch => {
		try {

			if (showMore) {
				dispatch({
					type: 'CLEAR_ONE_USER'
				});
			}

			const queryData = showMore ? (
				`
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
			) : (
				`
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
							isAdmin
						}
					}
				`
			)
			const result = await axios({
				url: '/graphql',
				method: 'post',
				data: {
					query: queryData
				}
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			if (showMore) {
				dispatch({
					type: 'UPDATE_ONE_USER',
					data: result.data.data.users
				});
			} else {
				dispatch({
					type: 'UPDATE_USERS',
					data: result.data.data.users
				});
			}
		} catch (err) {

		}
	}
}