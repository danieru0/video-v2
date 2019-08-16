export const showAlert = (message, alertType) => {
	return dispatch => {
		dispatch({
			type: 'SHOW_ALERT',
			message: message,
			alertType: alertType
		})
	}
}