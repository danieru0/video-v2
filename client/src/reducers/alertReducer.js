const initState = {
	alert: null,
	alertType: 'normal',
	message: ''
}

const alertReducer = (state = initState, action) => {
	switch(action.type) {
		case 'SHOW_ALERT':
			return {
				...state,
				alert: Math.random(),
				message: action.message,
				alertType: action.alertType
			}
		default: return state;
	}
}

export default alertReducer;