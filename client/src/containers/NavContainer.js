import React, { Component } from 'react';

import TopNav from '../components/Nav/TopNav';
import SideNav from '../components/Nav/SideNav/SideNav';

class NavContainer extends Component {
	render() {
		return (
			<>
				<TopNav />
				<SideNav />
			</>
		);
	}
}

export default NavContainer;