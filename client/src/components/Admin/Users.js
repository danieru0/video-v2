import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';

import { getUsers, changeProfileInfo, changeRules } from '../../actions/adminAction';

import Loader from '../../shared/Loader/Loader';
import HistoryModal from '../../shared/Modal/HistoryModal';

const UsersContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`

const Table = styled.table`
	border-collapse: collapse;
	table-layout:fixed;
`

const Thead = styled.thead`
	tr {
		background: #FAFAFA;
	}

	th {
		padding: 12px 8px;
	}
`

const Tr = styled.tr`
	&:nth-of-type(even) {
		background: #fff;
	}
`

const Th = styled.th`
	text-align: left;
`

const Tbody = styled.tbody`
	td {
		padding: 12px 8px;
	}

	tr {
		border-bottom: 1px solid grey;
		&:hover {
			cursor: pointer;
			background: rgba(0,0,0,.075);
		}
	}
`

const Td = styled.td``

const MoreInfoContainer = styled.tr`
	border-bottom: none !important;
`;

const MoreInfoWrapper = styled.td`
	padding: 0 !important;
	overflow: hidden;
`

const MoreInfoContent = styled.div`
	height: ${({active}) => active ? '500px' : '0px'};
	width: 100%;
	transition: height .3s;
	background: #fff;
	display: flex;
`

const MoreInfoLeft = styled.div`
	width: 300px;
	height: 100%;
	border-right: 1px solid black;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	padding-right: 15px;
	padding-top: 10px;
	font-family: 'Lato';
`

const Avatar = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50%;
	border: 1px solid black;
`

const Nick = styled.p`
	margin: 0;
	font-size: 20px;
`

const MoreInfoLeftText = styled.p`
	margin: 0;
	font-size: 16px;
`

const MoreInfoLeftButton = styled.button`
	background: none;
	border: none;
	font-family: 'Lato';
	cursor: pointer;
	margin: 0;
	font-size: 16px;
	outline: none;
	padding: 0;
`

const MoreInfoMiddle = styled.div`
	flex: 1;
	height: 100%;
	display: flex;
	flex-direction: column;
`

const Background = styled.img`
	width: 100%;
	height: 150px;
`

const MiddleButton = styled.button`
	width: 70px;
	height: 30px;
	cursor: pointer;
	margin-bottom: 10px;
`;

const MiddleAvatar = styled.img`
	width: 84px;
	height: 84px;
	border-radius: 50%;
	border: 1px solid grey;
`

const MiddleTextArea = styled.textarea`
	resize: none;
	height: 150px;
`

const MoreInfoRight = styled.div`
	width: 600px;
	height: 100%;
	border-left: 1px solid black;
	display: flex;
	flex-direction: column;
	padding: 100px 30px;
`

const MoreInfoRightLabel = styled.label`
	height: 30px;
	display: flex;
	align-items: center;
	margin-top: 10px;
	margin-bottom: 10px;
`

const MoreInfoRightCheckbox = styled.input`
	margin: 0px;
	margin-top: 4px;
	margin-left: 15px;
`

const LoaderWrapper = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.4);
	display: flex;
	justify-content: center;
	align-items: center;
`

const SearchWrapper = styled.div`

`

const Search = styled.input`
	height: 30px;
	font-size: 18px;
`

const SearchLabel = styled.label``;

const SearchRadio = styled.input``;

const SearchButton = styled.button``;

class Users extends Component {
	constructor() {
		super();
		this.state = {
			activeUser: null,
			activeUserId: null,
			isAdmin: null,
			canUpload: null,
			canComment: null,
			canUseSettings: null,
			canEditVideos: null,
			ruleChanged: false,
			historyModal: false,
			searchValue: '',
			searchType: 'name'
		}
	}

	moreInfoRef = React.createRef();

	componentDidMount() {
		this.props.getUsers({ page: 1, limit: 20 });
	}

	showMore = e => {
		if (e.currentTarget.id === this.state.activeUser) {
			this.setState({
				activeUser: null,
				ruleChanged: false
			});
		} else {
			e.currentTarget.after(this.moreInfoRef.current);
			this.setState({
				activeUser: e.currentTarget.id,
				activeUserId: e.currentTarget.id
			});
			if (this.state.activeUserId !== e.currentTarget.id) {
				this.props.getUsers({ page: 1, limit: 1, id: e.currentTarget.id }, true);
			}
		}
	}

	removeBackground = () => {
		this.props.changeProfileInfo({id: this.state.activeUserId, background: '/backgrounds/default.jpg'});
	}

	removeAvatar = () => {
		this.props.changeProfileInfo({id: this.state.activeUserId, avatar: '/avatars/default.png'});
	}

	removeDescription = () => {
		this.props.changeProfileInfo({id: this.state.activeUserId, description: ''});
	}

	updateRules = e => {
		this.setState({
			[e.target.id]: e.target.checked,
			ruleChanged: true
		});
	}

	saveRules = () => {
		let query = {};
		query.id = this.state.activeUserId;
		this.state.canComment !== null && (query.canComment = this.state.canComment);
		this.state.canEditVideos !== null && (query.canEditVideos = this.state.canEditVideos);
		this.state.canUpload !== null && (query.canUpload = this.state.canUpload);
		this.state.canUseSettings !== null && (query.canUseSettings = this.state.canUseSettings);

		if (Object.keys(query).length > 1) {
			this.props.changeRules(query);
		}

		if (this.state.isAdmin !== null) {
			this.props.changeProfileInfo({ id: this.state.activeUserId, admin: this.state.isAdmin })
		}
	}

	hideModal = () => {
		this.setState({
			historyModal: false
		});
	}

	showModal = () => {
		this.setState({
			historyModal: true
		});
	}

	handleSearchInput = e => {
		this.setState({
			searchValue: e.target.value
		});
	}

	handleSearchRadio = e => {
		this.setState({
			searchType: e.target.id
		});
	}

	handleSearch = () => {
		if (this.state.searchType === 'name') {
			this.props.getUsers({ page: 1, limit: 20, nick: this.state.searchValue });
		} else if (this.state.searchType === 'id') {
			this.props.getUsers({ page: 1, limit: 20, id: this.state.searchValue });
		}
	}

	render() {
		const { users, oneUser } = this.props;
		if (oneUser) {
			oneUser.profile.joined = new Date( Number(oneUser.profile.joined) );
			oneUser.profile.joined = DateTime.fromJSDate( oneUser.profile.joined );
		}
		return (
			<UsersContainer className="usersContainer">
				{
					this.state.historyModal && <HistoryModal userId={this.state.activeUserId} onExit={this.hideModal}/>
				}
				<SearchWrapper>
					<Search onChange={this.handleSearchInput} placeholder="Search..."/>
					<SearchLabel>
						By ID:
						<SearchRadio onClick={this.handleSearchRadio} id="id" name="search-type" type="radio"/>
					</SearchLabel>
					<SearchLabel>
						By Name:
						<SearchRadio id="name" onClick={this.handleSearchRadio} defaultChecked name="search-type" type="radio" />
					</SearchLabel>
					<SearchButton onClick={this.handleSearch}>Search</SearchButton>
				</SearchWrapper>
				<Table>
					<Thead>
						<Tr>
							<Th>Nick</Th>
							<Th>Email</Th>
							<Th>Admin</Th>
							<Th>CanUpload</Th>
							<Th>CanComment</Th>
							<Th>CanUseSettings</Th>
							<Th>CanEditVideos</Th>
						</Tr>
					</Thead>
					<Tbody>
						<MoreInfoContainer>
							<MoreInfoWrapper colSpan="7" ref={this.moreInfoRef}>
								<MoreInfoContent active={this.state.activeUser ? 1 : 0}>
									{
										oneUser ? (
											<>
												<MoreInfoLeft>
													<Avatar alt="" src={oneUser.profile.avatar}/>
													<Nick>{oneUser.nick}</Nick>
													<MoreInfoLeftText>{oneUser.email}</MoreInfoLeftText>
													<MoreInfoLeftText>{oneUser.profile.joined.toString().split('T')[0]}</MoreInfoLeftText>
													<MoreInfoLeftText>{oneUser._id}</MoreInfoLeftText>
													<MoreInfoLeftButton onClick={this.showModal}>history</MoreInfoLeftButton>
												</MoreInfoLeft>
												<MoreInfoMiddle>
													<Background alt="" src={oneUser.profile.background}/>
													<MiddleButton onClick={this.removeBackground}>Remove</MiddleButton>
													<MiddleAvatar alt="" src={oneUser.profile.avatar}/>
													<MiddleButton onClick={this.removeAvatar}>Remove</MiddleButton>
													<MiddleTextArea value={oneUser.profile.description} disabled></MiddleTextArea>
													<MiddleButton onClick={this.removeDescription}>Remove</MiddleButton>
												</MoreInfoMiddle>
												<MoreInfoRight>
													<MoreInfoRightLabel>
														isAdmin: <MoreInfoRightCheckbox onClick={this.updateRules} id="isAdmin" defaultChecked={oneUser.isAdmin} type="checkbox"/>
													</MoreInfoRightLabel>
													<MoreInfoRightLabel>
														canUpload: <MoreInfoRightCheckbox onClick={this.updateRules} id="canUpload" defaultChecked={oneUser.rules.canUpload} type="checkbox"/>
													</MoreInfoRightLabel>
													<MoreInfoRightLabel>
														canComment: <MoreInfoRightCheckbox onClick={this.updateRules} id="canComment" defaultChecked={oneUser.rules.canComment} type="checkbox"/>
													</MoreInfoRightLabel>
													<MoreInfoRightLabel>
														canUseSettings: <MoreInfoRightCheckbox onClick={this.updateRules} id="canUseSettings" defaultChecked={oneUser.rules.canUseSettings} type="checkbox"/>
													</MoreInfoRightLabel>
													<MoreInfoRightLabel>
														canEditVideos: <MoreInfoRightCheckbox onClick={this.updateRules} id="canEditVideos" defaultChecked={oneUser.rules.canEditVideos} type="checkbox"/>
													</MoreInfoRightLabel>
													{
														this.state.ruleChanged && <MiddleButton onClick={this.saveRules}>save</MiddleButton>
													}
												</MoreInfoRight>
											</>
										) : (
											<LoaderWrapper>
												<Loader />
											</LoaderWrapper>
										)
									}
								</MoreInfoContent>
							</MoreInfoWrapper>
						</MoreInfoContainer>
						{
							users && (
								users.map((item, key) => {
									return (
										<Tr id={item._id} key={key} onClick={this.showMore}>
											<Td>{item.nick}</Td>
											<Td>{item.email}</Td>
											<Td>{item.isAdmin.toString()}</Td>
											<Td>{item.rules.canUpload.toString()}</Td>
											<Td>{item.rules.canComment.toString()}</Td>
											<Td>{item.rules.canUseSettings.toString()}</Td>
											<Td>{item.rules.canEditVideos.toString()}</Td>
										</Tr>
									)
								})
							)
						}
					</Tbody>
				</Table>
			</UsersContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		users: state.adminReducer.users,
		oneUser: state.adminReducer.oneUser
	}
}

export default connect(mapStateToProps, { getUsers, changeProfileInfo, changeRules })(Users);