import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import graphqlHttp from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema/index';
import resolvers from './resolvers/index';

import isAuth from './middlewares/isAuth';

const app = express();
const connectedSchema = makeExecutableSchema({
	typeDefs,
	resolvers
})

app.use(bodyParser.json());
app.use(isAuth);

app.use('/graphql', graphqlHttp({
	schema: connectedSchema,
	graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@graphqltest-bohk2.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true, useCreateIndex: true })
	.then(() => {
		app.listen(process.env.PORT || 3000);
	}).catch(err => {
		throw err;
	})