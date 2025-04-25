import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import UserModel from './models/user.js';
import RoleModel from './models/role.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(cors());

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
  let data = await UserModel.find({});
  res.status(200).json(data);
});
// users create
app.post('/users', async (req, res) => {
  try {
    const { name, contact, email, password } = req.body;
    const user = new UserModel({
      name,
      contact,
      email,
      password,
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
    const { name, contact, email, password } = req.body;
    let data = await UserModel.findByIdAndUpdate(
      id,
      { name, contact, email, password },
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

// server
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}.\nview at http://localhost:4000/`
  );
});
