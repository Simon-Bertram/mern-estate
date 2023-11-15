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
      samesite: 'lax',
    }
    res
      .cookie('access_token', token, cookieOptions)
      .json('Login successful!');

  } catch (error) {
    next(error);
  }
};

// @desc    Google login
// @route   POST /api/auth/google
// @access  Public
export const googleLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // Generate a JSON Web Token (JWT) for the user
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
      // Remove the password from the user object
      const {password: pass, ...rest} = user._doc;
      // Set a cookie in the user's browser with the JWT and return the user object
      res
        .cookie('access_token', token, {httpOnly: true})
        .status(200)
        .json(rest);
    } else {
      // If the user doesn't exist, generate a random password for the user (because the password is a required field in the User model)
      const generatedPassword = 
        Math.random().toString(36).slice(-8) + 
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 12);

      const username = req.body.name
        .split(' ')
        .join('')
        .toLowerCase() + '#' + Math.random().toString(36).slice(-6);
        console.log(username);

      // Create a new user with the generated (hashed) password 
      const newUser = new User({
        username,
        email: req.body.email,
        hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();

      // Set a cookie in the user's browser with the JWT and return the user object
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      // Remove the password from the user object
      const {password: pass, ...rest} = user._doc;
      res
        .cookie('access_token', token, {httpOnly: true})
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error)
  }
};
