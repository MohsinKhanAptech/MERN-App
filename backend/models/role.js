import mongoose from 'mongoose';

const Role = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});
const RoleModel = mongoose.model('Role', Role);
export default RoleModel;
