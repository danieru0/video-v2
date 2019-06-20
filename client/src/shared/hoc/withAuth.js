import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToCheck) {
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
			if (!this.props.token) {
				return <Redirect to="/login" />
			}

			return (
				<ComponentToCheck {...this.props} />
			);
		}
	}

	return AuthHoc;
}