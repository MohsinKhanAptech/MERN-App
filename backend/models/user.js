import mongoose from 'mongoose';

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'roles',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const UserModel = mongoose.model('users', User);
export default UserModel;
