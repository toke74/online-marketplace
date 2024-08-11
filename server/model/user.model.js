import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      validate: {
        validator: function (value) {
          return emailRegexPattern.test(value);
        },
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [4, "Password should be greater than 4 characters"],
      select: false,
    },
    phoneNumber: {
      type: Number,
    },
    addresses: [
      {
        country: {
          type: String,
        },
        city: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        zipCode: {
          type: Number,
        },
        addressType: {
          type: String,
        },
      },
    ],
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      required: true,
      default:
        "https://i.pinimg.com/originals/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
    },
    provider: { type: String },
    resetPasswordToken: String,
    resetPasswordTime: Date,
  },
  { timestamps: true }
);

//Hash the password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Compare the password which is stored in mongoDB and password entered by user
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

//Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  });
};

//Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
  });
};

const User = mongoose.model("User", userSchema);
export default User;

//module.exports = mongoose.model("User", userSchema);
