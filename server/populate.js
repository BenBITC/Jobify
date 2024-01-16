import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import UserModel from "./models/UserModel.js";
import JobModel from "./models/JobModel.js";

try {
  await mongoose.connect(process.env.MONGO_URL);
  const user = await UserModel.findOne({ email: "JSpec@gmail.com" });
  // const user = await UserModel.findOne({ email: "test@test.com" });

  const mockJobsJSON = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );
  const mockJobs = mockJobsJSON.map((job) => {
    return { ...job, createdBy: user._id };
  });

  await JobModel.deleteMany({ createdBy: user._id });
  await JobModel.create(mockJobs);
  console.log("Success!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
