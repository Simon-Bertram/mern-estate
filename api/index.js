import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log('Error connecting to MongoDB', err.message);
});
  
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Error handling middleware  
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
