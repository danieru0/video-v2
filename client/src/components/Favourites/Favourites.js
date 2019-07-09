import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getUserFavouritesVideos, clearUserFavouritesVideos } from '../../actions/userAction';

import NormalVideo from '../../shared/NormalVideo/NormalVideo';

const FavouritesContainer = styled.div`
	width: calc(100% - 250px);
	min-height: calc(100vh - 80px);	
	margin-left: 250px;
	margin-top: 80px;
	font-family: 'Lato';

	@media (max-width: 920px) {
		width: 100%;
		margin-left: 0px;
	}
`

const FavouritesWrapper = styled.div`
	width: 1565px;
	height: 100%;
	margin: auto;
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;

	@media (max-width: 1550px) {
		width: 90%;
	}
`

const FavouritesText = styled.p`
	font-size: 22px;
	font-weight: bold;
	margin: 0;
	width: 100%;
	margin-top: 30px;
`

class Favourites extends Component {
	componentDidMount() {
		this.props.getUserFavouritesVideos();
	}

	componentWillUnmount() {
		this.props.clearUserFavouritesVideos();
	}

	render() {
		const { favouritesVideos } = this.props;
		return (
			<FavouritesContainer>
				<FavouritesWrapper>
				<FavouritesText>Your Favourites</FavouritesText>
					{
						favouritesVideos && (
							favouritesVideos.map((item, index) => {
								return (
									<NormalVideo key={index} title={item.title} id={item._id} miniature={item.miniature} author={item.author.nick} createdAt={item.createdAt} views={item.views} length={item.length} />
								)
							})
						)
					}
				</FavouritesWrapper>
			</FavouritesContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		favouritesVideos: state.videoReducer.favouritesVideos
	}
}

export default connect(mapStateToProps, { getUserFavouritesVideos, clearUserFavouritesVideos })(Favourites);