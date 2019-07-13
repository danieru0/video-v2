import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getUserPlaylist } from '../../actions/playlistAction';

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

const PlaylistVideos = styled.div`
	flex-grow: 1;
	height: 100%;
`

class Playlist extends Component {
	componentDidMount() {
		this.props.getUserPlaylist(this.props.match.params.user, this.props.match.params.id);
	}

	render() {
		const { playlistInfo } = this.props;
		return (
			<PlaylistContainer>
				<PlaylistInformations>
					{
						playlistInfo && (
							<>
								<InformationsImage src={playlistInfo.videos[0].miniature} alt=""/>
								<InformationsTitle>{playlistInfo.name}</InformationsTitle>
								<InformationsStatus>{playlistInfo.status}</InformationsStatus>
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

export default connect(mapStateToProps, { getUserPlaylist })(Playlist);