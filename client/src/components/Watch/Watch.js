import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getVideoInformations } from '../../actions/videoAction';

import VideoPlayer from './VideoPlayer';
import WatchError from './WatchError';

const WatchContainer = styled.div`
	width: calc(100% - 250px);
	height: calc(100vh - 80px);
	background: #FAFAFA;
	margin-left: 250px;
	margin-top: 80px;

	@media (max-width: 920px) {
		width: 100%;
		height: 100vh;
		margin: 0;
	}
`

class Watch extends Component {
	componentDidMount() {
		this.props.getVideoInformations({ id: this.props.match.params.id });
	}

	render() {
		const { watchVideoError, singleVideo } = this.props;
		return (
			<WatchContainer>
				{
					singleVideo && <VideoPlayer id={this.props.match.params.id} />
				}
				{
					watchVideoError && <WatchError error={watchVideoError}/>
				}
			</WatchContainer>

		);
	}
}

const mapStateToProps = state => {
	return {
		watchVideoError: state.videoReducer.watchVideoError,
		singleVideo: state.videoReducer.singleVideo
	}
}

export default connect(mapStateToProps, { getVideoInformations })(Watch);