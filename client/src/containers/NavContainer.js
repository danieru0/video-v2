import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TopNav from '../components/Nav/TopNav';
import SideNav from '../components/Nav/SideNav/SideNav';
import PlaylistModal from '../shared/Modal/PlaylistModal';

import { getFrontUserInformations } from '../actions/userAction';

const WithRouterSideNav = withRouter(props => <SideNav {...props}/>)

class NavContainer extends Component {
	constructor() {
		super();
		this.state = {
			mobileMenu: false,
			playlistModal: false,
			admin: false
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.location.pathname !== this.props.location.pathname) {
			if (this.props.location.pathname.split('/')[1] === 'admin') {
				this.setState({
					admin: true
				});
			} else {
				this.setState({
					admin: false
				});	
			}
		}
	}

	componentDidMount() {
		if (localStorage.getItem('token')) {
			this.props.getFrontUserInformations();
		}
		if (this.props.location.pathname.split('/')[1] === 'admin') {
			this.setState({
				admin: true
			});
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
				{
					this.state.admin || (
						<>
							<WithRouterSideNav openPlaylistModal={this.openPlaylistModal} toggleNavMenu={this.toggleNavMenu} mobileMenu={this.state.mobileMenu} />
							<TopNav toggleNavMenu={this.toggleNavMenu} />
						</>
					)
				}

			</>
		);
	}
}

export default connect(null, { getFrontUserInformations })(withRouter(NavContainer));