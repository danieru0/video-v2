import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopNav from '../components/Nav/TopNav';
import SideNav from '../components/Nav/SideNav/SideNav';
import PlaylistModal from '../shared/Modal/PlaylistModal';

import { getFrontUserInformations } from '../actions/userAction';

class NavContainer extends Component {
	constructor() {
		super();
		this.state = {
			mobileMenu: false,
			playlistModal: true
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

	openPlaylistModal = () => {
		this.setState({
			playlistModal: true
		});
	}

	hidePlaylistModal = () => {
		this.setState({
			playlistModal: false
		});
	}

	render() {
		return (
			<>
				{
					this.state.playlistModal && <PlaylistModal onExit={this.hidePlaylistModal} />
				}
				<SideNav openPlaylistModal={this.openPlaylistModal} toggleNavMenu={this.toggleNavMenu} mobileMenu={this.state.mobileMenu} />
				<TopNav toggleNavMenu={this.toggleNavMenu} />
			</>
		);
	}
}

export default connect(null, { getFrontUserInformations })(NavContainer);