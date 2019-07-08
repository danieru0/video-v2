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

	@media (max-width: 1550px) {
		width: 90%;
	}
`

const HeadMostPopularWrapper = styled.div`
	width: 100%;
	height: 260px;
	margin-top: 60px;
	display: flex;
	flex-direction: column;
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
`

class Head extends Component {
	componentDidMount() {
		this.props.getVideos({page: 1, limit: 5, sort: "popular"}, true);
		this.props.getVideos({page: 1, limit: 10});
	}

	componentWillUnmount() {
		this.props.clearVideos();
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
											<PopularVideo key={index} id={item._id} title={item.title} miniature={item.miniature} author={item.author.nick} createdAt={item.createdAt} views={item.views} />
										)
									})
								)
							}
						</MostPopular>
					</HeadMostPopularWrapper>
					<HeadAllWrapper>
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