import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function withoutAuth(ComponentToCheck) {
	class AuthHoc extends Component {
		constructor() {
			super();
			this.state = {
				token: null
			}
		}

		componentDidMount() {
			this.setState({
				token: localStorage.getItem('token')
			});
		}

		render() {
			if (this.state.token) {
				return <Redirect to="/" />
			}
			return (
				<ComponentToCheck {...this.props} />
			);
		}
	}
	
	return AuthHoc;
}
