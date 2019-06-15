import userSchema from './user';
import videoSchema from './video';

const linkSchema = `
	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}
`

export default [linkSchema, userSchema, videoSchema];