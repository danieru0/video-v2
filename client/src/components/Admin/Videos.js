import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';

import { getVideos, changeVideoInfo, removeVideo } from '../../actions/adminAction';
import { clearVideos } from '../../actions/clearAction';

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
	width: 100px;
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

const SearchWrapper = styled.div`

`

const Search = styled.input`
	height: 30px;
	font-size: 18px;
`

const SearchLabel = styled.label``;

const SearchRadio = styled.input``;

const SearchButton = styled.button``;

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
			activeVideoId: null,
			newTitle: null,
			newDescription: null,
			searchValue: '',
			searchType: 'name',
			page: 1
		}
	}

	moreInfoRef = React.createRef();

	componentDidMount() {
		this.props.getVideos({ page: 1, limit: 20 });
		document.addEventListener('scroll', this.trackScrolling);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.deleteVideoStatus !== this.props.deleteVideoStatus) {
			this.setState({
				activeVideo: null,
				activeVideoId: null
			});
			document.getElementById(this.state.activeVideoId).parentNode.removeChild(document.getElementById(this.state.activeVideoId));
		}
		if (prevProps.videos !== this.props.videos) {
			document.addEventListener('scroll', this.trackScrolling);
		}
	}

	componentWillUnmount() {
		document.removeEventListener('scroll', this.trackScrolling);
		this.props.clearVideos();
	}

	trackScrolling = () => {
		const videosWrapper = document.getElementById('videos-wrapper');
		if (videosWrapper.getBoundingClientRect().bottom <= window.innerHeight) {
			document.removeEventListener('scroll', this.trackScrolling);
			this.setState({
				page: this.state.page + 1
			}, () => {
				this.props.getVideos({ page: this.state.page, limit: 20 }, false, true);
			});
		}
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

	handleInfoInput = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	}

	saveInfo = () => {
		let query = {};
		query.id = this.state.activeVideoId;
		this.state.newTitle && (query.title = this.state.newTitle.length !== 0 ? this.state.newTitle : 'My awesome video');
		this.state.newDescription && (query.description = this.state.newDescription);
		this.props.changeVideoInfo(query);
	}

	removeMiniature = () => {
		if (window.confirm('Are you sure?')) {
			this.props.changeVideoInfo({
				id: this.state.activeVideoId,
				miniature: 'https://www.noborders-group.com/templates/newsletter/png/removed-occupations-australia-2017.jpg'
			});
		}
	}

	handleRemoveVideo = () => {
		if (window.confirm('Are you sure?')) {
			this.props.removeVideo(this.state.activeVideoId);
		}
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
			this.props.getVideos({ page: 1, limit: 20, title: this.state.searchValue });
		} else if (this.state.searchType === 'id') {
			this.props.getVideos({ page: 1, limit: 20, id: this.state.searchValue });
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
							<Th>Author</Th>
							<Th>Title</Th>
							<Th>Length</Th>
							<Th>Status</Th>
							<Th>Views</Th>
							<Th>Likes</Th>
						</Tr>
					</Thead>
					<Tbody id="videos-wrapper">
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
													<Button onClick={this.handleRemoveVideo}>Delete video</Button>
												</MoreInfoLeft>
												<MoreInfoMiddle>
													<MoreInfoMiddleLabel>
														Title:
														<MoreInfoMiddleTitle id="newTitle" onChange={this.handleInfoInput} defaultValue={oneVideo.title} placeholder="Title"/>
													</MoreInfoMiddleLabel>
													<MoreInfoMiddleLabel>
														Description:
														<MoreInfoMiddleDescription id="newDescription" onChange={this.handleInfoInput} defaultValue={oneVideo.description} placeholder="Description"/>
													</MoreInfoMiddleLabel>
													<Button onClick={this.saveInfo}>Save</Button>
												</MoreInfoMiddle>
												<MoreInfoRight>
													<Miniature alt="" src={oneVideo.miniature}/>
													<Button onClick={this.removeMiniature}>Remove</Button>
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
		oneVideo: state.adminReducer.oneVideo,
		deleteVideoStatus: state.adminReducer.deleteVideoStatus
	}
}

export default connect(mapStateToProps, { getVideos, changeVideoInfo, removeVideo, clearVideos })(Videos);