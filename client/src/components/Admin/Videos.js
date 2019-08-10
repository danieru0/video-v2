import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';

import { getVideos } from '../../actions/adminAction';

import Loader from '../../shared/Loader/Loader';

const VideosContainer = styled.div`
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

class Videos extends Component {
	constructor() {
		super();
		this.state = {
			activeVideo: null,
			activeVideoId: null
		}
	}

	moreInfoRef = React.createRef();

	componentDidMount() {
		this.props.getVideos({ page: 1, limit: 20 });
	}

	showMore = e => {
		if (e.currentTarget.id === this.state.activeVideo) {
			this.setState({
				activeVideo: null
			});
		} else {
			e.currentTarget.after(this.moreInfoRef.current);
			this.setState({
				activeVideo: e.currentTarget.id,
				activeVideoId: e.currentTarget.id
			});
		}
		if (this.state.activeVideoId !== e.currentTarget.id) {
			
		}
	}

	render() {
		const { videos, oneVideo } = this.props;
		if (oneVideo) {
			oneVideo.profile.joined = new Date( Number(oneVideo.profile.joined) );
			oneVideo.profile.joined = DateTime.fromJSDate( oneVideo.profile.joined );
		}
		return (
			<VideosContainer>
				<Table>
					<Thead>
						<Tr>
							<Th>Author</Th>
							<Th>Title</Th>
							<Th>Length</Th>
							<Th>Status</Th>
							<Th>Views</Th>
							<Th>Likes</Th>
						</Tr>
					</Thead>
					<Tbody>
						<MoreInfoContainer>
							<MoreInfoWrapper colSpan="6" ref={this.moreInfoRef}>
								<MoreInfoContent active={this.state.activeVideo ? 1 : 0}>
										loweflweofl
								</MoreInfoContent>
							</MoreInfoWrapper>
						</MoreInfoContainer>
						{
							videos && (
								videos.map((item, key) => {
									return (
										<Tr id={item._id} key={key} onClick={this.showMore}>
											<Td>{item.author.nick}</Td>
											<Td>{item.title}</Td>
											<Td>{item.length}</Td>
											<Td>{item.status}</Td>
											<Td>{item.views}</Td>
											<Td>{item.likes}</Td>
										</Tr>
									)
								})
							)
						}
					</Tbody>
				</Table>
			</VideosContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		videos: state.adminReducer.videos,
		oneVideo: state.adminReducer.oneVideo
	}
}

export default connect(mapStateToProps, { getVideos })(Videos);