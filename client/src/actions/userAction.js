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

export const makeComment = (id, text) => {
	return async dispatch => {
		try {
			await axios({
				url: '/graphql',
				method: 'post',
				headers: {
					'Authorization': localStorage.getItem('token')
				},
				data: {
					query: `
						mutation {
							addComment(videoid: "${id}", text: "${text}") {
								text
							}
						}
					`
				}
			})

		} catch (err) {
			throw err;
		}
	}
}

export const toggleLike = (id, boolean) => {
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
						mutation {
							toggleLikeVideo(id: "${id}", boolean: ${boolean}) {
								result
							}
						}
					`
				}
			})

			if (!result.data.errors) {
				dispatch({
					type: 'UPDATE_IS_LIKED',
					data: result.data.data.toggleLikeVideo.result
				});
			}
		} catch (err) {
			throw err;
		}
	}
}

export const checkIfLiked = id => {
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
							checkIfUserLikedVideo(id: "${id}") {
								result
							}
						}
					`
				}
			});
			if (!result.data.errors) {
				dispatch({
					type: 'UPDATE_IS_LIKED',
					data: result.data.data.checkIfUserLikedVideo.result
				});
			}
		} catch (err) {
			throw err;
		}
	}
}