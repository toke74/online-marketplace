import { app } from "./app.js";
import "dotenv/config";

import connectDB from "./db/database.js";

const port = process.env.PORT || 7000;

//create server
app.listen(port, () => {
  console.log(`Server is Running on Port ${port}`);
  connectDB(); // DB connection
});
