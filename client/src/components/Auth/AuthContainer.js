import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Login from './Login';
import Register from './Register';

import { signIn } from '../../actions/authAction';

class AuthContainer extends Component {

	handleSubmit = (e, email, password) => {
		e.preventDefault();
		this.props.signIn(email, password);
	}

	render() {
		const { type, authProcess, authErrors } = this.props;
		return (
			<>
				{
					type === 'login'
						? <Login authErrors={authErrors} authProcess={authProcess} handleSubmit={this.handleSubmit} />
						: <Register />
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

export default connect(mapStateToProps, { signIn })(AuthContainer);