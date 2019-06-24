import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { DateTime } from 'luxon';

const HeadVideoIcon = styled(FontAwesome)`
	color: #1CA47B;
	background: #fff;
	box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1); 
	border-radius: 50%;
	width: 50px;
	height: 50px;
	position: absolute;
	font-size: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-left: 5px;
	right: 20px;
	top: 173px;
	transition: background .3s, color .3s;
`

const HeadVideo = styled(Link)`
	width: 280px;
	height: 300px;
	background: #fff;
	margin: 20px 0px;
	border-radius: 10px;
	box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1);
	text-decoration: none;
	position: relative;
	margin-right: 30px;

	&:hover ${HeadVideoIcon} {
		background: #1CA47B;
		color: #fff;
	}
`

const HeadVideoMiniature = styled.div`
	width: 100%;
	height: 200px;
	background: ${({miniature}) => `url(${miniature});`}
	background-size: cover;
	background-position: center;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
`

const HeadVideoTitle = styled.p`
	margin: 0;
	font-weight: bold;
	letter-spacing: -1px;
	font-size: 17px;
	margin-left: 20px;
	margin-top: 10px;
	color: #000;
	width: 190px;
	line-height: 18px;
	word-break: break-all;
`

const HeadVideoAuthor = styled.p`
	margin: 0;
	margin-left: 20px;
	margin-top: 5px;
	font-size: 15px;
	color: #B6B6B6;
`

const HeadVideoInfo = styled.p`
	margin: 0;
	margin-left: 20px;
	margin-top: 8px;
	color: #000;
	font-weight: bold;
	font-size: 15px;
`

const HeadVideoLength = styled.div`
	padding: 10px 15px;
	background: rgba(0,0,0,0.4);
	color: #fff;
	position: absolute;
	right: 20px;
	top: 20px;
	border-radius: 20px;
`

const NormalVideo = ({ id, miniature, title, author, views, createdAt, length }) => {
	createdAt = new Date( Number(createdAt) );
	createdAt = DateTime.fromJSDate( createdAt );
	if (title.length > 47) {
		title = title.substring(0, 45)+'...';
	}
	return (
		<HeadVideo to={`/videos/${id}`}>
			<HeadVideoIcon name="play" />
			<HeadVideoMiniature miniature={miniature} />
			<HeadVideoTitle>{title}</HeadVideoTitle>
			<HeadVideoAuthor>{`By ${author}`}</HeadVideoAuthor>
			<HeadVideoInfo>{`${views} views | ${createdAt.toRelative()}`}</HeadVideoInfo>
			<HeadVideoLength>{length}</HeadVideoLength>
		</HeadVideo>
	);
};

NormalVideo.propTypes = {
	id: PropTypes.string.isRequired,
	miniature: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	views: PropTypes.number.isRequired,
	length: PropTypes.string.isRequired
};

export default NormalVideo;