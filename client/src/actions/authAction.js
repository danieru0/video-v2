import axios from 'axios';

export const signIn = (email, password) => {
	return async dispatch => {
		try {
			dispatch({
				type: 'SET_AUTH_PROCESS',
				data: true
			});

			const result = await axios({
				url: '/graphql',
				method: 'post',
				data: {
					query: `
						mutation {
							loginUser(email: "${email}", password: "${password}") {
								token
							}
						}
					`
				}
			});
			if (result.data.errors) throw (result.data.errors[0].message);
			
			localStorage.setItem('token', result.data.data.loginUser.token);

		} catch (err) {
			dispatch({
				type: 'SET_AUTH_ERRORS',
				data: {
					email: err,
					password: err
				}
			});
			dispatch({
				type: 'SET_AUTH_PROCESS',
				data: false
			});
		}
	}
}