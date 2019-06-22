import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopNav from '../components/Nav/TopNav';
import SideNav from '../components/Nav/SideNav/SideNav';

import { getFrontUserInformations } from '../actions/userAction';

class NavContainer extends Component {

	componentDidMount() {
		if (localStorage.getItem('token')) {
			this.props.getFrontUserInformations();
		}
	}

	render() {
		return (
			<>
				<TopNav />
				<SideNav />
			</>
		);
	}
}

export default connect(null, { getFrontUserInformations })(NavContainer);