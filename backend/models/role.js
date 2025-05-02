import mongoose from 'mongoose';

const Role = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
});
const RoleModel = mongoose.model('roles', Role);
export default RoleModel;
