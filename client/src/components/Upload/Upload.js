import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import { connect } from 'react-redux';

import { createVideo } from '../../actions/videoAction';

const UploadContainer = styled.div`
	width: calc(100% - 250px);
	height: calc(100vh - 80px);
	margin-top: 80px;
	margin-left: 250px;
	background: #FAFAFA;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	@media (max-width: 920px) {
		width: 100%;
		margin-left: 0px;
	}
`

const UploadFilePlace = styled.div`
	width: 100%;
	height: 100%;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`

const UploadFileIcon = styled(FontAwesome)`
	color: #10A074;
	font-size: 80px;
	transform: ${({dragging}) => dragging ? 'scale(1.2);' : 'scale(1)'}
`

const UploadFileText = styled.p`
	margin: 0;
	font-size: 32px;
	color: #10A074;
	font-family: 'Lato';
	margin-top: 15px;
`

const HiddenFileInput = styled.input`
	display: none;
`

const UploadProgressBar = styled.div`
	width: 70%;
	height: 50px;
	background: #fff;
	border: 1px solid #E7E7E7;
	margin-top: -500px;
`

const Progress = styled.div`
	width: ${({progress}) => `${progress}%;`}
	height: 100%;
	background: #10A074;
`

const UploadFormWrapper = styled.div`
	width: 100%;
	display: flex;
	margin-top: 40px;
`

const UploadFormInformations = styled.div`
	width: 60%;
`

const UploadFormInput = styled.input`
	width: 90%;
	height: 40px;
	background: #fff;
	border: ${({error}) => error ? '2px solid red;' : '2px solid #e7e7e7;'}
	font-size: 20px;
	margin-bottom: 10px;
	font-family: 'Lato';
`

const UploadFormDesc = styled.div`
	width: 90%;
	height: 200px;
	border: 2px solid #E7E7E7;
	font-size: 20px;
	margin-bottom: 10px;
	background: #fff;
	font-family: 'Lato';
`

const UploadSelect = styled.select`
	width: 200px;
	height: 40px;
	font-size: 16px;
	font-family: 'Lato';
	border: 2px solid #E7E7E7;
`

const UploadOption = styled.option``

const UploadFormMiniature = styled.div`
	width: 40%;
	height: 30px;
`

const Miniature = styled.div`
	width: 100%;
	height: 200px;
	background: ${({miniature}) => miniature ? `url(${miniature});` : 'url(https://beamimagination.com/wp-content/uploads/2017/09/video-placeholder.png);'}
	background-size: cover;
	background-position: center;
`

const MiniatureFileInput = styled.input`
	width: 200px;
`

const UploadVideoButton = styled.button`
	width: 110px;
	height: 40px;
	border-radius: 5px;
	background: #10A074;
	border: none;
	color: #fff;
	font-size: 18px;
	font-family: 'Lato';
	margin: auto;
	margin-top: 70px;
	display: block;
	cursor: pointer;
	outline: none;
`

const HiddenVideoPlayer = styled.video`
	display: none;
`

class Upload extends Component {
	constructor() {
		super();
		this.state = {
			dragging: false,
			file: null,
			title: 'Title...',
			description: '',
			duration: null,
			inputTitleError: false,
			progress: 0,
			uploaded: false,
			status: 'public',
			miniatureLink: null,
			miniatureFile: null
		}
	}

	inputRef = React.createRef();
	videoRef = React.createRef();

	uploadVideo = async () => {
		const formData = new FormData();
		formData.append('video', this.state.file);
		try {
			const result = await axios({
				url: '/upload/video',
				method: 'post',
				data: formData,
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': localStorage.getItem('token')
				},
				onUploadProgress: (progressEvent) => {
					const percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
					this.setState({ progress: percentCompleted });
				}
			});
			this.setState({ 
				uploaded: true,
				uploadedName: result.data.name.split('.')[0]
			});

			this.props.createVideo({
				title: this.state.title.length === 0 ? this.state.title : 'My awesome title', 
				description: this.state.description,
				status: this.state.status,
				path: `/videos/${result.data.name}`,
				length: this.state.duration,
				_id: result.data.name.split('.')[0]
			});
			
		} catch (err) {
			throw err;
		}

	}

	getDuration = () => {
		let time = Math.floor(this.videoRef.current.duration);
		let hrs = Math.floor(time / 3600);
		let mins = Math.floor((time % 3600) / 60);
		if (mins < 10) mins = '0'+mins;
		let secs = time % 60;
		let videoDuration = '';
		if (hrs > 0) {
			videoDuration += "" + hrs + ":" + (mins < 10 ? "0" : "");
		}
		videoDuration += "" + mins + ":" + (secs < 10 ? "0" : "");
		videoDuration += "" + secs;
		this.setState({ duration: videoDuration });
	}

	componentDidMount() {
		this.dragCounter = 0;
	}

	handleDrag = e => {
		e.preventDefault();
		e.stopPropagation();
	}

	handleDragIn = e => {
		e.preventDefault();
		e.stopPropagation();
		this.dragCounter++;
		this.setState({ dragging: true });
	}

	handleDragOut = e => {
		e.preventDefault();
		e.stopPropagation();
		this.dragCounter--;
		if (this.dragCounter > 0) return;
		this.setState({ dragging: false });
	}

	handleDrop = e => {    
		e.preventDefault();
		if (e.dataTransfer.files && e.dataTransfer.files.length === 1) {
			if (e.dataTransfer.files[0].type === 'video/mp4') {
				this.setState({ file: e.dataTransfer.files[0] });
				this.videoRef.current.src = window.URL.createObjectURL(e.dataTransfer.files[0]);
				this.videoRef.current.onloadedmetadata = () => {
					this.getDuration();
					//this.uploadVideo();
				}
			} else {
				alert('Wrong file type!');
			}
		} else {
			alert('Too much files! You can select only one file');
		}
	}

	handleInputChange = e => {
		if (e.target.files.length === 1) {
			if (e.target.files[0].type === 'video/mp4') {
				this.setState({ file: e.target.files[0] });
				this.videoRef.current.src = window.URL.createObjectURL(e.target.files[0]);
				this.videoRef.current.onloadedmetadata = () => {
					this.getDuration();
					//this.uploadVideo();
				}
			} else {
				alert('Wrong file type!');
			}
		} else {
			alert('Too much files! You can select only one file');
		}
	}

	openFileInput = () => {
		this.inputRef.current.click();
	}

	handleTitleChange = e => {
		if (e.target.value.length === 0) {
			this.setState({ inputTitleError: true, title: e.target.value });
		} else {
			this.setState({ inputTitleError: false, title: e.target.value });
		}
	}

	handleDescriptionChange = e => {
		this.setState({ description: e.currentTarget.textContent });
	}

	handleSelectInput = e => {
		this.setState({ status: e.target.value });
	}

	handleMiniatureInputChange = e => {
		if (e.target.files[0].type === 'image/jpeg') {
			this.setState({ miniatureLink: window.URL.createObjectURL(e.target.files[0]), miniatureFile: e.target.files[0] });
		} else {
			alert('Wrong file type!');
		}
	}

	render() {
		return (
			<UploadContainer>
				<HiddenVideoPlayer onLoadedMetadata={this.getDuration} ref={this.videoRef} />
				{
					this.state.file === null ? (
						<UploadFilePlace onClick={this.openFileInput} onDragEnter={this.handleDragIn} onDragLeave={this.handleDragOut} onDragOver={this.handleDrag} onDrop={this.handleDrop}>
							<HiddenFileInput onChange={this.handleInputChange} ref={this.inputRef} type="file" accept="video/mp4"/>
							<UploadFileIcon dragging={this.state.dragging ? 1 : 0} name="upload" />
							<UploadFileText>Upload video by dragging or clicking here</UploadFileText>
						</UploadFilePlace>
					) : (
						<UploadProgressBar>
							<Progress progress={this.state.progress} />
							<UploadFormWrapper>
								<UploadFormInformations>
									<UploadFormInput error={this.state.inputTitleError ? 1 : 0} onChange={this.handleTitleChange} value={this.state.title} required/>
									<UploadFormDesc onInput={this.handleDescriptionChange} value={this.state.description} contentEditable={true}/>
									<UploadSelect>
										<UploadOption onChange={this.handleSelectInput} value="public">Public</UploadOption>
										<UploadOption onChange={this.handleSelectInput} value="private">Private</UploadOption>
									</UploadSelect>
								</UploadFormInformations>
								<UploadFormMiniature>
									<Miniature miniature={this.state.miniatureLink} />
									<MiniatureFileInput onChange={this.handleMiniatureInputChange} type="file" accept="image/jpeg"/>
								</UploadFormMiniature>
							</UploadFormWrapper>
							<UploadVideoButton>Save</UploadVideoButton>
						</UploadProgressBar>
					)
				}
			</UploadContainer>
		);
	}
}

export default connect(null, { createVideo })(Upload);