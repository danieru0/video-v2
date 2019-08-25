import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

export default function withPlaylistAuth(ComponentToCheck) {
	class PlaylistHoc extends Component {
		constructor() {
			super();
			this.state = {
				status: null
			}
		}

		async componentDidMount() {
			try {
				const result = await axios({
					url: '/graphql',
					method: 'post',
					data: {
						query: `
							query {
								users(nick: "${this.props.match.params.user}", page: 1, limit: 1) {
									playlists(id: "${this.props.match.params.id}") {
										status
									}
								}
							}
						`
					}
				});
				if (result.data.data.users.length === 0) throw new Error('User empty');
				if (result.data.data.users[0].playlists.length === 0) throw new Error('Playlist empty');

				this.setState({
					status: result.data.data.users[0].playlists[0].status
				});
			} catch (err) {
				window.location.href = '/';
			}
		}

		render() {
			const { user, match } = this.props;
			if (user) {
				if (this.state.status !== null) {
					if (user.nick !== match.params.user) {
						if (this.state.status === 'private') {
							return <Redirect to="/" />
						} else {
							return <ComponentToCheck authenticated={false} {...this.props} />
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
						return <ComponentToCheck authenticated={false} {...this.props} />
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

	return connect(mapStateToProps, {})(PlaylistHoc);
}