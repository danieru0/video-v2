import axios from 'axios';

export const getFrontUserInformations = () => {
	return async dispatch => {
		try {
			const result = await axios({
				url: '/graphql',
				method: 'post',
				headers: {
					'Authorization': localStorage.getItem('token')
				},
				data: {
					query: `
						query {
							me {
								nick
								playlists {
									name
									status
								}
							}
						}
					`
				}
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			console.log(result.data);

		} catch (err) {
			console.log(err);
		}
	}
}