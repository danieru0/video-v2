import axios from 'axios';

export const createPlaylist = (name) => {
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
							createPlaylist(name: "${name}", status: "public") {
								status
								name
								id
							}
						}
					`
				}
			});

			if (result.data.errors) throw (result.data.errors[0].message);

			dispatch({
				type: 'UPDATE_PLAYLISTS',
				data: result.data.data.createPlaylist
			});
			dispatch({
				type: 'SHOW_ALERT',
				message: 'Playlist created!',
				alertType: 'normal'
			});
		} catch (err) {
			throw err;
		}
	}
}

export const addVideoToPlaylist = (playlistid, videoid) => {
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
							addVideoToPlaylist(playlistid: "${playlistid}", videoid: "${videoid}") {
								name
							}
						}
					`
				}
			});

			if (result.data.errors) throw (result.data.errors[0].message);

			dispatch({
				type: 'SHOW_ALERT',
				message: 'Video added to playlist!',
				alertType: 'normal'
			});
		} catch (err) {
			throw err;
		}
	}
}

export const getUserPlaylist = (nick, playlistId) => {
	return async dispatch => {
		try {
			const result = await axios({
				url: '/graphql',
				method: 'post',
				data: {
					query: `
						query {
							users(nick: "${nick}", page: 1, limit: 1) {
								playlists(id: "${playlistId}") {
									status
									name
									id
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

			result.data.data.users[0].playlists[0].videos.reverse();

			dispatch({
				type: 'UPDATE_PLAYLIST_INFO',
				data: result.data.data.users[0].playlists[0]
			});
		} catch (err) {
			throw err;
		}
	}
}

export const changePlaylistStatus = (playlistId, status) => {
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
							changePlaylistStatus(playlistid: "${playlistId}", status: "${status}") {
								status
								name
								id
							}
						}
					`
				}
			});

			if (result.data.errors) throw (result.data.errors[0].message);

			dispatch({
				type: 'UPDATE_PLAYLISTS',
				data: result.data.data.changePlaylistStatus
			});
			dispatch({
				type: 'SHOW_ALERT',
				message: 'Playlist has been updated!',
				alertType: 'normal'
			});
		} catch (err) {
			throw err;
		}
	}
}

export const removePlaylist = id => {
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
							removePlaylist(id: "${id}") {
								status
								name
								id
							}
						}
					`
				}
			});
			if (result.data.errors) throw (result.data.errors[0].message);

			dispatch({
				type: 'UPDATE_PLAYLISTS',
				data: result.data.data.removePlaylist
			});
			dispatch({
				type: 'SET_PLAYLIST_REMOVED',
				data: true
			});
			dispatch({
				type: 'SHOW_ALERT',
				message: 'Playlist has been removed!',
				alertType: 'normal'
			});
		} catch (err) {
			throw err;
		}
	}
}

export const clearPlaylistInfo = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_PLAYLIST_INFO'
		});
		dispatch({
			type: 'SET_PLAYLIST_REMOVED',
			data: null
		});
	}
}