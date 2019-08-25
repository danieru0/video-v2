import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getHistory } from '../../actions/adminAction';
import { clearHistory } from '../../actions/clearAction';

import Modal from './Modal';
import NormalVideo from '../../shared/NormalVideo/NormalVideo';
import Loader from '../../shared/Loader/Loader';

const ModalWrapper = styled.div`
	width: 1000px;
	height: 90%;
	background: #fff;
	border-radius: 3px;
	box-shadow: 0px 0px 100px 0px rgba(0,0,0,0.2);
	display: flex;
	flex-direction: column;
`

const ModalVideoContainer = styled.div`
	width: 100%;
	height: 93%;
	display: flex;
	flex-wrap: wrap;
	overflow-y: scroll;
	padding-left: 20px;
	padding-right: 20px;
	position: relative;
`

const HistorySearchText = styled.p`
	font-size: 'Lato';
	width: 100%;
	font-size: 18px;
	background: #fff;
	border: 1px solid black;
	min-height: 50px;
	display: flex;
	align-items: center;
	word-break: break-all;
	padding: 0px 20px;
`

const ModalButtons = styled.div`
	flex: 1;
	width: 100%;
	border-top: 1px solid grey;
	display: flex;
	align-items: center;
`

const ModalClose = styled.button`
	background: none;
	border: none;
	font-size: 18px;
	font-family: 'Lato';
	text-transform: uppercase;
	outline: none;
	cursor: pointer;
`

const Label = styled.label`
	cursor: pointer;
	margin: 0px 10px;
`

const Radio = styled.input`
	cursor: pointer;
`

const StyledLoader = styled(Loader)`
	background: #000;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
`

class HistoryModal extends Component {
	state = {
		activeHistory: 'videos'
	}

	componentDidMount() {
		this.props.getHistory({ page: 1, limit: 1, id: this.props.userId });
	}

	componentWillUnmount() {
		this.props.clearHistory();
	}

	changeHistoryType = e => {
		this.setState({
			activeHistory: e.target.id
		});
	}

	render() {
		const { history } = this.props;
		return (
			<Modal onExit={this.props.onExit}>
				<ModalWrapper>
					<ModalVideoContainer>
						{
							history ? (
								this.state.activeHistory === 'videos' ? (
									history.videos.map((item, index) => {
										return <NormalVideo key={index} title={item.title} id={item._id} miniature={item.miniature} author={item.author.nick} createdAt={item.createdAt} views={item.views} length={item.length} />
									})
								) : (
									history.search.map((item, index) => {
										return <HistorySearchText key={index}>{item}</HistorySearchText>
									})
								)
							) : (
								<StyledLoader />
							)
						}
					</ModalVideoContainer>
					<ModalButtons>
						<ModalClose onClick={this.props.onExit}>Close</ModalClose>
						<Label>
							Videos:
							<Radio onClick={this.changeHistoryType} id="videos" type="radio" name="history-type" defaultChecked />
						</Label>
						<Label>
							Search:
							<Radio onClick={this.changeHistoryType} id="search" type="radio" name="history-type" />
						</Label>
					</ModalButtons>
				</ModalWrapper>
			</Modal>
		);
	}
}

const mapStateToProps = state => {
	return {
		history: state.adminReducer.history
	}
}

export default connect(mapStateToProps, { getHistory, clearHistory })(HistoryModal);