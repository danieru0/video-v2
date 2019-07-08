import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserContainer = styled(Link)`
	width: 180px;
	height: 150px;
	background: #fff;
	box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1);
	border-radius: 5px;
	text-decoration: none;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-family: 'Lato';
	color: #000;
	margin: 20px 0px;
	margin-right: 30px;
`

const UserAvatar = styled.img`
	width: 82px;
	border-radius: 10px;
`

const UserNick = styled.p`
	margin: 0;
	font-size: 20px;
	margin-top: 5px;
`

const User = ({avatar, nick}) => {
	return (
		<UserContainer to={`/user/${nick}`}>
			<UserAvatar alt="" src={avatar}/>
			<UserNick>{nick}</UserNick>
		</UserContainer>
	);
};

User.propTypes = {
	avatar: PropTypes.string.isRequired,
	nick: PropTypes.string.isRequired,
}

export default User;