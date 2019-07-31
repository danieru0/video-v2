const initState = {
	users: null,
	oneUser: null
}

const adminReducer = (state = initState, action) => {
	switch(action.type) {
		case 'UPDATE_USERS':
			return {
				...state,
				users: action.data
			}
		case 'UPDATE_ONE_USER':
			return {
				...state,
				oneUser: action.data
			}
		case 'CLEAR_ONE_USER':
			return {
				...state,
				oneUser: null
			}
		default: return state;
	}
}

export default adminReducer;