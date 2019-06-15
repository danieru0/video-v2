import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	nick: {
		type: String,
		required: true
	},
	rules: [{
		canUpload: {
			type: Boolean,
			required: true,
			default: true
		},
		canComment: {
			type: Boolean,
			required: true,
			default: true
		},
		canUseSettings: {
			type: Boolean,
			required: true,
			default: true
		},
		canEditVideos: {
			type: Boolean,
			required: true,
			default: true
		}
	}],
	profile: [{
		background: {
			type: String,
			required: true
		},
		avatar: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: false
		},
		joined: {
			type: Date,
			required: true,
			default: Date.now
		}
	}],
	history: [{
		videos: [{
			type: Schema.Types.ObjectId,
			ref: 'Videos',
			autopopulate: true
		}],
		search: [{
			type: String,
			required: false
		}]
	}],
	likedVideos: [{
		type: Schema.Types.ObjectId,
		ref: 'Videos',
		autopopulate: true
	}],
	playlists: [{
		status: String,
		name: String,
		videos: [{
			type: Schema.Types.ObjectId,
			ref: 'Videos',
			autopopulate: true
		}]
	}],
	uploadedVideos: [{
		type: Schema.Types.ObjectId,
		ref: 'Videos',
		autopopulate: true
	}]
})

userSchema.plugin( require('mongoose-autopopulate') );

module.exports = mongoose.model('User', userSchema);