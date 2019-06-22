import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';

import User from './User';

const SideNavContainer = styled.div`
	width: 250px;
	height: 100vh;
	background: #ffffff;
	border-right: 1px solid #E7E7E7;
	font-family: 'Lato';
	overflow-y: auto;
`

const SideNavLogo = styled.div`
	width: 100%;
	height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #E7E7E7;
`

const StyledLinkLogo = styled(Link)`
	text-decoration: none;
	display: flex;
	justify-content: center;
	align-items: center;
`

const StyledIconLogo = styled(FontAwesome)`
	color: #1FA37B;
	font-size: 26px;
	margin-right: 6px;
`

const StyledIconText = styled.p`
	font-size: 26px;
	margin: 0;
	color: ${({color}) => color}
	font-weight: bold;
	letter-spacing: -1px;
`

const SideNavList = styled.ul`
	padding: 0;
	margin: 0;
	list-style: none;
	width: 100%;
`

const SideNavItem = styled.li`
	width: 100%;
	height: 60px;
`

const SideNavStyledLink = styled(Link)`
	text-decoration: none;
	color: #000;
	font-weight: bold;
	letter-spacing: -1px;
	font-size: 18px;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	background: ${({active}) => active && '#E6F5F0'}
	color: ${({active}) => active && '#10A074'}

	.fa {
		color: ${({active}) => active && '#10A074'}
	}

	&:hover .fa {
		color: #10A074;
	}

	&:hover {
		color: #10A074;
		background: #E6F5F0;
	}
`

const StyledSideNavIcon = styled(FontAwesome)`
	font-size: 24px;
	color: #ADADAD;
	margin-right: 24px;
	margin-left: 32px;
`

const SideNavLine = styled.div`
	width: 100%;
	height: 1px;
	background: #E7E7E7;
	position: relative;
`

const SideNavAddPlaylistButton = styled.button`
	padding: 6px 10px;
	background: #fff;
	border-radius: 5px;
	border: 2px solid #B4B4B4;
	cursor: pointer;
	position: absolute;
	right: 10px;
	top: -15px;
	outline: none;
`

const StyledButtonIcon = styled(FontAwesome)`
	font-size: 18px;
	color: #B4B4B4;
`

class SideNav extends Component {
	constructor() {
		super();
		this.state = {
			activeRoute: '/'
		}
	}

	componentDidMount() {
		this.setState({
			activeRoute: window.location.pathname
		})
	}

	changeRoute = route => {
		this.setState({
			activeRoute: route
		})
	}

	render() {
		const { user } = this.props;
		return (
			<SideNavContainer>
				<Scrollbars>
					<SideNavLogo>
						<StyledLinkLogo to="/">
							<StyledIconLogo name="play" />
							<StyledIconText color="#000">Video.</StyledIconText>
							<StyledIconText color="#7D7D7D">v2</StyledIconText>
						</StyledLinkLogo>
					</SideNavLogo>
					<User />
					<SideNavList>
						<SideNavItem>
							<SideNavStyledLink onClick={() => this.changeRoute('/')} active={this.state.activeRoute === '/' ? 1 : 0} to="/">
								<StyledSideNavIcon name="home" />
								Home
							</SideNavStyledLink>
						</SideNavItem>
						{
							user && (
								<>
									<SideNavItem>
										<SideNavStyledLink onClick={() => this.changeRoute('/favourites')} active={this.state.activeRoute === '/favourites' ? 1 : 0} to="/favourites">
											<StyledSideNavIcon name="heart" />
											Favourites
										</SideNavStyledLink>
									</SideNavItem>
									<SideNavItem>
										<SideNavStyledLink onClick={() => this.changeRoute('/history')} active={this.state.activeRoute === '/history' ? 1 : 0} to="/history">
											<StyledSideNavIcon name="history" />
											History
										</SideNavStyledLink>
									</SideNavItem>
								</>
							)
						}
						<SideNavLine>
							{
								user && (
									<SideNavAddPlaylistButton>
										<StyledButtonIcon name="plus"/>
									</SideNavAddPlaylistButton>
								)
							}
						</SideNavLine>
						{
							user && (
								user.playlists.map((item, index) => {
									return (
										<SideNavItem key={index}>
											<SideNavStyledLink onClick={() => this.changeRoute(`${user.nick}/playlist/${item.name}`)} active={this.state.activeRoute === `${user.nick}/playlist/${item.name}` ? 1 : 0} to={`/${user.nick}/playlist/${item.name}`}>
												<StyledSideNavIcon name={item.status === 'public' ? "folder" : "lock"} />
												{item.name}
											</SideNavStyledLink>
										</SideNavItem>
									)
								})
							)
						}
					</SideNavList>
				</Scrollbars>
			</SideNavContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps, null)(SideNav);