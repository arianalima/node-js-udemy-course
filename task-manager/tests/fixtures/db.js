const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Mike",
  email: "mike@email.com",
  password: "abc1234",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "Ana",
  email: "ana@email.com",
  password: "abc12342",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First task",
  owner: userOne._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second task",
  owner: userOne._id,
  completed: true,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third task",
  owner: userTwo._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await User(userOne).save();
  await User(userTwo).save();
  await Task(taskOne).save();
  await Task(taskTwo).save();
  await Task(taskThree).save();
};

module.exports = { userOneId, userOne, userTwo, taskOne, setupDatabase };
