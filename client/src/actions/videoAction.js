import axios from 'axios';
import stringifyObject from 'stringify-object';

export const getVideos = (args, updatePopular) => {
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
							videos(${query}) {
								_id
								title
								views
								miniature
								length
								author {
									nick
								}
								createdAt
							}
						}
					`
				}
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			if (updatePopular) {
				dispatch({
					type: 'UPDATE_POPULAR_VIDEOS',
					data: result.data.data.videos
				});
			} else {
				dispatch({
					type: 'UPDATE_VIDEOS',
					data: result.data.data.videos
				})
			}
		} catch (err) {
			throw err;
		}
	}
}