export default `
	type Video {
		_id: ID
		title: String!
		description: String!
		views: Int!
		likes: Int!
		dislikes: Int!
		miniature: String!
		status: String!
		author: User!
		comments: [UserWithComment!]!
		createdAt: String!
		path: String!
	}
	
	type UserWithComment {
		_id: ID!
		email: String!
		nick: String!
		rules: Rule!
		profile: Profile!
		text: String!
	}

	extend type Mutation {
		createVideo(
			title: String!
			description: String!
			miniature: String!
			status: String!
			path: String!
		): Video
	}
`