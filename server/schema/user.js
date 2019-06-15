export default `
	type User {
		_id: ID!
		email: String!
		nick: String!
		rules: [Rule!]!
	}

	type Rule {
		canUpload: Boolean!
		canComment: Boolean!
		canUseSettings: Boolean!
		canEditVideos: Boolean
	}

	extend type Mutation {
		createUser(email: String!, nick: String!, password: String!): User
	}
`