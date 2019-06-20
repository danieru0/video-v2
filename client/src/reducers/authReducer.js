const initState = {
	authProcess: false,
	authErrors: {
		nick: null,
		email: null,
		password: null
	}
}

const authReducer = (state = initState, action) => {
	switch(action.type) {
		case 'SET_AUTH_PROCESS': 
			return {
				...state,
				authProcess: action.data
			}
		case 'SET_AUTH_ERRORS':
			return {
				...state,
				authErrors: action.data
			}
		default: return state;
	}
}

export default authReducer;