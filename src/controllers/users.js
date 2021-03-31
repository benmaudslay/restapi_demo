const { User } = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send(error);
  }
};

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const returnedValue = await user.save();
    res.status(201).send(`Successfully added ${returnedValue.name}`);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: "user not found" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: "user not found" });
  }
};

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
