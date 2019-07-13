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