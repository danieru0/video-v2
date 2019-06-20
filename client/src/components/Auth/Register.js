import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

const RegisterBackground = styled.div`
	width: 100%;
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

const RegisterNoAccount = styled.div`
	width: 500px;
	height: 60px;
	background: #249775;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const StyledLink = styled(Link)`
	color: #ffffff;
`

const ErrorMessage = styled.p`
	color: #ff0000;
	position: absolute;
	margin: 0;
`

const Register = () => {
	return (
		<RegisterBackground>
			<RegisterForm>
				<RegisterTitle>Register</RegisterTitle>
				<RegisterInputGroup>
					<StyledIcon name="user"></StyledIcon>
					<RegisterInput required type="text" placeholder="Username..."/>
				</RegisterInputGroup>
				<RegisterInputGroup>
					<StyledIcon name="envelope"></StyledIcon>
					<RegisterInput required type="email" placeholder="E-mail..."/>
					<ErrorMessage>Wrong password or email!</ErrorMessage>
				</RegisterInputGroup>
				<RegisterInputGroup>
					<StyledIcon name="lock"></StyledIcon>
					<RegisterInput required type="password" placeholder="Password..."/>
				</RegisterInputGroup>
				<RegisterButton>Register</RegisterButton>
			</RegisterForm>
			<RegisterNoAccount>
				<StyledLink to="/login">Already registered? Log in!</StyledLink>
			</RegisterNoAccount>
		</RegisterBackground>
	);
};

export default Register;