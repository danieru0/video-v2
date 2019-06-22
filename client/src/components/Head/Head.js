import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

import { getVideos } from '../../actions/videoAction';

const HeadContainer = styled.div`
	width: calc(100% - 250px);
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
	justify-content: space-between;
	margin-top: 30px;
`

const PopularVideo = styled(Link)`
	width: 300px;
	height: 200px;
	background: ${({miniature}) => `url(${miniature});`}
	background-size: cover;
	background-position: center;
	position: relative;
`

const PopularVideoOverlay = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	background: rgba(0,0,0,0.4);
`

const PopularVideoTitle = styled.p`
	color: #fff;
	font-size: 18px;
	font-weight: bold;
	margin-left: 20px;
	margin-bottom: 5px;
`

const PopularVideoInfo = styled.p`
	color: #fff;
	font-size: 16px;
	margin-left: 20px;
	margin-top: 0;
	margin-bottom: 5px;
`

const PopularVideoViews = styled.p`
	color: #fff;
	font-size: 16px;
	margin-left: 20px;
	margin-top: 0px;
`

class Head extends Component {

	componentDidMount() {
		this.props.getVideos({page: 1, limit: 5, sort: "popular"});
	}

	render() {
		const { popularVideos } = this.props;
		return (
			<HeadContainer>
				<HeadWrapper>
					<HeadMostPopularWrapper>
						<HeadText>Most Popular</HeadText>
						<MostPopular>
							{
								popularVideos && (
									popularVideos.map((item, index) => {
										item.createdAt = new Date( Number(item.createdAt) );
										item.createdAt = DateTime.fromJSDate( item.createdAt);
										return (
											<PopularVideo to={`/video/${item._id}`} key={index} miniature={item.miniature}>
												<PopularVideoOverlay>
													<PopularVideoTitle>{item.title}</PopularVideoTitle>
													<PopularVideoInfo>{`${item.author.nick} | ${ item.createdAt.toRelative() }`}</PopularVideoInfo>
													<PopularVideoViews>{`${item.views} views`}</PopularVideoViews>
												</PopularVideoOverlay>
											</PopularVideo>
										)
									})
								)
							}
						</MostPopular>
					</HeadMostPopularWrapper>
				</HeadWrapper>
			</HeadContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		popularVideos: state.videoReducer.popularVideos
	}
}

export default connect(mapStateToProps, { getVideos })(Head);