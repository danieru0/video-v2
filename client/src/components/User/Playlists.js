import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PlaylistsContainer = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 20px 0px;
`

const Playlist = styled(Link)`
	width: 200px;
	height: 60px;
	background: #fff;
	text-decoration: none;
	color: #000;
	font-family: 'Lato';
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0px 10px;
`

const Name = styled.p`
	margin: 0;
	font-size: 18px;
`

const Playlists = ({playlists, user}) => {
	return (
		<PlaylistsContainer>
			{
				playlists.map((item, index) => {
					return (
						<Playlist key={index} to={`/${user}/playlist/${item.id}`}>
							<Name>{item.name}</Name>
						</Playlist>
					)
				})
			}
		</PlaylistsContainer>
	);
};

export default Playlists;