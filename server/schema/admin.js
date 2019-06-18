export default `
	extend type Mutation {
		adminSetRules(id: ID, canUpload: Boolean, canComment: Boolean, canUseSettings: Boolean, canEditVideos: Boolean): Rule
		adminSetVideoInfo(id: ID!, title: String, description: String, miniature: String): Video
		adminChangeProfileInfo(id: ID!, background: String, avatar: String, description: String, admin: Boolean): Profile
	}
`