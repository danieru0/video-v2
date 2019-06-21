import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import User from './User';

const SideNavContainer = styled.div`
	width: 250px;
	height: 100vh;
	background: #ffffff;
	border-right: 1px solid #E7E7E7;
	font-family: 'Lato';
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

class SideNav extends Component {
	render() {
		return (
			<SideNavContainer>
				<SideNavLogo>
					<StyledLinkLogo to="/">
						<StyledIconLogo name="play" />
						<StyledIconText color="#000">Video.</StyledIconText>
						<StyledIconText color="#7D7D7D">v2</StyledIconText>
					</StyledLinkLogo>
				</SideNavLogo>
				<User />
			</SideNavContainer>
		);
	}
}

export default SideNav;