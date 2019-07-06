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
			})
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

			console.log('added');
		} catch (err) {
			throw err;
		}
	}
}