export default `
	extend type Mutation {
		adminSetRules(id: ID, canUpload: Boolean, canComment: Boolean, canUseSettings: Boolean, canEditVideos: Boolean): Rule
		adminSetVideoInformation(id: ID!, title: String, description: String, miniature: String): Video
	}
`