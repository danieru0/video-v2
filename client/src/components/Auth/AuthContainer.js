import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Login from './Login';
import Register from './Register';

import { signIn, signUp } from '../../actions/authAction';

class AuthContainer extends Component {

	handleLoginSubmit = (e, email, password) => {
		e.preventDefault();
		this.props.signIn(email, password);
	}

	handleRegisterSubmit = (e, nick, email, password) => {
		e.preventDefault();
		this.props.signUp(nick, email, password);
	}

	render() {
		const { type, authProcess, authErrors } = this.props;
		return (
			<>
				{
					type === 'login'
						? <Login authErrors={authErrors} authProcess={authProcess} handleSubmit={this.handleLoginSubmit} />
						: <Register authErrors={authErrors} authProcess={authProcess} handleSubmit={this.handleRegisterSubmit} />
				}
			</>
		);
	}
}

AuthContainer.propTypes = {
	type: PropTypes.oneOf(['login', 'register']).isRequired
};

const mapStateToProps = state => {
	return {
		authProcess: state.authReducer.authProcess,
		authErrors: state.authReducer.authErrors
	}
}

export default connect(mapStateToProps, { signIn, signUp })(AuthContainer);