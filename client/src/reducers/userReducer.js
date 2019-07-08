const initState = {
	user: null,
	users: null,
	isLiked: null
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
		default: return state;
	}
}

export default userReducer;