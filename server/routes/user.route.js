import express from "express";
import {
  registerUser,
  activateUser,
  loginUser,
  resendActivationCode,
  socialAuth,
  logoutUser,
} from "../controllers/user.controller.js";

import { isAuthenticated } from "../middlewares/protected.js";

const userRouter = express.Router();

// Create user route
userRouter.post("/register", registerUser);

//Activate user route
userRouter.post("/activate-user", activateUser);

//Login  user route
userRouter.post("/login", loginUser);

//Resend Activation code
userRouter.post("/resend-activation-code", resendActivationCode);

//Oauth routes
userRouter.post("/social-auth", socialAuth);

//Logout user route
userRouter.get("/logout", isAuthenticated, logoutUser);

export default userRouter;
