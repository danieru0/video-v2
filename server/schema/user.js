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
		setRules(id: ID, canUpload: Boolean, canComment: Boolean, canUseSettings: Boolean, canEditVideos: Boolean): Rule
	}
`