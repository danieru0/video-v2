import React from 'react';
import styled from 'styled-components';
import Linkify from 'react-linkify';

const InformationsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	font-family: 'Lato';
`

const InformationsText = styled.p`
	margin: 0;
	margin-top: 30px;
	font-size: 18px;
`

const Description = styled.div`
	width: 500px;
	margin-top: 15px;
	word-break: break-all;
	white-space: pre-line;

	@media (max-width: 570px) {
		width: 80%;
	}
`

const Line = styled.div`
	margin: 30px 0px;
	width: 80%;
	height: 1px;
	background: #ADADAD;
`

const Informations = ({description}) => {
	return (
		<InformationsContainer>
			<InformationsText>Description</InformationsText>
			<Linkify>
				<Description>{description}</Description>
			</Linkify>
			<Line />
		</InformationsContainer>
	);
};

export default Informations;