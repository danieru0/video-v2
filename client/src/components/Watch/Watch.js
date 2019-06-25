import React, { Component } from 'react';

import VideoPlayer from './VideoPlayer';

class Video extends Component {
	render() {
		return (
			<VideoPlayer id={this.props.match.params.id} />
		);
	}
}

export default Video;