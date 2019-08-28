export default `
	type Settings {
		videoUpload: Boolean
		registerAccounts: Boolean
		uploadAvatar: Boolean
		uploadBackground: Boolean
	}

	extend type Query {
		getSettings: Settings
	}

	extend type Mutation {
		changeSettings(videoUpload: Boolean, registerAccounts: Boolean, uploadAvatar: Boolean, uploadBackground: Boolean): Settings
	}
`