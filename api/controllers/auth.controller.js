import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hashSync(password, 12);
  const newUser = new User({ username, email, hashedPassword });
  try {
    await newUser.save();
    res.status(200).json('User created successful!');

  } catch (error) {
    next(error);
    // next(errorHandler(550, 'Error from function'));
  }
};