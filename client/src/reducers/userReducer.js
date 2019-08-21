const initState = {
	user: null,
	users: null,
	userProfile: null,
	isLiked: null,
	historyVideos: null,
	historySearch: null,
	makeCommentError: false
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
		case 'UPDATE_PROFILE':
			return {
				...state,
				user: {
					...state.user,
					profile: action.data
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
		case 'ADD_HISTORY_VIDEOS':
			return {
				...state,
				historyVideos: [...state.historyVideos, ...action.data]
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
		case 'UPDATE_USER_PROFILE':
			return {
				...state,
				userProfile: action.data
			}
		case 'CLEAR_USER_PROFILE':
			return {
				...state,
				userProfile: action.data
			}
		case 'SET_MAKE_COMMENT_ERROR': 
			return {
				...state,
				makeCommentError: true
			}
		case 'CLEAR_MAKE_COMMENT_ERROR':
			return {
				...state,
				makeCommentError: false
			}
		default: return state;
	}
}

export default userReducer;