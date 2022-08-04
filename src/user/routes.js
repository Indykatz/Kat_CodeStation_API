const { Router } = require("express");
const {
  signUp,
  login,
  getUsers,
  updateUser,
  deleteUser,
  removeUser,
} = require("./controllers");
const { hashPass, comparePass, tokenCheck } = require("../middleware");
const userRouter = Router();

userRouter.post("/user", hashPass, signUp); // works

userRouter.post("/login", comparePass, login);

userRouter.get("/user", tokenCheck, login);

userRouter.get("/users", getUsers); // works

userRouter.patch("/user", hashPass, updateUser); // works

userRouter.delete("/user", tokenCheck, deleteUser);

userRouter.delete("/users/:username", removeUser); // doesnt work

module.exports = userRouter;
