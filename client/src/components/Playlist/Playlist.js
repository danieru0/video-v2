import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { getUserPlaylist, changePlaylistStatus, removePlaylist, removeVideoFromPlaylist } from '../../actions/playlistAction';
import { clearPlaylistInfo } from '../../actions/clearAction';

import NormalVideo from '../../shared/NormalVideo/NormalVideo';

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

	@media (max-width: 562px) {
		flex-direction: column;
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
	flex-shrink: 0;

	@media (max-width: 990px) {
		width: 300px;
	}

	@media (max-width: 665px) {
		width: 200px;
		padding: 0;
	}

	@media (max-width: 562px) {
		width: 100%;
		height: 150px;
	}
`

const InformationsImage = styled.img`
	width: 80%;
	height: 220px;
	align-self: center;

	@media (max-width: 665px) {
		display: none;
	}
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

	@media (max-width: 665px) {
		flex-wrap: wrap;
	}
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
	display: flex;
	flex-wrap: wrap;
	padding-left: 30px;

	@media (max-width: 562px) {
		justify-content: center;
	}
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

	componentWillUnmount() {
		this.props.clearPlaylistInfo();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.props.clearPlaylistInfo();
			this.props.getUserPlaylist(this.props.match.params.user, this.props.match.params.id);
		}
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
		this.props.playlistInfo.status = this.state.newStatus;
	}

	handleDeletePlaylist = () => {
		if (window.confirm('Are you sure?')) {
			this.props.removePlaylist(this.props.match.params.id);
		}
	}

	removeVideo = (e, id) => {
		e.preventDefault();
		this.props.removeVideoFromPlaylist(this.props.playlistInfo.id, id);
	}

	render() {
		let { playlistInfo, authenticated, playlistRemoved } = this.props;

		if (playlistRemoved) {
			return <Redirect to="/"/>
		}

		return (
			<PlaylistContainer>
				<Helmet>
					<title>{ playlistInfo ? `${playlistInfo.name} - Video v2` : 'Loading... - Video v2'}</title>
				</Helmet>
				<PlaylistInformations>
					{
						playlistInfo && (
							<>
								<InformationsImage src={playlistInfo.videos[0] ? playlistInfo.videos[0].miniature : 'https://i.pinimg.com/originals/34/99/d1/3499d12f28a741f0063ee8f2bbd711d9.jpg'} alt=""/>
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
											<InformationsStatus>{playlistInfo.status}</InformationsStatus>
										</>
									)
								}
								{
									authenticated === undefined && (
										<>
											<InformationsLine />
											<ButtonsWrapper>
												<InformationsButton onClick={this.handleDeletePlaylist}>Delete</InformationsButton>
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
					{
						playlistInfo && playlistInfo.videos.length !== 0 && (
							playlistInfo.videos.map((item, index) => {
								return (
									<NormalVideo onDeleteButtonClick={(e) => this.removeVideo(e, item._id)} deleteButton key={index} title={item.title} id={item._id} miniature={item.miniature} author={item.author.nick} createdAt={item.createdAt} views={item.views} length={item.length}/>
								)
							})
						)
					}
				</PlaylistVideos>
			</PlaylistContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		playlistInfo: state.playlistReducer.playlistInfo,
		playlistRemoved: state.playlistReducer.playlistRemoved
	}
}

export default connect(mapStateToProps, { getUserPlaylist, changePlaylistStatus, clearPlaylistInfo, removePlaylist, removeVideoFromPlaylist })(Playlist);