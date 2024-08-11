import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const data = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB Database Connected with ${data.connection.host}`);
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
