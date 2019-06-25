import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

const TopNavContainer = styled.div`
	background: #FAFAFA;
	width: calc(100% - 250px);
	height: 80px;
	border-bottom: 1px solid #E7E7E7;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	top: 0;
	margin-left: 250px;
	z-index: 2;

	@media (max-width: 920px) {
		width: 100%;
		margin-left: 0px;
	}
`

const SearchInputGroup = styled.form`
	position: relative;
	margin-left: 40px;
	width: 400px;

	@media (max-width: 920px) {
		margin-left: 60px;
	}

	@media (max-width: 610px) {
		width: 60%;
		background: red;
	}
`

const SearchInput = styled.input`
	width: 100%;
	height: 50px;
	outline: none;
	border: none;
	font-family: 'Lato';
	font-size: 19px;
	letter-spacing: -1px;
	color: #000;
	background: #FAFAFA;
	padding: 0px 30px;

	&::placeholder {
		color: #BBBBBB;
	}
`

const SearchInputIcon = styled(FontAwesome)`
	color: #BBBBBB;
	font-size: 22px;
	position: absolute;
	top: 14px;
`

const StyledUploadLink = styled(Link)`
	width: 120px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #10A074;
	margin-right: 30px;
	border-radius: 5px;
	color: #fff;
	font-family: 'Lato';
	text-decoration: none;
`

const StyledUploadIcon = styled(FontAwesome)`
	font-size: 14px;
	margin-right: 10px;
`

const TopNavHamburger = styled.button`
	border: none;
	background: none;
	cursor: pointer;
	outline: none;
	padding: 10px 11px 10px 11px;
	position: absolute;
	display: none;
	transition: background .2s;
	
	@media (max-width: 920px) {
		display: block;
	}

	&:focus {
		background: #E7E7E7;
		border-radius: 30px;
	}
`

const StyledHamburgerIcon = styled(FontAwesome)`
	font-size: 22px;
`

class TopNav extends Component {
	render() {
		return (
			<TopNavContainer>
				<TopNavHamburger onClick={this.props.toggleNavMenu}>
					<StyledHamburgerIcon name="bars"/>
				</TopNavHamburger>
				<SearchInputGroup>
					<SearchInputIcon name="search"/> 
					<SearchInput placeholder="Search videos..." />
				</SearchInputGroup>
				{
					localStorage.getItem('token') && (
						<StyledUploadLink to="/upload">
							<StyledUploadIcon name="upload" />
							Upload
						</StyledUploadLink>
					)
				}
			</TopNavContainer>
		);
	}
}

export default TopNav;