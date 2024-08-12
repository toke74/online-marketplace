import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import ErrorHandler from "../utils/errorHandler.js";
import { asyncErrorHandler } from "../middlewares/catchAsyncerrors.js";
import { createActivationToken } from "../utils/activationCode.js";
import sendEmail from "../utils/sendMail.js";
import { sendRefreshAndAccessToken } from "../utils/sendRefreshAndAccessToken.js";

// @desc    Register user
// @route   POST /api/v1/user/register
// @access  Public
export const registerUser = asyncErrorHandler(async (req, res, next) => {
  //get user email, password and name from req.body
  const { name, email, password } = req.body;

  //check if the use exist in database
  const isUserExist = await User.findOne({ email });

  //if it exist throw error back to user
  if (isUserExist) {
    return next(new ErrorHandler(`User already exists, Please Login`, 400));
  }

  //if not exist save the user to database
  const user = await User.create({
    name,
    email,
    password,
    provider: "local",
  });

  //After user created  in DB,  send activation code to user email
  const activationToken = createActivationToken(user._id);
  const activationCode = activationToken.ActivationCode;
  const message = activationCode;
  const ejsUrl = `welcome.ejs`;

  //send activation code to user email
  try {
    await sendEmail({
      email: user.email,
      subject: "Activate your account",
      message,
      name,
      ejsUrl,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email ${user.email} to activate your account!`,
      activationToken: activationToken.token,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// @desc    Activate user
// @route   POST /api/v1/user/activate-user
// @access  Public
export const activateUser = asyncErrorHandler(async (req, res, next) => {
  //Get activation token and activation code from req.body
  const { activation_token, activation_code } = req.body;

  //verify activation toke
  const decoded = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

  // if activation token is valid, then verify activation code. if not valid, throw error
  if (activation_code !== decoded.ActivationCode) {
    return next(new ErrorHandler("Invalid activation code", 400));
  }

  //if activation code is valid, find user
  const isUserExist = await User.findOne({ _id: decoded.id });

  // if user not exist, throw the error
  if (!isUserExist) {
    return next(new ErrorHandler("User not exist ", 400));
  }

  //if user exist and isVerified field is true, throw the error ask user to login
  if (isUserExist.isVerified) {
    return next(new ErrorHandler("Your email is verified, Please login ", 400));
  }

  // if user not  exist and  isVerified field is false, update the user as verified
  const user = await User.findOneAndUpdate(
    { _id: decoded.id },
    { isVerified: true }
  );

  // Then send success message to client
  res.status(201).json({
    success: true,
  });
});

// @desc    Login user
// @route   POST /api/v1/user/login
// @access  Public
export const loginUser = asyncErrorHandler(async (req, res, next) => {
  //Get email and password from user
  const { email, password } = req.body;

  //check email and password empty or not
  if (!email || !password) {
    return next(new ErrorHandler("Please provide an email and password", 400));
  }

  // find  user in DB
  const user = await User.findOne({ email }).select("+password");

  // if user not exist in DB throw error
  if (!user) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  //if user tries to login by their Google service provider account, throw error
  if (user.provider === "google") {
    return next(
      new ErrorHandler(
        "Please login with your Google service provider account",
        400
      )
    );
  }
  //if user tries to login by their Github service provider account, throw error
  if (user.provider === "github") {
    return next(
      new ErrorHandler(
        "Please login with your  Github service provider account",
        400
      )
    );
  }

  //if user exist  in DB, Check if the user  verified their email
  if (!user.isVerified) {
    //If user not verified their email address,  Send activation code to the user
    const activationToken = createActivationToken(user._id);

    const activationCode = activationToken.ActivationCode;

    const name = user.name;

    const message = activationCode;
    const ejsUrl = `welcome.ejs`;

    try {
      //send activation code to user email
      await sendEmail({
        email: user.email,
        subject: "Activate your account",
        message,
        name,
        ejsUrl,
      });

      res.status(200).json({
        success: false,
        message: `Please check your email ${user.email} to activate your account!`,
        activationToken: activationToken.token,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }

  //if verified their email, Check  password matches
  const isMatch = await user.comparePassword(password);

  // if not match, throw error
  if (!isMatch) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }

  //import methods to generate access Token and refresh token
  sendRefreshAndAccessToken(user, 200, res);
});

// @desc    Resend Activation code
// @route   POST /api/v1/user/resend-activation-code
// @access  Public
export const resendActivationCode = asyncErrorHandler(
  async (req, res, next) => {
    //Get user email from client by req.body
    const { email } = req.body;

    //find user in db by its email
    const user = await User.findOne({ email });

    // if user not exist, throw the error
    if (!user) {
      return next(new ErrorHandler("User not exist ", 400));
    }

    //if user exist and isVerified field is true, throw the error ask user to login
    if (user.isVerified) {
      return next(
        new ErrorHandler("Your email is verified, Please login ", 400)
      );
    }

    // if user   exist and  isVerified field is false, Send activation code to the user
    const activationToken = createActivationToken(user._id);

    const activationCode = activationToken.ActivationCode;

    const name = user.name;

    const message = activationCode;
    const ejsUrl = `welcome.ejs`;

    try {
      //send activation code to user email
      await sendEmail({
        email: user.email,
        subject: "Activate your account",
        message,
        name,
        ejsUrl,
      });

      //finally send success message to client
      res.status(200).json({
        success: false,
        message: `Please check your email ${user.email} to activate your account!`,
        activationToken: activationToken.token,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// @desc Social Auth
// @route POST /api/v1/user/social-auth
// @access Public
export const socialAuth = asyncErrorHandler(async (req, res, next) => {
  //Get user info from client which we get it from social auth provider
  const { email, name, photo, provider } = req.body;

  //Find if user exist by its email
  const user = await User.findOne({ email });

  //If user not exist, generate password and save user in db
  if (!user) {
    const generatePassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const newUser = await User.create({
      email,
      name,
      password: generatePassword,
      avatar: photo,
      isVerified: true,
      provider,
    });

    // After saving user in db, generate access and refresh token and send it to client
    sendRefreshAndAccessToken(newUser, 200, res);
  } else {
    //If user exist in db, check if user register with local login with that email, if it is throw error
    if (user.provider === "local") {
      return next(
        new ErrorHandler(
          "you have account with us, please login with your email and password",
          400
        )
      );
    } else {
      //if user exist in db and register with social auth, login the user by generate access and refresh token and send it to client
      sendRefreshAndAccessToken(user, 200, res);
    }
  }
});

// @desc    Logout user
// @route   GET /api/v1/user/logout
// @access  Public
export const logoutUser = asyncErrorHandler(async (req, res, next) => {
  //Clear the cookie
  res.cookie("access_token", "", { maxAge: 1 });
  res.cookie("refresh_token", " ", { maxAge: 1 });

  //Send success message to client
  res.status(200).json({
    success: true,
    accessToken: "",
    message: "Logged out successfully",
  });
});
