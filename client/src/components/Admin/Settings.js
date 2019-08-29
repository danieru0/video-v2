import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getSettings, saveSettings } from '../../actions/adminAction';

const SettingsContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`

const SettingsWrapper = styled.div`
	width: 1300px;
	height: 300px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	@media (max-width: 1570px) {
		width: 100%;
		flex-wrap: wrap;
		justify-content: center;
	}

	@media (max-width: 899px) {
		height: 500px;
	}
`

const Label = styled.label`
	width: 300px;
	text-align: center;
	height: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: 24px;
	border: ${({set}) => set ? '2px solid green' : '2px solid red'};
	cursor: pointer;

	@media (max-width: 1570px) {
		margin: 10px;
	}
`

const Checkbox = styled.input`
	margin-top: 20px;
	cursor: pointer;
`

const SaveButton = styled.button`
	padding: 16px 25px;
	cursor: pointer;
`

class Settings extends Component {
	constructor() {
		super();
		this.state = {
			registerAccounts: null,
			videoUpload: null,
			uploadAvatar: null,
			uploadBackground: null
		}
	}
	componentDidMount() {
		this.props.getSettings();
	}

	handleSettingsClick = e => {
		if (e.target.name !== undefined) {
			this.setState({
				[e.target.name]: e.target.nodeName === 'LABEL' ? e.target.childNodes[1].checked : e.target.checked
			});
		}
	}

	save = () => {
		let query = {};
		this.state.registerAccounts !== null && ( query['registerAccounts'] = this.state.registerAccounts );
		this.state.videoUpload !== null && ( query['videoUpload'] = this.state.videoUpload );
		this.state.uploadAvatar !== null && ( query['uploadAvatar'] = this.state.uploadAvatar );
		this.state.uploadBackground !== null && ( query['uploadBackground'] = this.state.uploadBackground );
		this.props.saveSettings(query);
	}

	render() {
		const { settings } = this.props;
		return (
			<SettingsContainer>
				<SettingsWrapper>
					{
						settings && (
							<>
								<Label onClick={this.handleSettingsClick} set={settings.registerAccounts ? 1 : 0} name="registerAccounts">
									Creating accounts
									<Checkbox defaultChecked={settings.registerAccounts} type="checkbox" name="registerAccounts"/>
								</Label>
								<Label onClick={this.handleSettingsClick} set={settings.videoUpload ? 1 : 0} name="videoUpload">
									Video uploading
									<Checkbox defaultChecked={settings.videoUpload} type="checkbox" name="videoUpload"/>
								</Label>
								<Label onClick={this.handleSettingsClick} set={settings.uploadAvatar ? 1 : 0} name="uploadAvatar">
									Avatar uploading
									<Checkbox defaultChecked={settings.uploadAvatar} type="checkbox" name="uploadAvatar"/>
								</Label>
								<Label onClick={this.handleSettingsClick} set={settings.uploadBackground ? 1 : 0} name="uploadBackground">
									Background uploading
									<Checkbox defaultChecked={settings.uploadBackground} type="checkbox" name="uploadBackground"/>
								</Label>
							</>
						)
					}
				</SettingsWrapper>
				<SaveButton onClick={this.save}>Save</SaveButton>
			</SettingsContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		settings: state.adminReducer.settings
	}
}

export default connect(mapStateToProps, { getSettings, saveSettings })(Settings);