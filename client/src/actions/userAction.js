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
								profile {
									avatar
								}
								email
								playlists {
									status
									name
								}
								rules {
									canUpload
								}
							}
						}
					`
				}
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			dispatch({
				type: 'UPDATE_USER_INFO',
				data: result.data.data.me
			});

		} catch (err) {
			if (err === 'Not authenticated!') {
				localStorage.removeItem('token');
				window.location = '/login';
			}
		}
	}
}