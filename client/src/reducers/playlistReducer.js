const initState = {
	playlistInfo: null,
	playlistRemoved: null
}

const playlistReducer = (state = initState, action) => {
	switch(action.type) {
		case 'UPDATE_PLAYLIST_INFO':
			return {
				...state,
				playlistInfo: action.data
			}
		case 'CLEAR_PLAYLIST_INFO':
			return {
				...state,
				playlistInfo: null
			}
		case 'SET_PLAYLIST_REMOVED':
			return {
				...state,
				playlistRemoved: action.data
			}
		case 'REMOVE_VIDEO':
			const newPlaylistInfoVideos = state.playlistInfo.videos.filter(video => video._id !== action.data);
			return {
				...state,
				playlistInfo: {
					...state.playlistInfo,
					videos: newPlaylistInfoVideos
				}
			}
		default: return state;
	}
}

export default playlistReducer;