import React, { Component } from 'react';
import styled from 'styled-components';

const SettingsContainer = styled.div`
	width: calc(100% - 250px);
	min-height: calc(100vh - 80px);	
	margin-left: 250px;
	margin-top: 80px;
	font-family: 'Lato';

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
	background: url('https://png.pngtree.com/thumb_back/fw800/back_pic/00/14/65/3256657136926fa.jpg');
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

class Settings extends Component {
	render() {
		return (
			<SettingsContainer>
				<SettingsWrapper>
					<SettingsInfo>
						<SettingsAvatar alt="" src="https://ggrmlawfirm.com/wp-content/uploads/avatar-placeholder.png" />
						<SettingsInfoText>elosik</SettingsInfoText>
						<SettingsInfoText>elosik@onet.pl</SettingsInfoText>
					</SettingsInfo>
					<SettingsContent>
						<SettingsBackground />
						<SettingsFile type="file" />
						<SettingsLine />
						<SettingsAvatar alt="" src="https://ggrmlawfirm.com/wp-content/uploads/avatar-placeholder.png"/>
						<SettingsFile type="file" />
						<SettingsLine />
						<SettingsDesc placeholder="Description..."></SettingsDesc>
					</SettingsContent>
				</SettingsWrapper>
				<SettingsButton>save</SettingsButton>
			</SettingsContainer>
		);
	}
}

export default Settings;