import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getUserHistoryVideos, getUserHistorySearch, clearUserHistoryVideos, clearUserHistorySearch, cancelUsersRequest } from '../../actions/userAction';

import NormalVideo from '../../shared/NormalVideo/NormalVideo';

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

	@media (max-width: 1450px) {
		width: 300px;
	}

	@media (max-width: 685px) {
		width: 200px;
	}

	@media (max-width: 600px) {
		top: 0px;
		width: 100%;
		height: 250px;
	}
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

const HistoryWrapper = styled.div`
	width: calc(100% - 500px);

	@media (max-width: 1450px) {
		width: calc(100% - 300px);
	}

	@media (max-width: 685px) {
		width: calc(100% - 200px);
	}

	@media (max-width: 600px) {
		width: 100%;
		margin-top: 250px;
	}
`

const HistoryVidoes = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	padding: 0px 30px;

	@media (max-width: 1246px) {
		justify-content: center;
	}
`

const HistorySearch = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 20px 50px;
`

const HistorySearchText = styled.p`
	margin: 10px 0px;
	font-size: 'Lato';
	font-size: 18px;
	background: #fff;
	min-height: 50px;
	display: flex;
	align-items: center;
	padding: 0px 20px;
	word-break: break-all;
`

class History extends Component {
	constructor() {
		super();
		this.state = {
			type: 'videos',
			skip: 0
		}
	}

	componentDidMount() {
		this.props.getUserHistoryVideos(0, 20);
		document.addEventListener('scroll', this.trackScrolling);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.historyVideos !== this.props.historyVideos || prevProps.historySearch !== this.props.historySearch) {
			document.addEventListener('scroll', this.trackScrolling);
		}
	}

	componentWillUnmount() {
		this.props.clearUserHistorySearch();
		this.props.clearUserHistoryVideos();
		document.removeEventListener('scroll', this.trackScrolling);
	}

	trackScrolling = () => {
		const historyWrapper = document.getElementById('history-wrapper');
		if (historyWrapper.getBoundingClientRect().bottom <= window.innerHeight) {
			document.removeEventListener('scroll', this.trackScrolling);
			this.setState({
				skip: this.state.skip + 20
			}, () => {
				if (this.state.type === 'videos') {
					this.props.getUserHistoryVideos(this.state.skip, 20, true)
				} else if (this.state.type === 'search') {
					this.props.getUserHistorySearch(this.state.skip, 20, true)
				}
			});
		}
	}

	handleTypeChange = type => {
		this.setState({
			type: type,
			skip: 0
		});
		this.props.cancelUsersRequest();
		if (type === 'videos') {
			this.props.clearUserHistorySearch();
			this.props.getUserHistoryVideos(0, 20);
			this.setState({
				skip: 0
			})
		} else if (type === 'search') {
			this.props.clearUserHistoryVideos();
			this.props.getUserHistorySearch(0, 20);
			this.setState({
				skip: 0
			})
		}
	}

	render() {
		const { historyVideos, historySearch } = this.props;
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
				<HistoryWrapper id="history-wrapper">
					{
						this.state.type === 'videos' && (
							<HistoryVidoes>
								{
									historyVideos && (
										historyVideos.map((item, index) => {
											return (
												<NormalVideo key={index} title={item.title} id={item._id} miniature={item.miniature} author={item.author.nick} createdAt={item.createdAt} views={item.views} length={item.length} />
											)
										})
									)
								}
							</HistoryVidoes>
						)
					}
					{
						this.state.type === 'search' && (
							<HistorySearch>
								{
									historySearch && (
										historySearch.map((item, index) => {
											return (
												<HistorySearchText key={index}>{item}</HistorySearchText>
											)
										})
									)
								}
							</HistorySearch>
						)
					}
				</HistoryWrapper>
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