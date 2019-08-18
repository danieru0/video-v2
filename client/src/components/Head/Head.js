import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import PopularVideo from './PopularVideo';
import NormalVideo from '../../shared/NormalVideo/NormalVideo';

import { getVideos, clearVideos } from '../../actions/videoAction';

const HeadContainer = styled.div`
	width: calc(100% - 250px);
	min-height: calc(100vh - 80px);
	padding-bottom: 100px;
	margin-top: 80px;
	font-family: 'Lato';
	margin-left: 250px;

	@media (max-width: 920px) {
		width: 100%;
		margin-left: 0px;
	}
`

const HeadWrapper = styled.div`
	width: 1550px;
	height: 100%;
	margin: auto;

	@media (max-width: 1820px) {
		width: 90%;
	}
`

const HeadMostPopularWrapper = styled.div`
	width: 100%;
	height: 260px;
	margin-top: 60px;
	display: flex;
	flex-direction: column;

	@media (max-width: 1450px) {
		a:last-of-type {
			display: none;
		}
	}

	@media (max-width: 1100px) {
		a:nth-of-type(4) {
			display: none;
		}
	}

	@media (max-width: 635px) {
		a:nth-of-type(3) {
			display: none;
		}
	}

	@media (max-width: 400px) {
		a:nth-of-type(2) {
			display: none;
		}
	}
`

const HeadText = styled.p`
	font-size: 22px;
	font-weight: Bold;
	margin: 0;
`

const MostPopular = styled.div`
	width: 100%;
	display: flex;
	margin-top: 30px;

	@media (max-width: 400px) {
		justify-content: center;
	}
`

const HeadAllWrapper = styled.div`
	width: 100%;
	margin-top: 60px;
	display: flex;
	flex-wrap: wrap;

	p:first-child {
		width: 100%;
		margin-bottom: 10px;
	}

	@media (max-width: 920px) {
		justify-content: center;
	}
`

class Head extends Component {
	constructor() {
		super();
		this.state = {
			page: 1
		}
	}
	componentDidMount() {
		this.props.getVideos({page: 1, limit: 5, sort: "popular"}, true);
		this.props.getVideos({page: 1, limit: 15});
		document.addEventListener('scroll', this.trackScrolling);
	}

	componentWillUnmount() {
		this.props.clearVideos();
		document.removeEventListener('scroll', this.trackScrolling);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.videos !== this.props.videos) {
			document.addEventListener('scroll', this.trackScrolling);	
		}
	}

	trackScrolling = () => {
		const videosWrapper = document.getElementById('all-videos');
		if (videosWrapper.getBoundingClientRect().bottom <= window.innerHeight) {
			document.removeEventListener('scroll', this.trackScrolling);
			this.setState({
				page: this.state.page + 1
			}, () => {
				this.props.getVideos({page: this.state.page, limit: 15}, false, false, true);
			});
		} 
	}

	render() {
		const { popularVideos, videos } = this.props;
		return (
			<HeadContainer>
				<HeadWrapper>
					<HeadMostPopularWrapper>
						<HeadText>Most Popular</HeadText>
						<MostPopular>
							{
								popularVideos && (
									popularVideos.map((item, index) => {
										return (
											item &&
											<PopularVideo key={index} id={item._id} title={item.title} miniature={item.miniature} author={item.author.nick} createdAt={item.createdAt} views={item.views} />
										)
									})
								)
							}
						</MostPopular>
					</HeadMostPopularWrapper>
					<HeadAllWrapper id="all-videos">
						<HeadText>All Videos</HeadText>
						{
							videos && (
								videos.map((item, index) => {
									return (
										<NormalVideo key={index} title={item.title} id={item._id} miniature={item.miniature} author={item.author.nick} createdAt={item.createdAt} views={item.views} length={item.length} />
									)
								})
							)
						}
					</HeadAllWrapper>
				</HeadWrapper>
			</HeadContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		popularVideos: state.videoReducer.popularVideos,
		videos: state.videoReducer.videos
	}
}

export default connect(mapStateToProps, { getVideos, clearVideos })(Head);