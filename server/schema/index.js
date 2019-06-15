import testSchema from './test';

const linkSchema = `
	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}
`

export default [linkSchema, testSchema];