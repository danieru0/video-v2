import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';

import { getVideos } from '../../actions/videoAction';
import { clearUserVideos } from '../../actions/clearAction';

const VideoWatchLink = styled(Link)`
	font-size: 14px;
	color: #000;
	margin-left: auto;
	align-self: center;
	margin-right: 30px;
	display: none;
`

const VideosContainer = styled.div`
	width: calc(100% - 250px);
	min-height: calc(100vh - 80px);	
	margin-left: 250px;
	margin-top: 80px;
	font-family: 'Lato';
	position: relative;

	@media (max-width: 920px) {
		width: 100%;
		margin-left: 0px;
	}
`

const VideosWrapper = styled.div`
	width: 1600px;
	margin: 0px auto;
	display: flex;
	flex-direction: column;
	
	@media (max-width: 1850px) {
		width: 95%;
	}
`

const VideosMenu = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	margin-top: 30px;
	border-bottom: 1px solid #E7E7E7;
	margin-bottom: 10px;

	@media (max-width: 780px) {
		overflow: hidden;
	}
`

const MenuFilmVideoText = styled.p`
	margin: 0;
	width: 80%;
	height: 100%;
	display: flex;
	align-items: center;
	padding-left: 30px;
	color: #ACACAC;
	
	@media (max-width: 780px) {
		width: 300px;
		flex-shrink: 0;
	}
`

const MenuFilmText = styled.p`
	margin: 0;
	width: 150px;
	display: flex;
	align-items: center;
	color: #ACACAC;

	@media (max-width: 780px) {
		flex-shrink: 0;
		width: 100px;
	}
`

const MenuButton = styled.button`
	width: 150px;
	background: none;
	border: none;
	font-size: 16px;
	display: flex;
	align-items: center;
	outline: none;
	font-size: 15px;
	cursor: pointer;
	color: ${({active}) => active ? '#000' : '#acacac'};

	&:hover {
		color: #000;
	}

	@media (max-width: 780px) {
		flex-shrink: 0;
		width: 100px;
	}
`

const Video = styled.div`
	width: 100%;
	height: 90px;
	display: flex;
	margin: 5px 0px;
	padding-bottom: 10px;
	padding-top: 10px;

	&:hover {
		background: #F4F4F4;
	}

	&:hover ${VideoWatchLink} {
		display: block;
	}

	@media (max-width: 780px) {
		overflow-x: scroll;
	}
`

const VideoInfo = styled.div`
	width: 80%;
	height: 100%;
	display: flex;

	@media (max-width: 780px) {
		width: 300px;
		flex-shrink: 0;
	}
`

const VideoImageWrapper = styled.div`
	position: relative;
`

const VideoLength = styled.div`
	position: absolute;
	padding: 5px;
	min-width: 20px;
	height: 20px;
	background: #000;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 12px;
	color: #fff;
	bottom: 5px;
	right: 5px;
`

const VideoImage = styled.img`
	height: 100%;
	width: 130px;
	margin-left: 30px;
	position: relative;
`

const VideoInfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 15px;
	justify-content: center;
`

const VideoTitleLink = styled(Link)`
	text-decoration: none;
	color: #000;
	align-self: flex-start;

	&:hover {
		color: blue;
		text-decoration: underline;
	}
`

const VideoDesc = styled.p`
	margin: 0;
	font-size: 14px;
	color: #D5D5D5;
	width: 300px;
	word-break: break-all;

	@media (max-width: 1215px) {
		display: none;
	}
`

const VideoText = styled.p`
	width: 150px;
	height: 100%;
	display: flex;
	align-items: center;
	margin: 0;

	@media (max-width: 780px) {
		flex-shrink: 0;
		width: 100px;
	}
`

class Videos extends Component {
	constructor() {
		super();
		this.state = {
			activeButton: null,
			sort: 'newest',
			page: 1
		}
	}
	componentDidMount() {
		if (this.props.user) {
			this.props.getVideos({ author: this.props.user._id, page:1, limit: 10, sort: 'newest' }, false, 'user');
			document.addEventListener('scroll', this.trackScrolling);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.user !== this.props.user) {
			this.props.getVideos({ author: this.props.user._id, page:1, limit: 10, sort: 'newest' }, false, 'user');
		}
		if (prevProps.userVideos !== this.props.userVideos) {
			document.addEventListener('scroll', this.trackScrolling);
		}
	}

	componentWillUnmount() {
		this.props.clearUserVideos();
		document.removeEventListener('scroll', this.trackScrolling);
	}

	trackScrolling = () => {
		const videosWrapper = document.getElementById('videos-wrapper');
		if (videosWrapper.getBoundingClientRect().bottom <= window.innerHeight) {
			document.removeEventListener('scroll', this.trackScrolling);
			this.setState({
				page: this.state.page + 1
			}, () => {
				this.props.getVideos({author: this.props.user._id, page: this.state.page, limit: 10, sort: this.state.sort}, false, 'user', true);
			});
		} 
	}

	sort = type => {
		this.setState({
			activeButton: type,
			page: 1
		});
		if (type === 'date') {
			if (this.state.sort === 'newest') {
				this.setState({
					sort: 'oldest'
				});
				this.props.getVideos({ author: this.props.user._id, page:1, limit: 10, sort: 'oldest' }, false, 'user');
			} else if (this.state.sort === 'oldest') {
				this.setState({
					sort: 'newest'
				});
				this.props.getVideos({ author: this.props.user._id, page:1, limit: 10, sort: 'newest' }, false, 'user');
			} else {
				this.props.getVideos({ author: this.props.user._id, page:1, limit: 10, sort: 'newest' }, false, 'user');
			}
		} else {
			if (this.state.sort !== 'popular') {
				this.setState({
					sort: 'popular'
				});
				this.props.getVideos({ author: this.props.user._id, page:1, limit: 10, sort: 'popular' }, false, 'user');
			} else {
				this.setState({
					sort: 'newest'
				});
				this.props.getVideos({ author: this.props.user._id, page:1, limit: 10, sort: 'newest' }, false, 'user');
			}
		}
	}

	render() {
		const { userVideos } = this.props;
		return (
			<VideosContainer>
				<VideosWrapper id="videos-wrapper">
					<VideosMenu>
						<MenuFilmVideoText>Videos</MenuFilmVideoText>
						<MenuFilmText>Status</MenuFilmText>
						<MenuButton active={this.state.activeButton === 'date' ? 1 : 0} onClick={() => this.sort('date')}>Date</MenuButton>
						<MenuButton active={this.state.activeButton === 'views' ? 1 : 0} onClick={() => this.sort('views')}>Views</MenuButton>
						<MenuFilmText>Likes</MenuFilmText>
					</VideosMenu>
					{
						userVideos && (
							userVideos.map((item, index) => {
								item.createdAt = new Date( Number(item.createdAt) );
								item.createdAt = DateTime.fromJSDate( item.createdAt );
								return (
									<Video key={index}>
										<VideoInfo>
											<VideoImageWrapper>
												<VideoImage alt="" src={item.miniature}/>
												<VideoLength>{item.length}</VideoLength>
											</VideoImageWrapper>
											<VideoInfoWrapper>
												<VideoTitleLink to={`/edit/${item._id}`}>{item.title}</VideoTitleLink>
												<VideoDesc>{item.description.substring(0, 90)}</VideoDesc>
											</VideoInfoWrapper>
											<VideoWatchLink to={`/watch/${item._id}`}>
												<FontAwesome name='play' />
											</VideoWatchLink>
										</VideoInfo>
										<VideoText>{item.status}</VideoText>
										<VideoText>{item.createdAt.toString().split('T')[0]}</VideoText>
										<VideoText>{item.views}</VideoText>
										<VideoText>{item.likes}</VideoText>
									</Video>
								)
							})
						)
					}
				</VideosWrapper>
			</VideosContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		userVideos: state.videoReducer.userVideos,
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps, { getVideos, clearUserVideos })(Videos);