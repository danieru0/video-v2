const initState = {
	users: null
}

const adminReducer = (state = initState, action) => {
	switch(action.type) {
		case 'UPDATE_USERS':
			return {
				...state,
				users: action.data
			}
		default: return state;
	}
}

export default adminReducer;