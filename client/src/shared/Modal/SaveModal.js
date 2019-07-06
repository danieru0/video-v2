import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';

import Modal from './Modal';

import { addVideoToPlaylist } from '../../actions/playlistAction';

const ModalWrapper = styled.div`
	width: 300px;
	min-height: 200px;
	background: #fff;
	border-radius: 3px;
	box-shadow: 0px 0px 100px 0px rgba(0,0,0,0.2);
	display: flex;
	flex-direction: column;

	@media (max-width: 674px) {
		width: 80%;
	}
`

const ModalTitle = styled.p`
	font-family: 'Lato';
	font-size: 24px;
	color: #000;
	margin: 0;
	margin-top: 20px;
	margin-left: 20px;
	font-weight: bold;
	position: relative;
	
	&::after {
		content: "";
		width: 100%;
		height: 1px;
		position: absolute;
		background: #e7e7e7;
		left: -10px;
		bottom: -20px;
	}
`

const ModalList = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 40px;
	max-height: 160px;
	overflow-y: auto;
`

const ModalItem = styled.li`
	width: 100%;
`

const ModalPlaylistButton = styled.button`
	width: 100%;
	height: 40px;
	background: ${({active}) => active && '#E6F5F0'};
	border: none;
	font-family: 'Lato';
	font-weight: bold;
	font-size: 20px;
	cursor: pointer;
	display: flex;
	align-items: center;
	position: relative;
	padding-left: 60px;
	outline: none;
	color: ${({active}) => active && '#10A074'};
	
	&:hover {
		background: #E6F5F0;
	}

	.fa {
		color: ${({active}) => active && '#10A074'};
	}
`

const ModalStyledIcon = styled(FontAwesome)`
	font-size: 20px;
	color: #adadad;
	position: absolute;
	left: 20px;
`

const ModalButtonsWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	height: 70px;
	position: relative;
	margin-top: 20px;
	padding-right: 10px;

	&::before {
		content: "";
		width: calc(100% - 20px);
		left: 10px;
		height: 1px;
		background: #e7e7e7;
		position: absolute;
		top: 0px;
	}
`

const ModalButton = styled.button`
	color: #10A074;
	background: none;
	border: none;
	outline: none;
	padding: 10px 10px;
	font-size: 18px;
	text-transform: uppercase;
	letter-spacing: -1px;
	cursor: pointer;

	&:focus,
	&:hover {
		background: rgba(0,0,0,0.1);
	}
`

const SaveModal = ({onExit, addVideoToPlaylist, user, videoid}) => {
	const [ activePlaylist, setActivePlaylist ] = useState(false);

	const setActive = (e, id) => {
		setActivePlaylist(id);
	}

	const addVideo = () => {
		if (activePlaylist) {
			addVideoToPlaylist(activePlaylist, videoid);
		}
	}

	return (
		<Modal onExit={onExit}>
			<ModalWrapper>
				<ModalTitle>Choose playlist</ModalTitle>
				<ModalList>
					{
						user && (
							user.playlists.map((item, index) => {
								return (
									<ModalItem key={index}>
										<ModalPlaylistButton active={activePlaylist === item.id ? 1 : 0} onClick={(e) => setActive(e, item.id)}>
											<ModalStyledIcon name={item.status === 'public' ? 'folder' : 'lock'} />
											{item.name}
										</ModalPlaylistButton>
									</ModalItem>
								)
							})
						)
					}
				</ModalList>
				<ModalButtonsWrapper>
						<ModalButton onClick={onExit}>Cancel</ModalButton>
						<ModalButton onClick={addVideo}>Save</ModalButton>
				</ModalButtonsWrapper>
			</ModalWrapper>
		</Modal>
	);
};

const mapStateToProps = state => {
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps, { addVideoToPlaylist })(SaveModal);