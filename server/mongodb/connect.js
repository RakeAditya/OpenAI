import mongoose from 'mongoose';
const connectDb = (url) => {
	mongoose.set('strictQuery', true);
	mongoose
		.connect(url)
		.then(() => console.log('connected to database'))
		.catch((err) => {
			console.log('Error connecting to database');
			console.log(err);
		});
};
export default connectDb;
