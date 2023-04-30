import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './mongodb/connect.js';

// importing routing section of pages
import postroutes from './routes/postroutes.js';
import airoutes from './routes/airoutes.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
// api k end points ko in routes p connect kie h basically
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/post', postroutes);
app.use('/api/v1/ai', airoutes);

app.get('/', (req, res) => {
	res.send('hello  from ai');
});

// app.listen(8000, () => console.log('working at 8000'));
const callServer = async () => {
	try {
		// yaha p hmne mongodbUrl ko env m set kia h aur uspe atlas s hm apna database k cluster connect kie h
		connectDb(process.env.MONGODB_URL);
		app.listen(8000, () => console.log('Connected to server at http://localhost:8000'));
	} catch (error) {
		console.log(error);
	}
};
callServer();
