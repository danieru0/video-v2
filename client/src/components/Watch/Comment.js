import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CommentContainer = styled.div`
	display: flex;
	width: 600px;
	margin: 10px 0px;
	padding-top: 10px;

	@media (max-width: 680px) {
		width: 100%;
	}

	&:last-of-type {
		padding-bottom: 20px;
	}
`

const CommentLink = styled(Link)`
	text-decoration: none;
`

const CommentAvatar = styled.img`
	width: 42px;
	height: 42px;
	border-radius: 50%;
`

const CommentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 15px;
`

const CommentAuthor = styled.p`
	font-size: 16px;
	margin: 0;
	color: #000;
`

const CommentDate = styled.span`
	font-size: 14px;
	color: #BBBBBB;
	margin-left: 2px;
`

const CommentText = styled.div`
	font-size: 14px;
	margin-top: 2px;
	white-space: pre-wrap;
`

const Comment = ({nick, avatar, date, text}) => {
	return (
		<CommentContainer>
			<CommentLink to={`/user/${nick}`}>
				<CommentAvatar alt="" src={avatar}/>
			</CommentLink>
			<CommentWrapper>
				<CommentLink to={`/user/${nick}`}>
					<CommentAuthor>
						{nick}
						<CommentDate>{date}</CommentDate>
					</CommentAuthor>
				</CommentLink>
				<CommentText readOnly disabled>{text.split('<br>').join("\n")}</CommentText>
			</CommentWrapper>
		</CommentContainer>	
	);
};

Comment.propTypes = {
	avatar: PropTypes.string.isRequired,
	nick: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
}

export default Comment;