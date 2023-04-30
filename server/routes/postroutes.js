import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
// cloudinary k basically use hm kr rhe h ki jo image h uske lie ek url mil jae hmko taki database m hm sirf url daalte rhe hr baar
import post from '../mongodb/models/post.js';
dotenv.config();
const router = express.Router();
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SEC,
});
// get request
router.route('/').get(async (req, res) => {
	try {
		const posts = await post.find();
		console.log(posts);
		res.status(200).json({ success: true, data: posts });
	} catch (error) {
		res.status(500).json({ success: false, message: error });
	}
});
// post request
router.route('/').post(async (req, res) => {
	try {
		const { name, prompt, photo } = req.body;
		// console.log(photo);
		// console.log(name, prompt, photo);
		// jo mere paas post request s photo form ki body s aaya h usko ab cloudinary p daal k url lenge
		const photoUrl = await cloudinary.uploader.upload(photo);
		// ab ek naaya post banaenge
		// yaha p post s database m ek schema m value daal denge
		const newPost = await post.create({
			name,
			prompt,
			photo: photoUrl.url,
		});
		// yaha p mera jo newPost bana h wo
		const respose = await newPost.save();

		res.status(200).json({ success: true, data: newPost });
	} catch (error) {
		res.status(500).json({ success: false, message: 'Fetching post failed please try again' });
	}
});

export default router;
