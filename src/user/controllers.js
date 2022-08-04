const jwt = require("jsonwebtoken");
const User = require("./model");

// C - create
exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET);
    res.send({ user: newUser, token });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    if (!req.user) {
      throw new Error("Incorrect credentials");
    } else {
      const token = jwt.sign({ id: req.user._id }, process.env.SECRET);
      res.send({ user: req.user, token });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// R - Read Get All - need read 1
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(req.body);
    res.send({ user: users });
  } catch (error) {
    console.log(error);
  }
};

// U - update user
exports.updateUser = async (req, res) => {
  try {
    const result = await User.updateOne(
      req.body.filterObj,
      req.body.updateObj
    ); 
    if (result.modifiedCount > 0) {
      res.status(200).send({ msg: "Successfully Updated" });
    } else {
      throw new Error({ msg: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// D - Delete a User - why do i have two?
exports.removeUser = async (req, res) => {
  try {
    const removeUser = await User.deleteOne({ username: req.params.username });
    res.send({ user: removeUser });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.user._id });
    if (result.deletedCount > 0) {
      res.send({ msg: "Successfully Deleted" });
    } else {
      throw new Error({ msg: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
