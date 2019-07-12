import axios from 'axios';
import stringifyObject from 'stringify-object';

const CancelToken = axios.CancelToken;
let cancel;

export const cancelUsersRequest = () => {
	return dispatch => {
		cancel();
	}
}

export const getUsers = (args) => {
	const argsForGraphql = stringifyObject(args, { singleQuotes: false });
	const query = argsForGraphql.substring(1, argsForGraphql.length - 1);

	return async dispatch => {
		try {
			const result = await axios({
				url: '/graphql',
				method: 'post',
				cancelToken: new CancelToken(function executor(c) {
					cancel = c;
				}),
				data: {
					query: `
						query {
							users(${query}) {
								nick
								profile {
									avatar
								}
							}
						}
					`
				},
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			dispatch({
				type: 'UPDATE_USERS',
				data: result.data.data.users
			});
		} catch (err) {
			if (!axios.isCancel) {
				throw err;
			}
		}
	}
}

export const clearUsers = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_USERS'
		});
	}
}

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
									id
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

export const getUserFavouritesVideos = () => {
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
								likedVideos {
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
						}
					`
				}
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			dispatch({
				type: 'UPDATE_FAVOURITES_VIDEOS',
				data: result.data.data.me.likedVideos
			});
		} catch(err) {
			throw err;
		}
	}
}

export const getUserHistoryVideos = () => {
	return async dispatch => {
		try {
			const result = await axios({
				url: '/graphql',
				method: 'post',
				cancelToken: new CancelToken(function executor(c) {
					cancel = c;
				}),
				headers: {
					'Authorization': localStorage.getItem('token')
				},
				data: {
					query: `
						query {
							me {
								history {
									videos {
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
							}
						}
					`
				}
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			dispatch({
				type: 'UPDATE_HISTORY_VIDEOS',
				data: result.data.data.me.history.videos
			});
		} catch (err) {
			if (!axios.isCancel) {
				throw err;
			}
		}
	}
}

export const getUserHistorySearch = () => {
	return async dispatch => {
		try {
			const result = await axios({
				url: '/graphql',
				method: 'post',
				cancelToken: new CancelToken(function executor(c) {
					cancel = c;
				}),
				headers: {
					'Authorization': localStorage.getItem('token')
				},
				data: {
					query: `
						query {
							me {
								history {
									search
								}
							}
						}
					`
				}
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			dispatch({
				type: 'UPDATE_HISTORY_SEARCH',
				data: result.data.data.me.history.search
			});
		} catch (err) {
			if (!axios.isCancel) {
				throw err;
			}
		}
	}
}

export const clearUserFavouritesVideos = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_FAVOURITES_VIDEOS'
		});
	}
}

export const clearUserHistoryVideos = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_HISTORY_VIDEOS'
		});
	}
}

export const clearUserHistorySearch = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_HISTORY_SEARCH'
		});
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
			});

			dispatch({
				type: 'SHOW_ALERT',
				message: 'Comment has beed created!',
				alertType: 'normal'
			});

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

			if (result.data.data.toggleLikeVideo.result) {
				dispatch({
					type: 'SHOW_ALERT',
					message: 'Video has been liked!',
					alertType: 'normal'
				});
			} else {
				dispatch({
					type: 'SHOW_ALERT',
					message: 'Video has been unliked!',
					alertType: 'normal'
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

export const addVideoToHistory = id => {
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
							addVideoToHistory(id: "${id}") {
								_id
							}
						}
					`
				}
			});
		} catch (err) {
			throw err;
		}
	}
}