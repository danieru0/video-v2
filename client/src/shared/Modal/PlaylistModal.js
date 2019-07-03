import React from 'react';
import styled from 'styled-components';

import Modal from './Modal';

const ModalWrapper = styled.div`
	width: 600px;
	height: 180px;
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
`

const ModalInput = styled.input`
	width: 93%;
	height: 45px;
	margin: 0px 20px;
	background: #fff;
	border: none;
	border-bottom: 2px solid #aaa;
	outline: none;
	font-size: 20px;
	padding-top: 10px;
	margin-top: 20px;

	&:focus {
		border-bottom: 2px solid #10A074;
	}
`

const ModalButtons = styled.div`
	display: flex;
	margin-left: auto;
	margin-right: 22px;
	margin-top: 10px;
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

const PlaylistModal = ({onExit}) => {
	return (
		<Modal onExit={onExit}>
			<ModalWrapper>
				<ModalTitle>Create playlist</ModalTitle>
				<ModalInput placeholder="Playlist name..."/>
				<ModalButtons>
					<ModalButton onClick={onExit}>Cancel</ModalButton>
					<ModalButton>Create</ModalButton>
				</ModalButtons>
			</ModalWrapper>
		</Modal>
	);
};

export default PlaylistModal;