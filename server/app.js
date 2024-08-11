//import packages
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

//import local file
import ErrorHandlerMiddleware from "./middlewares/error.js";
import userRouter from "./routes/user.route.js";
import "dotenv/config";

export const app = express();

//passing bodyParser middleware
app.use(express.json({ limit: "50mb" }));

//cookie parser middleware
app.use(cookieParser());

//cors middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//routes
app.use("/api/v1/user", userRouter);

//testing route
app.get("/test", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Test API is Working",
  });
});

//all Unknown Routes
app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

// it's for ErrorHandling
app.use(ErrorHandlerMiddleware);
