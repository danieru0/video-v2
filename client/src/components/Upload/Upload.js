import React, { Component } from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import { connect } from 'react-redux';

import Loader from '../../shared/Loader/Loader';

import formatDuration from '../../shared/helpers/formatDuration';

import { createVideo, editVideo } from '../../actions/videoAction';

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
	position: relative;
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
	height: 225px;
	position: relative;
`

const FormMiniatureOverlay = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	background: rgba(0,0,0,0.3);
	justify-content: center;
	align-items: center;
	display: ${({miniatureUploading}) => miniatureUploading ? 'flex;' : 'none;'}
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
	position: relative;
`

const UploadVideoOverlay = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.3);
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 5px;
	display: ${({saving}) => saving ? 'block;' : 'none;'}
`

const HiddenVideoPlayer = styled.video`
	position: absolute;
	visibility: hidden;
`

const UploadStatusText = styled.p`
	margin: 0;
	font-size: 18px;
	font-family: 'Lato';
	font-weight: bold;
	letter-spacing: -1px;
	position: absolute;
	top: -30px;
	left: 0px;
`

const HiddenCanvas = styled.canvas`
	position: absolute;
	visibility: hidden;
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
			uploadedName: null,
			status: 'public',
			miniatureLink: null,
			miniatureFile: null,
			miniatureUploading: false,
			miniatureUploaded: false,
			saving: false,
			uploadingText: 'Your video is uploading to server...'
		}
	}

	inputRef = React.createRef();
	videoRef = React.createRef();
	canvasRef = React.createRef();

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
				uploadedName: result.data.name,
				uploadingText: 'Your video is uploaded!'
			});

			if (this.state.miniatureFile) {
				this.setState({
					miniatureUploading: true
				});
				const formData = new FormData();
				formData.append('miniature', this.state.miniatureFile, this.state.uploadedName.split('.')[0]);
				try {
					await axios({
						url: '/upload/miniature',
						method: 'post',
						data: formData,
						headers: {
							'Content-Type': 'multipart/form-data',
							'Authorization': localStorage.getItem('token')
						}
					});
	
					this.setState({
						miniatureUploading: false,
						miniatureUploaded: true
					});
	
				} catch (err) {
					throw err;
				}
			}

			const options = {
				title: this.state.title.length === 0 ? this.state.title : 'My awesome title', 
				description: this.state.description,
				status: this.state.status,
				path: `/videos/${result.data.name}`,
				length: this.state.duration,
				_id: result.data.name.split('.')[0],
			}

			this.state.miniatureUploaded && (options.miniature = `/miniatures/${result.data.name.split('.')[0]}.jpg`);

			this.props.createVideo(options);
			
		} catch (err) {
			window.location.href = '/';
		}

	}

	getDuration = () => {
		this.setState({ duration: formatDuration(this.videoRef.current.duration) });
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
				this.videoRef.current.src = `${window.URL.createObjectURL(e.dataTransfer.files[0])}#t=3`; 
				this.videoRef.current.onloadedmetadata = () => {
					setTimeout(() => {
						this.createMiniature();
						this.getDuration();
						this.uploadVideo();
					}, 500)
				}
			} else {
				alert('Wrong file type!');
			}
		} else {
			alert('Too much files! You can select only one file');
		}
	}

	makeMiniatureFile = (dataURL) => {
		const blobBin = atob(dataURL.split(',')[1]);
		const array = [];
		for (var i = 0; i < blobBin.length; i++) {
			array.push(blobBin.charCodeAt(i));
		}
		const file = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
		return file;
	}

	createMiniature = () => {
		const context = this.canvasRef.current.getContext('2d');
		context.drawImage(this.videoRef.current, 0, 0, 640, 480);
		this.setState({
			miniatureLink: this.canvasRef.current.toDataURL('image/jpeg'),
			miniatureFile: this.makeMiniatureFile(this.canvasRef.current.toDataURL('image/jpeg'))
		});
	}

	handleInputChange = e => {
		if (e.target.files.length === 1) {
			if (e.target.files[0].type === 'video/mp4') {
				this.setState({ file: e.target.files[0] });
				this.videoRef.current.src = `${window.URL.createObjectURL(e.target.files[0])}#t=3`; 
				this.videoRef.current.onloadedmetadata = () => {
					setTimeout(() => {
						this.createMiniature();
						this.getDuration();
						this.uploadVideo();
					}, 500)
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

	updateUploadedVideo = async () => {
		if (this.state.saving) return;

		if (this.state.uploaded) {
			if (this.state.miniatureFile) {
				this.setState({
					miniatureUploading: true,
					saving: true
				});
				const formData = new FormData();
				formData.append('miniature', this.state.miniatureFile, this.state.uploadedName.split('.')[0]);
				try {
					await axios({
						url: '/upload/miniature',
						method: 'post',
						data: formData,
						headers: {
							'Content-Type': 'multipart/form-data',
							'Authorization': localStorage.getItem('token')
						}
					});
	
					this.setState({
						miniatureUploading: false,
						miniatureUploaded: true,
					});
	
				} catch (err) {
					throw err;
				}
			}

			const options = {
				title: this.state.title.length === 0 ? 'My awesome title' : this.state.title, 
				description: this.state.description,
				status: this.state.status,
				id: this.state.uploadedName.split('.')[0],
			}
			this.state.miniatureUploaded && (options.miniature = `/miniatures/${this.state.uploadedName.split('.')[0]}.jpg`);

			this.props.editVideo(options);

			this.setState({
				saving: false
			});
		}
	}

	render() {
		return (
			<UploadContainer>
				<HiddenVideoPlayer src="" preload="metadata" width="640" height="480" ref={this.videoRef} />
				<HiddenCanvas width="640" height="480" ref={this.canvasRef} />
				{
					this.state.file === null ? (
						<UploadFilePlace onClick={this.openFileInput} onDragEnter={this.handleDragIn} onDragLeave={this.handleDragOut} onDragOver={this.handleDrag} onDrop={this.handleDrop}>
							<HiddenFileInput onChange={this.handleInputChange} ref={this.inputRef} type="file" accept="video/mp4"/>
							<UploadFileIcon dragging={this.state.dragging ? 1 : 0} name="upload" />
							<UploadFileText>Upload video by dragging or clicking here</UploadFileText>
						</UploadFilePlace>
					) : (
						<UploadProgressBar>
							<UploadStatusText>{this.state.uploadingText}</UploadStatusText>
							<Progress progress={this.state.progress} />
							<UploadFormWrapper>
								<UploadFormInformations>
									<UploadFormInput error={this.state.inputTitleError ? 1 : 0} onChange={this.handleTitleChange} value={this.state.title} required/>
									<UploadFormDesc onInput={this.handleDescriptionChange} value={this.state.description} contentEditable={true}/>
									<UploadSelect onChange={this.handleSelectInput}>
										<UploadOption value="public">Public</UploadOption>
										<UploadOption value="private">Private</UploadOption>
									</UploadSelect>
								</UploadFormInformations>
								<UploadFormMiniature>
									<FormMiniatureOverlay miniatureUploading={this.state.miniatureUploading ? 1 : 0}>
										<Loader />
									</FormMiniatureOverlay>
									<Miniature miniature={this.state.miniatureLink} />
									<MiniatureFileInput onChange={this.handleMiniatureInputChange} type="file" accept="image/jpeg"/>
								</UploadFormMiniature>
							</UploadFormWrapper>
							<UploadVideoButton onClick={this.updateUploadedVideo}>
								Save
								<UploadVideoOverlay saving={this.state.saving ? 1 : 0}></UploadVideoOverlay>
							</UploadVideoButton>
						</UploadProgressBar>
					)
				}
			</UploadContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps, { createVideo, editVideo })(Upload);