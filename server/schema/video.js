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
		text: String!
		author: User!
	}

	type UpdatedViews {
		views: Int!
	}
	
	extend type Query {
		videos(
			page: Int!, 
			limit: Int!,
			author: ID,
			title: String,
			sort: String,
			id: ID
		): [Video]
	}

	extend type Mutation {
		createVideo(
			title: String!
			description: String!
			miniature: String!
			status: String!
			path: String!
		): Video
		increaseViews(id: ID!): UpdatedViews
		addComment(videoid: ID!, text: String!): UserWithComment
	}
`