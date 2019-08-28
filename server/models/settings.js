import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
	videoUpload: {
		type: Boolean,
		required: true,
		default: true
	},
	registerAccounts: {
		type: Boolean,
		required: true,
		default: true
	},
	uploadAvatar: {
		type: Boolean,
		required: true,
		default: true
	},
	uploadBackground: {
		type: Boolean,
		required: true,
		default: true
	},
});

module.exports = mongoose.model('Settings',settingsSchema, 'settings');