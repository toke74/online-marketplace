//import packages
import jwt from "jsonwebtoken";

//import local file
import "dotenv/config";

//Options for cookies for 5 Minutes
export const accessTokenOptions = {
  expires: new Date(Date.now() + 5 * 60 * 1000), //5min
  maxAge: 5 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

//Options for cookies for 30 days
export const refreshTokenOptions = {
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const sendRefreshAndAccessToken = async (user, statusCode, res) => {
  try {
    // const accessToken = user.generateAccessToken();
    // const refreshToken = user.generateRefreshToken();

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "5m",
    });

    const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
      expiresIn: "30d",
    });

    //Only set secure to true in production for access token
    if (process.env.NODE_ENV === "production") {
      accessTokenOptions.secure = true;
    }

    //send cookie
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(statusCode).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    console.log(error);
  }
};
