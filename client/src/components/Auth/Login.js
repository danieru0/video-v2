import React, { useState } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import Loader from '../../shared/Loader/Loader';

const LoginBackground = styled.div`
	width: calc(100% - 250px);
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background: #FAFAFA;
`

const LoginForm = styled.form`
	width: 500px;
	height: 360px;
	background: #ffffff;
	border: 1px solid #EDEDED;
	border-bottom: none;
	display: flex;
	align-items: center;
	flex-direction: column;
	font-family: 'Lato';
	position: relative;

	@media (max-width: 500px) {
		width: 90%;
	}
`

const LoginTitle = styled.p`
	font-size: 28px;
	text-transform: uppercase;
	margin: 0;
	margin-top: 30px;
	margin-bottom: 15px;
`

const LoginInputGroup = styled.div`
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

const LoginInput = styled.input`
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

const LoginButton = styled.button`
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

const LoginNoAccount = styled.div`
	width: 500px;
	height: 60px;
	background: #249775;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid transparent;

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

const Login = ({ handleSubmit, authProcess, authErrors }) => {
	const [email, setEmailInput] = useState(false);
	const [password, setPasswordInput] = useState(false);

	const handleEmailInput = e => {
		setEmailInput(e.target.value);
	}

	const handlePasswordInput = e => {
		setPasswordInput(e.target.value);
	}

	return (
		<LoginBackground>
			<LoginForm onSubmit={event => handleSubmit(event, email, password)}>
				<LoaderContainer authProcess={authProcess}>
					<Loader />
				</LoaderContainer>
				<LoginTitle>Login</LoginTitle>
				<LoginInputGroup>
					<StyledIcon name="envelope"></StyledIcon>
					<LoginInput onChange={handleEmailInput} required type="email" placeholder="E-mail..."/>
					{ authErrors.email && <ErrorMessage>{authErrors.email}</ErrorMessage> }
				</LoginInputGroup>
				<LoginInputGroup>
					<StyledIcon name="lock"></StyledIcon>
					<LoginInput onChange={handlePasswordInput} required type="password" placeholder="Password..."/>
					{ authErrors.email && <ErrorMessage>{authErrors.password}</ErrorMessage> }
				</LoginInputGroup>
				<LoginButton>Login</LoginButton>
			</LoginForm>
			<LoginNoAccount>
				<StyledLink to="/register">Don't have account? Create one!</StyledLink>
			</LoginNoAccount>
		</LoginBackground>
	);
}

export default Login;