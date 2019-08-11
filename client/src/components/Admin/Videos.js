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

const MoreInfoLeft = styled.div`
	width: 400px;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	padding-right: 15px;
	padding-top: 10px;
	font-family: 'Lato';
	border-right: 1px solid black;
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
	align-items: center;
`

const MoreInfoMiddleLabel = styled.label`
	display: flex;
	width: 80%;
	flex-direction: column;
	font-family: 'Lato';
	margin-bottom: 20px;
`

const MoreInfoMiddleTitle = styled.input`
	width: 100%;
	height: 50px;
	font-size: 17px;
	font-family: 'Lato';
`

const MoreInfoMiddleDescription = styled.textarea`
	width: 100%;
	height: 300px;
	font-family: 'Lato';
	font-size: 17px;
	resize: none;
`

const Button = styled.button`
	width: 70px;
	height: 30px;
	cursor: pointer;
	margin-bottom: 10px;
`;

const MoreInfoRight = styled.div`
	width: 600px;
	height: 100%;
	border-left: 1px solid black;
	display: flex;
	flex-direction: column;
`

const Miniature = styled.img`
	width: 400px;
	border: 1px solid black;
`

const LoaderWrapper = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.4);
	display: flex;
	justify-content: center;
	align-items: center;
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
			this.props.getVideos({ page: 1, limit: 1, id: e.currentTarget.id }, true);
		}
	}

	render() {
		const { videos, oneVideo } = this.props;
		if (oneVideo) {
			oneVideo.createdAt = new Date( Number(oneVideo.createdAt) );
			oneVideo.createdAt = DateTime.fromJSDate( oneVideo.createdAt );
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
									{
										oneVideo ? (
											<>
												<MoreInfoLeft>
													<Avatar alt="" src={oneVideo.author.profile.avatar}/>
													<Nick>{oneVideo.author.nick}</Nick>
													<MoreInfoLeftText>{`Created at: ${oneVideo.createdAt.toString().split('T')[0]}`}</MoreInfoLeftText>
													<MoreInfoLeftText>{`Video ID: ${oneVideo._id}`}</MoreInfoLeftText>
													<MoreInfoLeftText>{`User ID: ${oneVideo.author._id}`}</MoreInfoLeftText>
												</MoreInfoLeft>
												<MoreInfoMiddle>
													<MoreInfoMiddleLabel>
														Title:
														<MoreInfoMiddleTitle defaultValue={oneVideo.title} placeholder="Title"/>
													</MoreInfoMiddleLabel>
													<MoreInfoMiddleLabel>
														Description:
														<MoreInfoMiddleDescription defaultValue={oneVideo.description} placeholder="Description"/>
													</MoreInfoMiddleLabel>
													<Button>Save</Button>
												</MoreInfoMiddle>
												<MoreInfoRight>
													<Miniature alt="" src={oneVideo.miniature}/>
													<Button>Save</Button>
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