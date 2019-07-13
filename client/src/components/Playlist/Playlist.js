import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getUserPlaylist, changePlaylistStatus } from '../../actions/playlistAction';

const PlaylistContainer = styled.div`
	width: calc(100% - 250px);
	min-height: calc(100vh - 80px);	
	margin-left: 250px;
	margin-top: 80px;
	font-family: 'Lato';
	position: relative;
	display: flex;

	@media (max-width: 920px) {
		width: 100%;
		margin-left: 0px;
	}
`

const PlaylistInformations = styled.div`
	height: 100%;
	width: 350px;
	background: #F1F1F1;
	display: flex;
	flex-direction: column;
	padding: 30px 0px;
	font-family: 'Lato';
`

const InformationsImage = styled.img`
	width: 80%;
	height: 220px;
	align-self: center;
`

const InformationsTitle = styled.p`
	margin: 0;
	font-size: 22px;
	margin-top: 20px;
	margin-left: 36px;
`

const InformationsStatus = styled.p`
	font-size: 16px;
	background: #DDDDDD;
	margin: 0;
	margin-left: 36px;
	margin-top: 5px;
	align-self: flex-start;
	padding: 0px 2px;

	&:first-letter {
		text-transform: capitalize;
	}
`

const InformationsLine = styled.div`
	width: 80%;
	height: 1px;
	background: #ddd;
	align-self: center;
	margin: 15px 0px;
`

const ButtonsWrapper = styled.div`
	width: 80%;
	align-self: center;
	display: flex;
	justify-content: flex-end;
`

const InformationsButton = styled.button`
	color: #10A074;
	background: none;
	border: none;
	outline: none;
	padding: 10px 10px;
	font-size: 18px;
	text-transform: uppercase;
	letter-spacing: -1px;
	cursor: pointer;

	&:focus,
	&:hover {
		background: rgba(0,0,0,0.1);
	}
`

const InformationsLabel = styled.label`
	margin-left: 36px;
	margin-top: 20px;
`

const InformationsStatusSelect = styled.select`
	margin-left: 6px;
`
const InformationStatusOption = styled.option``

const PlaylistVideos = styled.div`
	flex-grow: 1;
	height: 100%;
`

class Playlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			newStatus: null
		}
	}

	componentDidMount() {
		this.props.getUserPlaylist(this.props.match.params.user, this.props.match.params.id);
	}

	toggleEdit = () => {
		this.setState({
			edit: !this.state.edit
		});
	}

	setNewStatus = e => {
		this.setState({
			newStatus: e.target.value
		});
	}

	saveSettings = () => {
		this.props.changePlaylistStatus(this.props.playlistInfo.id, this.state.newStatus);
	}

	render() {
		const { playlistInfo, authenticated } = this.props;
		return (
			<PlaylistContainer>
				<PlaylistInformations>
					{
						playlistInfo && (
							<>
								<InformationsImage src={playlistInfo.videos[0].miniature} alt=""/>
								{
									this.state.edit && authenticated === undefined ? (
										<>
											<InformationsLabel>
												Status: 
												<InformationsStatusSelect defaultValue={playlistInfo.status} onChange={this.setNewStatus}>
													<InformationStatusOption value="public">Public</InformationStatusOption>
													<InformationStatusOption value="private">Private</InformationStatusOption>													
												</InformationsStatusSelect>
											</InformationsLabel>
										</>
									) : (
										<>
											<InformationsTitle>{playlistInfo.name}</InformationsTitle>
											<InformationsStatus>{this.state.newStatus ? this.state.newStatus : playlistInfo.status}</InformationsStatus>
										</>
									)
								}
								{
									authenticated === undefined && (
										<>
											<InformationsLine />
											<ButtonsWrapper>
												<InformationsButton>Delete</InformationsButton>
												<InformationsButton onClick={this.toggleEdit}>{this.state.edit ? 'Cancel' : 'Edit'}</InformationsButton>
												{
													this.state.edit && <InformationsButton onClick={this.saveSettings}>Save</InformationsButton>
												}
											</ButtonsWrapper>
										</>
									)
								}
							</>
						)
					}
				</PlaylistInformations>
				<PlaylistVideos>
						
				</PlaylistVideos>
			</PlaylistContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		playlistInfo: state.playlistReducer.playlistInfo
	}
}

export default connect(mapStateToProps, { getUserPlaylist, changePlaylistStatus })(Playlist);