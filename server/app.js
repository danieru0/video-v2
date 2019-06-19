import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import multer from 'multer';
import graphqlHttp from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema/index';
import resolvers from './resolvers/index';

import isAuth from './middlewares/isAuth';

const videoStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './videos');
	},
	filename: (req, file, cb) => {
		cb(null, mongoose.Types.ObjectId() + '.mp4');
	}
});
const avatarStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './avatars');
	},
	filename: (req, file, cb) => {
		cb(null, req.userId + '.jpg');
	}
});
const miniatureStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './miniatures');
	},
	filename: (req, file, cb) => {
		cb(null, mongoose.Types.ObjectId() + '.jpg');
	}
});

const videoUpload = multer({ storage: videoStorage });
const avatarUpload = multer({ storage: avatarStorage });
const miniatureUpload = multer({ storage: miniatureStorage });

const app = express();
const connectedSchema = makeExecutableSchema({
	typeDefs,
	resolvers
})

app.use('/avatars', express.static(__dirname + '/avatars'));
app.use('/miniatures', express.static(__dirname + '/miniatures'));

app.use(bodyParser.json());
app.use(isAuth);

require('./routes/file')(app, videoUpload, avatarUpload, miniatureUpload);

app.use('/graphql', graphqlHttp({
	schema: connectedSchema,
	graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@graphqltest-bohk2.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false })
	.then(() => {
		app.listen(process.env.PORT || 8080);
	}).catch(err => {
		throw err;
	})