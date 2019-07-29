import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export default function withAdminAuth(ComponentToCheck) {
	class AdminHoc extends Component {
		constructor() {
			super();
			this.state = {
				admin: null
			}
		}

		async componentDidMount() {
			try {
				const result = await axios({
					url: '/graphql',
					method: 'post',
					headers: {
						'Authorization': localStorage.getItem('token')
					},
					data: {
						query: `
							query {
								me {
									isAdmin
								}
							}
						`
					}
				});
				if (result.data.errors) throw (result.data.errors[0].message);

				this.setState({
					admin: result.data.data.me.isAdmin
				});
			} catch (err) {
				throw err;
			}
		}

		render() {
			if (this.state.admin !== null) {
				if (this.state.admin) {
					return <ComponentToCheck {...this.props} />
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

	return connect(mapStateToProps, null)(AdminHoc);
}