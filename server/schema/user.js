export default `
	type User {
		_id: ID!
		email: String!
		nick: String!
		rules: {
			canUpload: Boolean!
			canComment: Boolean!
			canUseSettings: Boolean!
			canEditVideos: Boolean!
		}
		profile: {
			background: String!
			avatar: String!
			description: String!
			joined: String!
		}
	}
`