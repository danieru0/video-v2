export const clearHistory = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_HISTORY'
		});
	}
}

export const clearVideos = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_VIDEOS'
		})
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

export const clearMakeCommentError = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_MAKE_COMMENT_ERROR'
		});
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

export const clearUsers = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_USERS'
		});
	}
}

export const clearUserProfile = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_USER_PROFILE'
		});
	}
}

export const clearSingleVideo = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_SINGLE_VIDEO'
		});
	}
}

export const clearUserVideos = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_USER_VIDEOS'
		});
	}
}

export const clearEditVideo = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_EDIT_VIDEO'
		});
	}
}

export const clearVideosProfile = () => {
	return dispatch => {
		dispatch({
			type: 'CLEAR_PROFILE_VIDEOS'
		});
	}
}