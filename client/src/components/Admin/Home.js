import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const HomeContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

const Avatar = styled.img`
	width: 154px;
	height: 154px;
	border-radius: 50%;
	border: 1px solid grey;
`

const Message = styled.p`
	margin: 0;
	font-size: 30px;
	font-family: 'Lato';
	margin-top: 15px;
`

const Email = styled.p`
	margin: 0;
	font-size: 24px;
	font-family: 'Lato';
	margin-top: 10px;
	margin-bottom: 100px;
`

const Home = ({user}) => {
	return (
		<HomeContainer>
			{
				user && (
					<>
						<Avatar alt="" src={user.profile.avatar}/>
						<Message>{`Welcome, ${user.nick}!`}</Message>
						<Email>{user.email}</Email>
					</>
				)
			}
		</HomeContainer>
	);
};

const mapStateToProps = state => {
	return {
		user: state.userReducer.user
	}
}

export default connect(mapStateToProps, null)(Home);