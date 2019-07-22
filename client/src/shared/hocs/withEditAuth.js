import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default function withEditAuth(ComponentToCheck) {
	class EditHoc extends Component {
		constructor() {
			super();
			this.state = {
				author: null
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
								author {
									nick
								}
							}
						}
					`
				}
			});
			this.setState({
				author: result.data.data.videos[0].author.nick
			});
		}

		render() {
			if (this.state.author && this.props.user) {
				if (this.state.author === this.props.user.nick) {
					return <ComponentToCheck {...this.props}/>
				} else {
					return <Redirect to="/" />
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

	return connect(mapStateToProps, null)(EditHoc)
}