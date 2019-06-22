import React, { useState } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import Loader from '../../shared/Loader/Loader';

const RegisterBackground = styled.div`
	width: calc(100% - 250px);
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background: #FAFAFA;
`

const RegisterForm = styled.form`
	width: 500px;
	height: 450px;
	background: #ffffff;
	border: 1px solid #EDEDED;
	display: flex;
	align-items: center;
	flex-direction: column;
	font-family: 'Lato';
	position: relative;

	@media (max-width: 500px) {
		width: 90%;
	}
`

const RegisterTitle = styled.p`
	font-size: 28px;
	text-transform: uppercase;
	margin: 0;
	margin-top: 30px;
	margin-bottom: 15px;
`

const RegisterInputGroup = styled.div`
	width: 70%;
	position: relative;
	margin: 20px 0px;
`

const StyledIcon = styled(FontAwesome)`
	position: absolute;
	z-index: 1;
	font-size: 20px;
	top: 14px;
	left: 10px;
	color: #249775;
`

const RegisterInput = styled.input`
	width: 100%;
	height: 50px;
	background: #E6F5F0;
	border: none;
	outline: none;
	font-size: 22px;
	padding: 0px 0px 0px 40px;
	color: #249775;
	position: relative;
	border-bottom: 1px solid #000000;
	transition: border 0.3s;

	::placeholder {
		color: #249775;
	}

	&:focus {
		border-bottom: 2px solid #000000;
	}
`

const RegisterButton = styled.button`
	padding: 12px 38px;
	background: #249775;
	border: none;
	color: #ffffff;
	font-family: 'Lato';
	text-transform: uppercase;
	font-size: 16px;
	letter-spacing: 2px;
	cursor: pointer;
	margin-top: 15px;
	transition: background 0.3s, color 0.3s;
	outline: none;

	&:hover {
		background: #E6F5F0;
		color: #249775;
	}
`

const RegisterAccount = styled.div`
	width: 500px;
	height: 60px;
	background: #249775;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;

	@media (max-width: 500px) {
		width: 90%;
	}
`

const StyledLink = styled(Link)`
	color: #ffffff;
`

const ErrorMessage = styled.p`
	color: #ff0000;
	position: absolute;
	margin: 0;
`

const LoaderContainer = styled.div`
	width: calc(100% + 2px);
	height: 100%;
	background: rgba(0,0,0,0.3);
	position: absolute;
	z-index: 2;
	visibility: ${({authProcess}) => authProcess ? 'visible' : 'hidden'}
	opacity: ${({authProcess}) => authProcess ? '1' : '0'}
	transition: opacity .3s, visibility .3s;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Register = ({ handleSubmit, authProcess, authErrors }) => {
	const [email, setEmailInput] = useState(false);
	const [password, setPasswordInput] = useState(false);
	const [nick, setNickInput] = useState(false);

	const handleEmailInput = e => {
		setEmailInput(e.target.value);
	}

	const handlePasswordInput = e => {
		setPasswordInput(e.target.value);
	}

	const handleNickInput = e => {
		setNickInput(e.target.value);
	}
	return (
		<RegisterBackground>
			<RegisterForm onSubmit={(event) => handleSubmit(event, nick, email, password)}>
				<LoaderContainer authProcess={authProcess}>
					<Loader />
				</LoaderContainer>
				<RegisterTitle>Register</RegisterTitle>
				<RegisterInputGroup>
					<StyledIcon name="user"></StyledIcon>
					<RegisterInput onChange={handleNickInput} required type="text" placeholder="Username..."/>
					{ authErrors.nick && <ErrorMessage>{authErrors.nick}</ErrorMessage> }
				</RegisterInputGroup>
				<RegisterInputGroup>
					<StyledIcon name="envelope"></StyledIcon>
					<RegisterInput onChange={handleEmailInput} required type="email" placeholder="E-mail..."/>
					{ authErrors.email && <ErrorMessage>{authErrors.email}</ErrorMessage> }
				</RegisterInputGroup>
				<RegisterInputGroup>
					<StyledIcon name="lock"></StyledIcon>
					<RegisterInput onChange={handlePasswordInput} required type="password" placeholder="Password..."/>
					{ authErrors.password && <ErrorMessage>{authErrors.password}</ErrorMessage> }
				</RegisterInputGroup>
				<RegisterButton>Register</RegisterButton>
			</RegisterForm>
			<RegisterAccount>
				<StyledLink to="/login">Already registered? Log in!</StyledLink>
			</RegisterAccount>
		</RegisterBackground>
	);
};

export default Register;