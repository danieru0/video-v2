import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopNav from '../components/Nav/TopNav';
import SideNav from '../components/Nav/SideNav/SideNav';

import { getFrontUserInformations } from '../actions/userAction';

class NavContainer extends Component {
	constructor() {
		super();
		this.state = {
			mobileMenu: false
		}
	}

	componentDidMount() {
		if (localStorage.getItem('token')) {
			this.props.getFrontUserInformations();
		}
	}

	toggleNavMenu = () => {
		this.setState({
			mobileMenu: !this.state.mobileMenu
		});
	}

	render() {
		return (
			<>
				<SideNav toggleNavMenu={this.toggleNavMenu} mobileMenu={this.state.mobileMenu} />
				<TopNav toggleNavMenu={this.toggleNavMenu} />
			</>
		);
	}
}

export default connect(null, { getFrontUserInformations })(NavContainer);