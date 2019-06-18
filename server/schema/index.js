import userSchema from './user';
import videoSchema from './video';
import playlistSchema from './playlist';
import adminSchema from './admin';

const linkSchema = `
	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}
`

export default [linkSchema, userSchema, videoSchema, playlistSchema, adminSchema];