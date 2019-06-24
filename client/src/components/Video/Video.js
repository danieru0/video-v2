import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import formatDuration from '../../shared/helpers/formatDuration';

const VideoContainer = styled.div`
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

const Player = styled.div`
	width: 100%;
	height: 700px;
	position: relative;
`

const VideoSource = styled.video`
	width: 100%;
	height: 100%;
	background: #000;
	border: none;
	outline: none;
`

const PlayerControlsContainer = styled.div`
	width: 100%;
	height: 60px;
	background: rgba(0,0,0,0.8);
	position: absolute;
	bottom: 0;
`

const PlayerControlsProgressContainer = styled.div`
	width: 100%;
	height: 8px;
	background: rgba(255,255,255,0.8);
	position: relative;
	cursor: pointer;
`

const PlayerControlsBuffer = styled.div`
	width: 0%;
	height: 100%;
	background: #fff;
`

const PlayerControlsProgress = styled.div`
	width: 0%;
	height: 100%;
	background: #10A074;
	position: absolute;
	top: 0;
`

const StyledIcon = styled(FontAwesome)`
	font-size: 24px;
	color: #fff;
`

const PlayerButton = styled.button`
	position: absolute;
	top: 20px;
	margin: ${({margin}) => margin};
	background: none;
	border: none;
	cursor: pointer;
	outline: none;
	right: ${({right}) => right ? '40px' : 'auto'};

	&:hover ${StyledIcon} {
		color: #10A074;
	}
`

const PlayerInputRangeContainer = styled.div`
	width: 120px;
	position: absolute;
	top: 20px;
	left: 80px;
`

const PlayerInputRangeVolume = styled.input`
	-webkit-appearance: none;
	outline: none;
	width: 100%;

	&::-webkit-slider-thumb {
		width: 19px;
		height: 19px;
		border-radius: 50px;
		background: #fff;
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: -5.6px;
		position: relative;
		z-index: 1;
	}

	&::-webkit-slider-runnable-track {
		height: 6px;
		cursor: pointer;
		background: #fff;
		border-radius: 25px;
	}

	&::-moz-range-thumb {
		width: 19px;
		height: 19px;
		border-radius: 50px;
		background: #fff;
	}

	&::-moz-range-track {
		height: 6px;
		cursor: pointer;
		border-radius: 25px;
		background: #fff;
	}
`

const PlayerInputRangeVolumePath = styled.div`
	height: 6px;
	width: 0%;
	background: #10A074;
	position: absolute;
	top: 11px;
	left: 2px;
	cursor: pointer;
`

const PlayerLength = styled.p`
	position: absolute;
	left: 0;
	right: 0;
	width: 100px;
	top: 22px;
	padding: 0;
	margin: auto;
	color: #fff;
	font-family: 'Lato';
	cursor: default;
	user-select: none;
`

class Video extends Component {
	constructor() {
		super();
		this.state = {
			paused: false,
			muted: false
		}
	}

	videoRef = React.createRef();
	bufferRef = React.createRef();
	progressRef = React.createRef();
	progressContainerRef = React.createRef();
	volumePathRef = React.createRef();
	volumeRangeRef = React.createRef();
	timeRef = React.createRef();
	playerRef = React.createRef();

	componentDidMount() {
		if (localStorage.getItem('volume')) {
			this.videoRef.current.volume = parseFloat(localStorage.getItem('volume'));
			this.volumePathRef.current.style.width = parseFloat(localStorage.getItem('volume')) * 100 + "%";
			this.volumeRangeRef.current.value = parseFloat(localStorage.getItem('volume')); 
		}
	}

	handleProgress = () => {
		const duration = this.videoRef.current.duration;
		const video = this.videoRef.current;
		if (duration > 0) {
			for (let i = 0; i < video.buffered.length; i++) {
				if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
					this.bufferRef.current.style.width = (video.buffered.end(video.buffered.length - 1 - i) / duration) * 100 + "%";
					break;
				}
			}
		}
	}

	handleTimeUpdate = () => {
		const duration = this.videoRef.current.duration;
		this.timeRef.current.textContent = `${formatDuration(this.videoRef.current.currentTime)} / ${formatDuration(duration)}`
		if (duration > 0) {
			this.progressRef.current.style.width = ((this.videoRef.current.currentTime / duration)*100) + "%";
		}
	}

	handleProgressClick = e => {
		e.preventDefault();
		e.stopPropagation();
		const rect = this.progressContainerRef.current.getBoundingClientRect();
		const mouseX = e.pageX - rect.x;
		const progressWidth = parseInt(getComputedStyle(this.progressContainerRef.current).width.split('px')[0]);
		this.videoRef.current.currentTime = mouseX * this.videoRef.current.duration / progressWidth;
	}

	togglePause = () => {
		this.setState({
			paused: !this.state.paused
		}, () => {
			this.state.paused ? this.videoRef.current.pause() : this.videoRef.current.play();
		})
	}

	toggleMute = () => {
		this.setState({
			muted: !this.state.muted
		});
	}

	changeVolume = volume => {
		this.videoRef.current.volume = volume;
		localStorage.setItem('volume', volume);
	}

	handleVolumeRangeChange = e => {
		this.volumePathRef.current.style.width = e.target.value * 100 + "%";
		this.changeVolume(e.target.value);
	}

	changeInputRange = e => {
		const rect = e.target.getBoundingClientRect();
		const mouseX = e.pageX - rect.x;
		const rangeNumber = Number(`0.${mouseX}`);
		this.volumeRangeRef.current.value = rangeNumber;
		this.volumePathRef.current.style.width = mouseX + "%";
		this.changeVolume(rangeNumber);
	}

	resizePlayer = () => {
		const isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        					(document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        					(document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
							(document.msFullscreenElement && document.msFullscreenElement !== null);
							
		const player = this.playerRef.current;
		if (!isInFullScreen) {
			if (player.requestFullscreen) {
				player.requestFullscreen();
			} else if (player.webkitEnterFullScreen) {
				player.webkitEnterFullScreen();
			} else if (player.mozRequestFullScreen) {
				player.mozRequestFullScreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
	}

	render() {
		return (
			<VideoContainer>
				<Player ref={this.playerRef}>
					<VideoSource onTimeUpdate={this.handleTimeUpdate} onProgress={this.handleProgress} ref={this.videoRef} muted={this.state.muted} controlsList="nodownload" autoPlay src={`/serve/video?id="${this.props.match.params.id}"`}></VideoSource>
					<PlayerControlsContainer>
						<PlayerControlsProgressContainer ref={this.progressContainerRef} onClick={this.handleProgressClick}>
							<PlayerControlsBuffer ref={this.bufferRef} />
							<PlayerControlsProgress ref={this.progressRef}/>
						</PlayerControlsProgressContainer>
						<PlayerButton margin="0px 10px" onClick={this.togglePause}>
							{
								this.state.paused ? (
									<StyledIcon name="pause"/>
								) : (
									<StyledIcon name="play"/>
								)
							}
						</PlayerButton>
						<PlayerButton onClick={this.toggleMute} margin="0px 40px">
							{
								this.state.muted ? (
									<StyledIcon name="volume-mute"/>	
								) : (
									<StyledIcon name="volume-up"/>
								)
							}
							</PlayerButton>
						<PlayerInputRangeContainer>
							<PlayerInputRangeVolumePath onClick={this.changeInputRange} ref={this.volumePathRef}/>
							<PlayerInputRangeVolume ref={this.volumeRangeRef} onChange={this.handleVolumeRangeChange} step="0.01" min="0" max="1" type="range"/>
						</PlayerInputRangeContainer>
						<PlayerLength ref={this.timeRef} />
						<PlayerButton onClick={this.resizePlayer} right>
							<StyledIcon name="expand"/>
						</PlayerButton>
					</PlayerControlsContainer>
				</Player>
			</VideoContainer>
		);
	}
}

export default Video;