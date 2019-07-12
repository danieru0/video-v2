const initState = {
	user: null,
	users: null,
	isLiked: null,
	historyVideos: null,
	historySearch: null
}

const userReducer = (state = initState, action) => {
	switch(action.type) {
		case 'UPDATE_USER_INFO':
			return {
				...state,
				user: {...state.user, ...action.data}
			}
		case 'UPDATE_IS_LIKED':
			return {
				...state,
				isLiked: action.data
			}
		case 'UPDATE_PLAYLISTS':
			return {
				...state,
				user: {
					...state.user,
					playlists: action.data
				}
			}
		case 'UPDATE_USERS':
			return {
				...state,
				users: action.data
			}
		case 'CLEAR_USERS':
			return {
				...state,
				users: null
			}
		case 'UPDATE_HISTORY_VIDEOS':
			return {
				...state,
				historyVideos: action.data
			}
		case 'CLEAR_HISTORY_VIDEOS':
			return {
				...state,
				historyVideos: null
			}
		case 'UPDATE_HISTORY_SEARCH':
			return {
				...state,
				historySearch: action.data
			}
		case 'CLEAR_HISTORY_SEARCH':
			return {
				...state,
				historySearch: null
			}
		default: return state;
	}
}

export default userReducer;