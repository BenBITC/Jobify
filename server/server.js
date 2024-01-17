console.log("Running server.js...");

import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// IMPORT ROUTERS
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// PUBLIC
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// MIDDLEWARE
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

// FILE STORAGE
import cloudinary from "cloudinary";

console.log("Server.js imports successful");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// SERVER CONFIGURATION
if (process.env.NODE_ENV != "production") {
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, "../client/dist")));
app.use(cookieParser());
app.use(express.json());

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "test route" });
});

// API ROUTING
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

// ERROR ROUTING
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});
app.use(errorHandlerMiddleware);

// START THE SERVER
const port = process.env.PORT || 5000;
try {
  console.log("Routers initialized, connecting to MongoDB");
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
