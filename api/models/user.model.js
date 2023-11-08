import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    trim: true
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 64,
    trim: true
  },
  avatar: {
    type: String,
    default: '../assets/blank-profile-picture.png',
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;