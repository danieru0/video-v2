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
			throw err;
		}
	}
}

export const getVideos = (args, showMore, infiniteScroll) => {
	const argsForGraphql = stringifyObject(args, { singleQuotes: false });
	const query = argsForGraphql.substring(1, argsForGraphql.length - 1);

	return async dispatch => {
		try {
			if (showMore) {
				dispatch({
					type: 'CLEAR_ONE_VIDEO'
				});
			}

			const queryData = showMore ? (
				`
					query {
						videos(${query}) {
							_id
							title
							description
							miniature
							author {
								nick
								_id
								profile {
									avatar
								}
							}
							createdAt
						}
					}
				`
			) : (
				`
					query {
						videos(${query}) {
							_id
							title
							views
							length
							likes
							status
							author {
								nick
							}
						}
					}
				`
			)

			const result = await axios({
				url: '/graphql',
				method: 'post',
				headers: {
					'Authorization': localStorage.getItem('token')
				},
				data: {
					query: queryData
				}
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			if (showMore) {
				dispatch({
					type: 'UPDATE_ONE_VIDEO',
					data: result.data.data.videos[0]
				});
			} else {
				if (infiniteScroll) {
					if (result.data.data.videos.length !== 0) {
						dispatch({
							type: 'ADD_VIDEOS',
							data: result.data.data.videos
						});
					}
				} else {
					dispatch({
						type: 'UPDATE_VIDEOS',
						data: result.data.data.videos
					});	
				}
			}
		} catch (err) {
			throw err;
		}
	}
}

export const changeProfileInfo = args => {
	const argsForGraphql = stringifyObject(args, { singleQuotes: false });
	const query = argsForGraphql.substring(1, argsForGraphql.length - 1);
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
							adminChangeProfileInfo(${query}) {
								background
								avatar
								description
								joined
							}
						}
					`
				}
			});

			console.log(result.data);

			dispatch({
				type: 'UPDATE_ONE_USER_PROFILE',
				data: result.data.data.adminChangeProfileInfo
			});
			dispatch({
				type: 'SHOW_ALERT',
				message: 'Saved!',
				alertType: 'normal'
			});
		} catch (err) {
			throw err;
		}
	}
}

export const changeRules = args => {
	const argsForGraphql = stringifyObject(args, { singleQuotes: false });
	const query = argsForGraphql.substring(1, argsForGraphql.length - 1);
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
							adminSetRules(${query}) {
								canComment
								canUseSettings
								canEditVideos
								canUpload
							}
						}
					`
				}
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			dispatch({
				type: 'SHOW_ALERT',
				message: 'Rules saved!',
				alertType: 'normal'
			});
		} catch (err) {
			throw err;
		}
	}
}

export const getHistory = args => {
	const argsForGraphql = stringifyObject(args, { singleQuotes: false });
	const query = argsForGraphql.substring(1, argsForGraphql.length - 1);
	return async dispatch => {
		try {
			let result = await axios({
				url: '/graphql',
				method: 'post',
				headers: {
					'Authorization': localStorage.getItem('token')
				},
				data: {
					query: `
						query {
							users(${query}) {
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
									search
								}
							}
						}
					`
				}
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			dispatch({
				type: 'UPDATE_HISTORY',
				data: result.data.data.users[0].history
			});
		} catch (err) {
			throw err;
		}
	}
}

export const changeVideoInfo = args => {
	const argsForGraphql = stringifyObject(args, { singleQuotes: false });
	const query = argsForGraphql.substring(1, argsForGraphql.length - 1);

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
							adminSetVideoInfo(${query}) {
								title
								description
								miniature
							}
						}
					`
				}
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			dispatch({
				type: 'UPDATE_ONE_VIDEO_INFO',
				data: result.data.data.adminSetVideoInfo
			});
			dispatch({
				type: 'SHOW_ALERT',
				message: 'Informations saved!',
				alertType: 'normal'
			});
		} catch (err) {
			throw err;
		}
	}
}

export const removeVideo = id => {
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
							adminRemoveVideo(id: "${id}") {
								_id
							}
						}
					`
				}
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			dispatch({
				type: 'REMOVE_VIDEO_ADMIN'
			});
			dispatch({
				type: 'SHOW_ALERT',
				message: 'Video removed!',
				alertType: 'normal'
			});
		} catch (err) {
			throw err;
		}
	}
}