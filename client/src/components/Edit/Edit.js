import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from '../../shared/Loader/Loader';

import { getVideos, editVideo, clearEditVideo, removeVideo } from '../../actions/videoAction';
import Axios from 'axios';

const EditContainer = styled.div`
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

	@media (max-height: 722px) {
		height: 100%;
	}

`

const EditFormWrapper = styled.div`
	width: 900px;
	display: flex;
	position: relative;

	@media (max-width: 1224px) {
		width: 90%;
	}

	@media (max-width: 540px) {
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 30px;
	}
`

const EditFormInformations = styled.div`
	width: 60%;

	@media (max-width: 540px) {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-bottom: 30px;
	}
`

const EditFormInput = styled.input`
	width: 90%;
	height: 40px;
	background: #fff;
	border: ${({error}) => error ? '2px solid red;' : '2px solid #e7e7e7;'}
	font-size: 20px;
	margin-bottom: 10px;
	font-family: 'Lato';
`

const EditFormDesc = styled.textarea`
	width: 90%;
	height: 200px;
	border: 2px solid #E7E7E7;
	font-size: 16px;
	margin-bottom: 10px;
	background: #fff;
	font-family: 'Lato';
	resize: none;
`

const EditSelect = styled.select`
	width: 200px;
	height: 40px;
	font-size: 16px;
	font-family: 'Lato';
	border: 2px solid #E7E7E7;

	@media (max-width: 540px) {
		width: 90%;
	}
`

const EditOption = styled.option``

const EditFormMiniature = styled.div`
	width: 40%;
	position: relative;
	height: 225px;

	@media (max-width: 540px) {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
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

const EditButtonsWrapper = styled.div`
	display: flex;
	position: relative;
	margin-top: 70px;

	&:before {
		content: '';
		width: 110%;
		height: 100%;
		padding: 30px 0px;
		position: absolute;
		background: rgba(0,0,0,0.4);
		z-index: 2;
		left: -10px
		top: -10px;
		display: ${({saving}) => saving ? 'block' : 'none'};
	}

	@media (max-width: 540px) {
		margin-bottom: 30px;
	}
`

const EditVideoButton = styled.button`
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
	margin-left: 5px;
	margin-right: 5px;
`

class Edit extends Component {
	constructor() {
		super();
		this.state = {
			desc: null,
			title: null,
			status: null,
			miniatureLink: null,
			miniatureFile: null,
			miniatureUploading: false,
			saving: false
		}
	}

	componentDidMount() {
		if (this.props.user) {
			this.props.getVideos({ id: this.props.match.params.id, author: this.props.user._id, page:1, limit: 1 }, false, 'edit');
		}
	}

	componentWillUnmount() {
		this.props.clearEditVideo();
	}

	handleInputChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	handleMiniatureInputChange = e => {
		if (e.target.files[0].type === 'image/jpeg') {
			this.setState({
				miniatureLink: window.URL.createObjectURL(e.target.files[0]),
				miniatureFile: e.target.files[0]
			});
		} else {
			alert('Wrong file type!');
		}
	}

	save = async () => {
		if (this.state.saving) return;

		this.setState({
			saving: true
		});
		
		if (this.state.miniatureFile) {
			this.setState({
				miniatureUploading: true
			});
			const formData = new FormData();
			formData.append('miniature', this.state.miniatureFile, this.props.match.params.id);
			try {
				await Axios({
					url: '/upload/miniature',
					method: 'post',
					data: formData,
					headers: {
						'Content-Type': 'multipart/form-data',
						'Authorization': localStorage.getItem('token')
					}
				});

				this.setState({
					miniatureUploading: false
				});
			} catch (err) {
				throw err;
			}
		}

		const options = {
			id: this.props.match.params.id
		}
		this.state.title && (options.title = this.state.title)
		this.state.desc && (options.description = this.state.desc);
		this.state.status && (options.status = this.state.status);

		this.props.editVideo(options);
		this.setState({
			saving: false
		})
	}

	remove = () => {
		if (window.confirm('Are you sure?')) {
			this.props.removeVideo(this.props.match.params.id);
			window.setTimeout(() => {
				this.props.history.push('/');
			}, 500);
		}
	}

	render() {
		const { videoEdit } = this.props;
		return (
			<EditContainer>
				{
					videoEdit && (
						<>
							<EditFormWrapper>
								<EditFormInformations>
									<EditFormInput onChange={this.handleInputChange} id="title" defaultValue={videoEdit[0].title} placeholder="Title..."/>
									<EditFormDesc onChange={this.handleInputChange} id="desc" defaultValue={videoEdit[0].description}></EditFormDesc>
									<EditSelect onChange={this.handleInputChange} id="status" defaultValue={videoEdit[0].status}>
										<EditOption value="public">Public</EditOption>
										<EditOption value="private">Private</EditOption>
									</EditSelect>
								</EditFormInformations>
								<EditFormMiniature>
									<FormMiniatureOverlay miniatureUploading={this.state.miniatureUploading ? 1 : 0}> 
										<Loader />
									</FormMiniatureOverlay>
									<Miniature miniature={this.state.miniatureLink ? this.state.miniatureLink : videoEdit[0].miniature}/>
									<MiniatureFileInput onChange={this.handleMiniatureInputChange} accept="image/jpeg" type="file"/>
								</EditFormMiniature>
							</EditFormWrapper>
							<EditButtonsWrapper saving={this.state.saving ? 1 : 0}>
								<EditVideoButton onClick={this.save}>Save</EditVideoButton>
								<EditVideoButton onClick={this.remove}>Delete</EditVideoButton>
							</EditButtonsWrapper>
						</>
					)
				}
			</EditContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		videoEdit: state.videoReducer.videoEdit,
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps, { getVideos, editVideo, clearEditVideo, removeVideo })(withRouter(Edit));