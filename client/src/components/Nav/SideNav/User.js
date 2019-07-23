import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOut } from '../../../actions/authAction';

const UserContainer = styled.div`
	width: 200px;
	height: 60px;
	margin: 40px auto;
	display: flex;
	cursor: pointer;
	position: relative;
`

const UserAvatar = styled.img`
	width: 52px;
	height: 52px;
	border-radius: 8px;
	margin-right: 5px;
`

const UserWrapper = styled.div`

`

const UserName = styled.p`
	font-size: 20px;
	color: #000;
	font-weight: bold;
	letter-spacing: -1px;
	margin: 0;
`

const UserEmail = styled.p`
	font-size: 12px;
	color: #D9D9D9;
	letter-spacing: -1px;
	margin: 0;
	margin-top: 10px;
`

const StyledDropIcon = styled(FontAwesome)`
	color: #909090;
	font-size: 20px;
	position: absolute;
	top: 0;
	right: 0;
`

const UserDropdownMenu = styled.div`
	position: absolute;
	width: 200px;
	top: 60px;
	box-shadow: 0px 0px 15px -1px #000;
	background: #fff;
	cursor: default;
	display: ${({dropdown}) => dropdown ? 'block' : 'none'}
`

const UserDropdownList = styled.ul`
	list-style: none;
	display: flex;
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	flex-direction: column;
`

const UserDropdownItem = styled.li`
	width: 100%;
	height: 50px;
`

const StyledDropdownLink = styled(Link)`
	text-decoration: none;
	color: #000;
	font-weight: bold;
	letter-spacing: -1px;
	font-size: 18px;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;

	&:hover .fa {
		color: #10A074;
	}

	&:hover {
		color: #10A074;
		background: #E6F5F0;
	}
`

const StyledDropdownIcon = styled(FontAwesome)`
	font-size: 26px;
	color: #ADADAD;
	margin-right: 20px;
	margin-left: 32px;
`

class User extends Component {
	constructor() {
		super();
		this.state = {
			dropdown: false
		}
	}

	componentDidMount() {
		document.addEventListener('click', this.handleDropddownMenuOutside, true);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleDropddownMenuOutside, true);
	}

	handleDropddownMenuOutside = () => {
		if (this.state.dropdown) this.setState({ dropdown: false });
	}

	handleDropdownClick = (e, boolean) => {
		e.preventDefault();
		e.stopPropagation();
		this.setState({dropdown: boolean});
	}

	logOut = e => {
		e.preventDefault();
		signOut();
	}

	render() {
		const { user } = this.props;
		return (
			<UserContainer onClick={(e) => this.handleDropdownClick(e, true)}>
				<UserAvatar src={user ? user.profile.avatar : "https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fclinicforspecialchildren.org%2Fwp-content%2Fuploads%2F2016%2F08%2Favatar-placeholder.gif&f=1"} alt=""/>
				<UserWrapper>
					<UserName>{user ? user.nick : "Not logged"}</UserName>
					<UserEmail>{user && user.email}</UserEmail>
				</UserWrapper>
				<StyledDropIcon name="caret-down"/>
				<UserDropdownMenu onClick={(e) => this.handleDropdownClick(e, false)} dropdown={this.state.dropdown}>
					<UserDropdownList>
						{
							user ? (
								<>
									<UserDropdownItem>
										<StyledDropdownLink to={`/user/${user.nick}`}>
											<StyledDropdownIcon name="user" />
											Your account
										</StyledDropdownLink>
									</UserDropdownItem>
									<UserDropdownItem>
										<StyledDropdownLink to={`/videos`}>
											<StyledDropdownIcon name="play" />
											Your videos
										</StyledDropdownLink>
									</UserDropdownItem>
									<UserDropdownItem>
										<StyledDropdownLink to="/settings">
											<StyledDropdownIcon name="cog" />
											Settings
										</StyledDropdownLink>
									</UserDropdownItem>
									<UserDropdownItem>
										<StyledDropdownLink onClick={this.logOut} to="#">
											<StyledDropdownIcon name="sign-out-alt" />
											Sign out
										</StyledDropdownLink>
									</UserDropdownItem>
								</>
							) : (
								<>
									<UserDropdownItem>
										<StyledDropdownLink to="/login">
											<StyledDropdownIcon name="sign-in-alt" />
											Login
										</StyledDropdownLink>
									</UserDropdownItem>
									<UserDropdownItem>
										<StyledDropdownLink to="/register">
											<StyledDropdownIcon name="user-circle" />
											Register
										</StyledDropdownLink>
									</UserDropdownItem>
							</>
							)
						}
					</UserDropdownList>
				</UserDropdownMenu>
			</UserContainer>
		);
	}
};

const mapStateToProps = state => {
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps, null)(User);