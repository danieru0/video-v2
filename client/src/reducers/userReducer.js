const initState = {
	user: null
}

const userReducer = (state = initState, action) => {
	switch(action.type) {
		case 'UPDATE_USER_INFO':
			return {
				...state,
				user: {...state.user, ...action.data}
			}
		default: return state;
	}
}

export default userReducer;