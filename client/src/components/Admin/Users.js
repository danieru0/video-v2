import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';

import { getUsers, changeProfileInfo } from '../../actions/adminAction';

import Loader from '../../shared/Loader/Loader';

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

class Users extends Component {
	constructor() {
		super();
		this.state = {
			activeUser: null,
			activeUserId: null
		}
	}

	moreInfoRef = React.createRef();

	componentDidMount() {
		this.props.getUsers({ page: 1, limit: 20 });
	}

	showMore = e => {
		if (e.currentTarget.id === this.state.activeUser) {
			this.setState({
				activeUser: null
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
		this.props.changeProfileInfo({id: this.state.activeUserId, background: 'https://png.pngtree.com/thumb_back/fw800/back_pic/00/14/65/3256657136926fa.jpg'});
	}

	removeAvatar = () => {
		this.props.changeProfileInfo({id: this.state.activeUserId, avatar: 'https://ggrmlawfirm.com/wp-content/uploads/avatar-placeholder.png'});
	}

	removeDescription = () => {
		this.props.changeProfileInfo({id: this.state.activeUserId, description: ''});
	}

	render() {
		const { users, oneUser } = this.props;
		if (oneUser) {
			oneUser.profile.joined = new Date( Number(oneUser.profile.joined) );
			oneUser.profile.joined = DateTime.fromJSDate( oneUser.profile.joined );
		}
		return (
			<UsersContainer className="usersContainer">
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
														isAdmin: <MoreInfoRightCheckbox defaultChecked={oneUser.isAdmin} type="checkbox"/>
													</MoreInfoRightLabel>
													<MoreInfoRightLabel>
														canUpload: <MoreInfoRightCheckbox defaultChecked={oneUser.rules.canUpload} type="checkbox"/>
													</MoreInfoRightLabel>
													<MoreInfoRightLabel>
														canComment: <MoreInfoRightCheckbox defaultChecked={oneUser.rules.canComment} type="checkbox"/>
													</MoreInfoRightLabel>
													<MoreInfoRightLabel>
														canUseSettings: <MoreInfoRightCheckbox defaultChecked={oneUser.rules.canUseSettings} type="checkbox"/>
													</MoreInfoRightLabel>
													<MoreInfoRightLabel>
														canEditVideos: <MoreInfoRightCheckbox defaultChecked={oneUser.rules.canEditVideos} type="checkbox"/>
													</MoreInfoRightLabel>
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

export default connect(mapStateToProps, { getUsers, changeProfileInfo })(Users);