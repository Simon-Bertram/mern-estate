import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

// @desc    Signup user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);
  const newUser = new User({ username, email, hashedPassword });
  try {
    await newUser.save();
    res.status(200).json('User created successful!');

  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(401, 'Invalid email or password'));
    }
    const validPassword = bcrypt.compareSync(password, validUser.hashedPassword);
    if (!validPassword) {
      return next(errorHandler(401, 'Invalid email or password'));
    }
    const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
    const cookieOptions = {
      expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    }
    res
      .cookie('access_token', token, cookieOptions)
      .json('Login successful!');

  } catch (error) {
    next(error);
  }
};
