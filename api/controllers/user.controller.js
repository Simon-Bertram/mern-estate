import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const test = (req, res) => {
  res.json({
    message: 'Hello user routes'});
};

// @desc    Update user
// @route   PUT /api/users/update/:id
// @access  Private
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only update your own account!'));
  }

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar,
      }
    }, { new: true })

    const {password, ...rest} = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can only delete your own account!'));
  }

  try {
    console.log(currentUser._id);
    const res = await fetch(`/localhost:3000/api/users/delete/${currentUser._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: req.params.id }),
    });
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }
};