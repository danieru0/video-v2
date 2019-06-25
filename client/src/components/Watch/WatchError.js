import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
	width: 100%;
	height: 700px;
	background: #000;
	color: #fff;
	font-size: 40px;
	font-family: 'Lato';
	display: flex;
	align-items: center;
	padding-left: 40px;
	font-weight: bold;
	letter-spacing: -1px;
`

const WatchError = ({error}) => {
	return (
		<ErrorContainer>
			{error}
		</ErrorContainer>
	);
};

export default WatchError;