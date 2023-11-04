import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log('Error connecting to MongoDB', err.message);
});
  

const app = express();

app.use('/api/user', userRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
