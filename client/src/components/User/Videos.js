import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

const VideosContainer = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 20px 0px;

	@media (max-width: 600px) {
		justify-content: center;
	}
`

const Video = styled(Link)`
	width: 230px;
	height: 200px;
	display: flex;
	flex-direction: column;
	font-family: 'Lato';
	text-decoration: none;
	margin: 10px 5px;
`

const Miniature = styled.img`
	width: 100%;
	height: 150px;
`

const Title = styled.p`
	margin: 0;
	color: #000;
	font-size: 18px;
	margin-top: 2px;
	word-break: break-all;
`

const Info = styled.p`
	font-size: 12px;
	color: #6E6E6E;
	margin: 0;
	margin-top: 2px;
`

const Videos = ({videos}) => {
	return (
		<VideosContainer id="videos-wrapper">
			{
				videos && (
					videos.map((item, index) => {
						if (item.title.length >= 46) {
							item.title = item.title.substring(0, 46)+'...';
						}
						item.createdAt = new Date( Number(item.createdAt) );
						item.createdAt = DateTime.fromJSDate( item.createdAt );
						return (
							<Video key={index} to={`/watch/${item._id}`}>
								<Miniature alt="" src={item.miniature}/>
								<Title>{item.title}</Title>
								<Info>{`${item.views} views ${String.fromCodePoint(9679)} ${item.createdAt.toRelative()}`}</Info>
							</Video>
						)
					})
				)
			}
		</VideosContainer>
	);
};

export default Videos;