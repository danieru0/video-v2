import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToCheck) {
	class AuthHoc extends Component {
		render() {
			if (!localStorage.getItem('token')) {
				return <Redirect to="/login" />
			}

			return (
				<ComponentToCheck {...this.props} />
			);
		}
	}

	return AuthHoc;
}