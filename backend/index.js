import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cors from 'cors';

import UserModel from './models/user.js';
import RoleModel from './models/role.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'MERN App' }));
app.use(cors());
dotenv.config();

async function main() {
  await mongoose.connect(
    `${process.env.MONGODB_URI}/${process.env.MONGODB_DB}`,
    {
      useNewUrlParser: true,
    }
  );
}
main().catch(console.error);

// API routes

// default route
app.get('/', async (req, res) => {
  res.send('Hello World!');
});
// users fetch
app.get('/users', async (req, res) => {
  let data = await UserModel.find().populate('role', 'name');
  res.status(200).json(data);
});
// users create
app.post('/users', async (req, res) => {
  try {
    const { name, contact, email, password, role } = req.body;
    if (!name || !contact || !email || !password || !role) {
      return res.status(400).send('All fields are required');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      contact,
      email,
      password: passwordHash,
      role,
    });
    let data = await user.save();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Something Went Wrong: ${error}`);
  }
});
// users update
app.post('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact, email, password, role } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    let data = await UserModel.findByIdAndUpdate(
      id,
      { name, contact, email, password: passwordHash, role },
      { new: true }
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Something Went Wrong: ${error}`);
  }
});
// users delete
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let data = await UserModel.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Something Went Wrong: ${error}`);
  }
});

// roles fetch
app.get('/roles', async (req, res) => {
  let data = await RoleModel.find({});
  res.status(200).json(data);
});
// roles create
app.post('/roles', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send('Role name is required');
    }
    const roleName = name.trim().toLowerCase();
    const existingRole = await RoleModel.findOne({ name: roleName });
    if (existingRole) {
      return res.status(400).send('Role already exists');
    }
    const role = new RoleModel({
      name: roleName,
    });
    let data = await role.save();
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Something Went Wrong: ${error}`);
  }
});
// roles update
app.post('/roles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).send('Role name is required');
    }
    const roleName = name.trim().toLowerCase();
    const existingRole = await RoleModel.findOne({ name: roleName });
    if (existingRole) {
      return res.status(400).send('Role already exists');
    }
    let data = await RoleModel.findByIdAndUpdate(
      id,
      { name: roleName },
      { new: true }
    );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Something Went Wrong: ${error}`);
  }
});
// roles delete
app.delete('/roles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let data = await RoleModel.findByIdAndDelete(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Something Went Wrong: ${error}`);
  }
});

// login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }

    req.session.user = user;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Something Went Wrong: ${error}`);
  }
});

// server
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}.\nview at http://localhost:4000/`
  );
});
