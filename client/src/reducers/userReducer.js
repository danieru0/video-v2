const initState = {
	user: null,
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
		default: return state;
	}
}

export default userReducer;