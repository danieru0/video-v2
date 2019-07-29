import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Link, withRouter } from 'react-router-dom';

const AdminContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
`

const AdminSideNav = styled.nav`
	width: 260px;
	height: 100%;
	background: url(https://demos.creative-tim.com/light-bootstrap-dashboard/assets/img/sidebar-5.jpg);
	background-size: cover;
	position: fixed;
`

const SideNavWrapper = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(119, 119, 119, 0.7);
`

const SideNavLogo = styled.div`
	width: 100%;
	height: 60px;
	border-bottom: 1px solid #8D8D8F;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	font-family: 'Lato';
	text-transform: uppercase;
	letter-spacing: 2px;
`

const SideNavMenu = styled.ul`
	list-style: none;
	display: flex;
	flex-direction: column;
	margin: 0;
	padding: 0;
	width: 100%;
	margin-top: 20px;
`

const SideNavItem = styled.li`
	width: 85%;
	margin: 2px auto;
`

const SideNavLink = styled(Link)`
	text-decoration: none;
	color: ${({active}) => active ? '#fff' : '#E6E6E6'};
	font-size: 18px;
	font-family: 'Lato';
	width: 100%;
	display: flex;
	border-radius: 5px;
	align-items: center;
	height: 50px;
	text-transform: uppercase;
	letter-spacing: -1px;
	transition: background .3s, color .3s;
	background: ${({active}) => active && 'rgba(255, 255, 255, 0.23)'};

	&:hover {
		background: ${({active}) => active ? 'rgba(255, 255, 255, 0.23)' : 'rgba(255, 255, 255, 0.13)'};
		color: #fff;
	}
`

const SideNavIcon = styled(FontAwesome)`
	font-size: 26px;
	margin-left: 20px;
	margin-right: 15px;
	width: 30px;
	display: flex;
	justify-content: center;
`

const AdminTopNav = styled.nav`
	width: calc(100% - 260px);
	height: 60px;
	margin-left: 260px;
	position: fixed;
	top: 0;
	background: #fff;
	border-bottom: 1px solid #E5E5E5;
	display: flex;
	align-items: center;
`

const TopNavPageTitle = styled.p`
	color: #888888;
	font-size: 22px;
	font-family: 'Lato';
	margin-left: 30px;
	text-transform: capitalize;
`

const TopNavRightWrapper = styled.div`
	margin-left: auto;
	margin-right: 30px;
`

const TopNavButton = styled.button`
	margin-top: 6px;
	border: none;
	background: none;
	color: #938897;
	font-size: 16px;
	cursor: pointer;
	outline: none;

	&:hover {
		color: #1DC7EA;
	}
`

class Admin extends Component {

	goBack = () => {
		this.props.history.push('/');
	}
	
	render() {
		const { match } = this.props;
		return (
			<AdminContainer>
				<AdminTopNav>
					<TopNavPageTitle>{match.params.page ? match.params.page : 'Home'}</TopNavPageTitle>
					<TopNavRightWrapper>
						<TopNavButton onClick={this.goBack}>Go back</TopNavButton>
						<TopNavButton>Log out</TopNavButton>
					</TopNavRightWrapper>
				</AdminTopNav>
				<AdminSideNav>
					<SideNavWrapper>
						<SideNavLogo>
							Video.v2 admin
						</SideNavLogo>
						<SideNavMenu>
							<SideNavItem>
								<SideNavLink active={match.params.page === undefined ? 1 : 0} to="/admin">
									<SideNavIcon name="home"/>
									Home
								</SideNavLink>
							</SideNavItem>
							<SideNavItem>
								<SideNavLink active={match.params.page === 'users' ? 1 : 0} to="/admin/users">
									<SideNavIcon name="user"/>
									Users
								</SideNavLink>
							</SideNavItem>
							<SideNavItem>
								<SideNavLink active={match.params.page === 'videos' ? 1 : 0} to="/admin/videos">
									<SideNavIcon name="video"/>
									Videos
								</SideNavLink>
							</SideNavItem>
						</SideNavMenu>
					</SideNavWrapper>
				</AdminSideNav>
			</AdminContainer>
		);
	}
}

export default withRouter(Admin);