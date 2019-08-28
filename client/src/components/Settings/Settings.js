import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';
import { Helmet } from 'react-helmet';

import { changeProfileInfo } from '../../actions/userAction';
import { showAlert } from '../../actions/alertAction';

import Loader from '../../shared/Loader/Loader';

const SettingsContainer = styled.div`
	width: calc(100% - 250px);
	min-height: calc(100vh - 80px);	
	margin-left: 250px;
	margin-top: 80px;
	font-family: 'Lato';
	position: relative;

	@media (max-width: 920px) {
		width: 100%;
		margin-left: 0px;
	}
`

const SettingsWrapper = styled.div`
	width: 1300px;
	height: 600px;
	margin: 0px auto;
	margin-top: 100px;
	display: flex;
	position: relative;

	@media (max-width: 1600px) {
		width: 100%;
		padding-right: 30px;
	}
`

const SettingsInfo = styled.div`
	width: 200px;
	height: 100%;
	border-right: 1px solid #e7e7e7;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	padding-right: 30px;
	padding-top: 20px;

	@media (max-width: 620px) {
		display: none;
	}
`

const SettingsAvatar = styled.img`
	width: 82px;
	height: 82px;
`

const SettingsInfoText = styled.p`
	margin: 2px 0px;
	padding: 0;
	font-size: 16px;
`

const SettingsContent = styled.div`
	flex: 1;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding-left: 20px;
`

const SettingsBackground = styled.div`
	width: 100%;
	height: 150px;
	background: ${({image}) => image ? `url(${image})` : 'none'};
	background-size: cover;
	background-repeat: no-repeat;
`

const SettingsFile = styled.input``;

const SettingsLine = styled.div`
	width: 300px;
	height: 1px;
	background: #e7e7e7;
	margin: 30px 0px;
`

const SettingsDesc = styled.textarea`
	resize: none;
	width: 400px;
	height: 200px;
	font-size: 18px;
	font-family: 'Lato';

	@media (max-width: 435px) {
		width: 100%;
	}
`

const SettingsButton = styled.button`
	width: 110px;
	height: 40px;
	border-radius: 5px;
	background: #10A074;
	border: none;
	color: #fff;
	font-size: 18px;
	font-family: 'Lato';
	display: block;
	cursor: pointer;
	outline: none;
	position: relative;
	margin: 0px auto;
	margin-top: 30px;
	margin-bottom: 30px;
`

const SettingsOverlay = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.4);
	top: 0;
	left: 0;
	z-index: 1;
	justify-content: center;
	align-items: center;
	display: ${({saving}) => saving ? 'flex' : 'none'};
`

class Settings extends Component {
	constructor() {
		super();
		this.state = {
			avatarLink: null,
			avatarFile: null,
			backgroundLink: null,
			backgroundFile: null,
			saving: false,
			desc: null
		}
	}

	handleBackground = e => {
		if (e.target.files[0]) {
			if (e.target.files[0].type === 'image/jpeg') {
				this.setState({
					backgroundLink: window.URL.createObjectURL(e.target.files[0]),
					backgroundFile: e.target.files[0]
				});
			} else {
				alert('Wrong file type!');
			}
		}
	}

	handleAvatar = e => {
		if (e.target.files[0]) {
			if (e.target.files[0].type === 'image/jpeg') {
				this.setState({
					avatarLink: window.URL.createObjectURL(e.target.files[0]),
					avatarFile: e.target.files[0]
				});
			} else {
				alert('Wrong file type!');
			}
		}
	}

	handleDescription = e => {
		this.setState({
			desc: e.target.value
		});
	}

	save = async () => {
		if (this.state.saving) return;

		this.setState({
			saving: true
		});

		if (this.state.backgroundFile) {
			const formData = new FormData();
			formData.append('background', this.state.backgroundFile, this.props.user._id);
			try {
				await axios({
					url: '/upload/background',
					method: 'post',
					data: formData,
					headers: {
						'Content-Type': 'multipart/form-data',
						'Authorization': localStorage.getItem('token')
					}
				});
			} catch (err) {
				this.props.showAlert(err.response.data, 'error');
				this.setState({
					saving: false
				});
				return false;
			}
		}

		if (this.state.avatarFile) {
			const formData = new FormData();
			formData.append('avatar', this.state.avatarFile, this.props.user._id);
			try {
				await axios({
					url: '/upload/avatar',
					method: 'post',
					data: formData,
					headers: {
						'Content-Type': 'multipart/form-data',
						'Authorization': localStorage.getItem('token')
					}
				});
			} catch (err) {
				this.props.showAlert(err.response.data, 'error');
				this.setState({
					saving: false
				});
				return false;
			}
		}

		const options = {};
		this.state.desc && (options.description = this.state.desc);
		this.state.backgroundFile && (options.background = `/backgrounds/${this.props.user._id}.jpg`);
		this.state.avatarFile && (options.avatar = `/avatars/${this.props.user._id}.jpg`);

		this.props.changeProfileInfo(options);
		this.setState({
			saving: false
		});
	}

	render() {
		const { user } = this.props;
		return (
			<SettingsContainer>
				<Helmet>
					<title>Settings - Video v2</title>
				</Helmet>
				<SettingsOverlay saving={this.state.saving ? 1 : 0}>
					<Loader />
				</SettingsOverlay>
				{
					user && (
						<>
							<SettingsWrapper>
								<SettingsInfo>
									<SettingsAvatar alt="" src={user.profile.avatar} />
									<SettingsInfoText>{user.nick}</SettingsInfoText>
									<SettingsInfoText>{user.email}</SettingsInfoText>
								</SettingsInfo>
								<SettingsContent>
									<SettingsBackground image={this.state.backgroundLink ? this.state.backgroundLink : user.profile.background}/>
									<SettingsFile onChange={this.handleBackground} type="file" accept="image/jpeg" />
									<SettingsLine />
									<SettingsAvatar alt="" src={this.state.avatarLink ? this.state.avatarLink : user.profile.avatar}/>
									<SettingsFile onChange={this.handleAvatar} type="file" accept="image/jpeg" />
									<SettingsLine />
									<SettingsDesc onChange={this.handleDescription} defaultValue={user.profile.description} placeholder="Description..."></SettingsDesc>
								</SettingsContent>
							</SettingsWrapper>
							<SettingsButton onClick={this.save}>Save</SettingsButton>
						</>
					)
				}
			</SettingsContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps, { changeProfileInfo, showAlert })(Settings);