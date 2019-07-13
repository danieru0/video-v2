export default `
	type Playlist {
		status: String!
		name: String!
		id: ID!
		videos: [Video]
	}

	extend type Mutation {
		createPlaylist(name: String!, status: String!): [Playlist]
		removePlaylist(id: ID!): [Playlist]
		addVideoToPlaylist(playlistid: ID!, videoid: ID!): [Playlist]
		removeVideoFromPlaylist(playlistid: ID!, videoid: ID!): [Playlist]
		changePlaylistStatus(playlistid: ID!, status: String!): [Playlist]
	}
`