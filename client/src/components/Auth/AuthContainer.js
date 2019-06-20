import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Login from './Login';
import Register from './Register';

class AuthContainer extends Component {
	render() {
		const { type } = this.props;
		return (
			<>
				{
					type === 'login'
						? <Login />
						: <Register />
				}
			</>
		);
	}
}

AuthContainer.propTypes = {
	type: PropTypes.oneOf(['login', 'register']).isRequired
};

export default AuthContainer;