export default `
	type User {
		_id: ID!
		email: String!
		nick: String!
		rules: Rule!
		profile: Profile!
		uploadedVideos: [Video]
		playlists(id: ID): [Playlist]
	}

	type Rule {
		canUpload: Boolean!
		canComment: Boolean!
		canUseSettings: Boolean!
		canEditVideos: Boolean
	}

	type Profile {
		background: String!
		avatar: String!
		description: String!
		joined: String!
	}

	type AuthenticationData {
		token: String!
		user: User!
	}

	type Result {
		result: Boolean!
	}

	extend type Query {
		users(
			nick: String
			page: Int!
			limit: Int!
			id: ID
		): [User]
		me: User
	}

	extend type Mutation {
		createUser(email: String!, nick: String!, password: String!): User
		loginUser(email: String!, password: String!): AuthenticationData
		changeProfileInfo(background: String, avatar: String, description: String): Profile
		setRules(id: ID, canUpload: Boolean, canComment: Boolean, canUseSettings: Boolean, canEditVideos: Boolean): Rule
		toggleLikeVideo(id: ID!, boolean: Boolean!): Result
	}
`