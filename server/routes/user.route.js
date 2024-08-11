import express from "express";
import {
  registerUser,
  activateUser,
  loginUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

// Create user route
userRouter.post("/register", registerUser);

//Activate user route
userRouter.post("/activate-user", activateUser);

//Login  user route
userRouter.post("/login", loginUser);

export default userRouter;
