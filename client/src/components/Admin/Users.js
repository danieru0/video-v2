import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getUsers } from '../../actions/adminAction';

const UsersContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`

const Table = styled.table`
	border-collapse: collapse;
`

const Thead = styled.thead`
	tr {
		background: #fff;
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
		&:hover {
			cursor: pointer;
			background: rgba(0,0,0,.075);
		}
	}
`

const Td = styled.td``

const MoreInfoContainer = styled.tr``;

const MoreInfoWrapper = styled.td`
	padding: 0 !important;
	height: ${({active}) => active ? '50px' : '0px'};
	transition: height .3s;
`

const MoreInfoContent = styled.div`
	width: 100%;
	height: 100%;
	background: #fff;
`

class Users extends Component {
	constructor() {
		super();
		this.state = {
			activeUser: null
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
				activeUser: e.currentTarget.id
			});
		}
	}

	render() {
		const { users } = this.props;
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
							<MoreInfoWrapper active={this.state.activeUser ? 1 : 0} colSpan="7" ref={this.moreInfoRef}>
								<MoreInfoContent></MoreInfoContent>
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
		users: state.adminReducer.users
	}
}

export default connect(mapStateToProps, { getUsers })(Users);