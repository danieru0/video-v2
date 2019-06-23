import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

const PopularVideoContainer = styled(Link)`
	width: 300px;
	height: 200px;
	background: ${({miniature}) => `url(${miniature});`}
	background-size: cover;
	background-position: center;
	position: relative;

	&:not(:first-of-type) {
		margin-left: 30px;
	}

	&:hover > div {
		background: rgba(0,0,0,0.3);
	}
`

const PopularVideoOverlay = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	background: rgba(0,0,0,0.4);
	transition: background .3s;
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

const PopularVideo = ({ id, miniature, title, author, createdAt, views }) => {
	createdAt = new Date( Number(createdAt) );
	createdAt = DateTime.fromJSDate( createdAt );
	if (title.length > 62) {
		title = title.substring(0, 62)+'...';
	}
	return (
		<PopularVideoContainer miniature={miniature} to={`/video/${id}`}>
			<PopularVideoOverlay>
				<PopularVideoTitle>{title}</PopularVideoTitle>
				<PopularVideoInfo>{`${author} | ${createdAt.toRelative()}`}</PopularVideoInfo>
				<PopularVideoViews>{`${views} views`}</PopularVideoViews>
			</PopularVideoOverlay>
		</PopularVideoContainer>
	);
};

PopularVideo.propTypes = {
	id: PropTypes.string.isRequired,
	miniature: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	views: PropTypes.number.isRequired
};

export default PopularVideo;