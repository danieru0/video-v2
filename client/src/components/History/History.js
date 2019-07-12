import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getUserHistoryVideos, getUserHistorySearch, clearUserHistoryVideos, clearUserHistorySearch, cancelUsersRequest } from '../../actions/userAction';

const HistoryContainer = styled.div`
	width: calc(100% - 250px);
	min-height: calc(100vh - 80px);	
	margin-left: 250px;
	margin-top: 80px;
	font-family: 'Lato';
	position: relative;

	@media (max-width: 920px) {
		width: 100%;
		margin-left: 0px;
	}
`

const HistoryOptionsWrapper = styled.div`
	position: absolute;
	right: 0;
	width: 500px;
	background: #F1F1F1;
	height: 100%;
	display: flex;
	flex-direction: column;
	font-family: 'Lato';
	padding-left: 40px;
	padding-top: 40px;
`

const HistoryOptionsText = styled.p`
	margin: 0;
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 16px;
`

const HistoryOptionsLabel = styled.label`
	position: relative;
	cursor: pointer;
	width: 90%;
	height: 50px;
	display: flex;
	align-items: center;
	border-top: 1px solid #ddd;

	&:last-of-type {
		border-bottom: 1px solid #ddd;
	}
`

const HistoryOptionsCheckmark = styled.div`
	right: 0;
	top: 0;
	height: 20px;
	width: 20px;
	margin-left: auto;
	border: 2px solid #909090;
	border-radius: 50%;
	margin-top: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const HistoryOptionsRadio = styled.input`
	opacity: 0;
	position: absolute;
	height: 0;
	width: 0;

	&:checked ~ .checkmark {
		border: 2px solid #1FA37B;
	}

	&:checked ~ .checkmark::after {
		content: "";
		width: 10px;
		height: 10px;
		background: #1FA37B;
		display: block;
		border-radius: 50%;
	}
`

const HistoryVideosWrapper = styled.div`
	width: calc(100% - 500px);
	height: 100%;
`

class History extends Component {
	constructor() {
		super();
		this.state = {
			type: 'videos'
		}
	}

	componentDidMount() {
		this.props.getUserHistoryVideos();
	}

	handleTypeChange = type => {
		this.setState({
			type: type
		});
		this.props.cancelUsersRequest();
		if (type === 'videos') {
			this.props.clearUserHistorySearch();
			this.props.getUserHistoryVideos();
		} else if (type === 'search') {
			this.props.clearUserHistoryVideos();
			this.props.getUserHistorySearch();
		}
	}

	render() {
		return (
			<HistoryContainer>
				<HistoryOptionsWrapper>
					<HistoryOptionsText>History type</HistoryOptionsText>
					<HistoryOptionsLabel>
						Videos
						<HistoryOptionsRadio onClick={() => this.handleTypeChange('videos')} defaultChecked name="history-type" type="radio"/>
						<HistoryOptionsCheckmark className="checkmark"/>
					</HistoryOptionsLabel>
					<HistoryOptionsLabel>
						Search
						<HistoryOptionsRadio onClick={() => this.handleTypeChange('search')} name="history-type" type="radio"/>
						<HistoryOptionsCheckmark className="checkmark"/>
					</HistoryOptionsLabel>
				</HistoryOptionsWrapper>
				<HistoryVideosWrapper>
					
				</HistoryVideosWrapper>
			</HistoryContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		historyVideos: state.userReducer.historyVideos,
		historySearch: state.userReducer.historySearch
	}
}

export default connect(mapStateToProps, { getUserHistoryVideos, getUserHistorySearch, clearUserHistorySearch, clearUserHistoryVideos, cancelUsersRequest })(History);