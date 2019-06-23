import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function withoutAuth(ComponentToCheck) {
	class AuthHoc extends Component {
		render() {
			if (localStorage.getItem('token')) {
				return <Redirect to="/" />
			}
			return (
				<ComponentToCheck {...this.props} />
			);
		}
	}
	
	return AuthHoc;
}
