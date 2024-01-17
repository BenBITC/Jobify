import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import cloudinary from "cloudinary";
import { formatImage } from "../middleware/fileUploadMiddleware.js";

export const getCurrentUser = async (req, res) => {
  const currentUser = await User.findOne({ _id: req.user.userId });
  const user = currentUser.makeJSONWithoutPassword();
  res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const updatedUser = { ...req.body };
  delete updatedUser.password;

  // Upload profile picture and delete the temp file
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    updatedUser.avatar = response.secure_url;
    updatedUser.avatarPublicId = response.public_id;
  }

  // API to MongoDB to update the user
  const existingUser = await User.findByIdAndUpdate(
    req.user.userId,
    updatedUser
  );

  // Delete any previous profile picture
  if (req.file && existingUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(existingUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ message: "user updated" });
};
