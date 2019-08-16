import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

export default function withVideoStatusAuth(ComponentToCheck) {
	class VideoPrivateHoc extends Component {
		constructor() {
			super();
			this.state = {
				status: null,
				authorId: null
			}
		}

		async componentDidMount() {
			const result = await axios({
				url: '/graphql',
				method: 'post',
				data: {
					query: `
						query {
							videos(page: 1, limit: 1, id: "${this.props.match.params.id}") {
								status
								author {
									_id
								}
							}
						}
					`
				}
			});
			this.setState({
				status: result.data.data.videos[0].status,
				authorId: result.data.data.videos[0].author._id
			});
		}

		render() {
			const { user } = this.props;
			if (user) {
				if (this.state.status !== null) {
					if (user._id !== this.state.authorId) {
						if (this.state.status === 'private') {
							return <Redirect to="/" />
						} else {
							return <ComponentToCheck {...this.props} />
						}
					} else {
						return <ComponentToCheck {...this.props} />
					}
				}
			} else {
				if (this.state.status !== null) {
					if (this.state.status === 'private') {
						return <Redirect to="/" />
					} else {
						return <ComponentToCheck {...this.props} />
					}
				}
			}
			return (null);
		}
	}
	
	const mapStateToProps = state => {
		return {
			user: state.userReducer.user
		}
	}

	return connect(mapStateToProps, null)(VideoPrivateHoc);
}