import express, { Application } from 'express';
import api from './api';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

require('dotenv').config();
// DB config
mongoose.connect(process.env.MONGODB_URI || '', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB Connection error:'));
db.on('connected', console.error.bind(console, 'DB Connection success:'));

const port: any = process.env.PORT || 8000;
const app: Application = express();
// cors
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

app.use(morgan('dev'));
app.use('/api', api);

app.listen(port, () => {
	console.log(`> Server Started in port ${port}`);
});
