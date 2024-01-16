import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { USER_ROLE } from "../utils/constants.js";
import { comparePassword, hashPassword } from "../utils/passwords.js";
import { ErrorUnauthenticated } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokens.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? USER_ROLE.ADMIN : USER_ROLE.USER;

  req.body.password = await hashPassword(req.body.password);

  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ message: "User created" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const validCredentials = user
    ? await comparePassword(req.body.password, user.password)
    : false;

  if (!validCredentials) throw new ErrorUnauthenticated("Invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("authToken", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ message: "user logged in" });
};

export const logout = (req, res) => {
  res.cookie("authToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ message: "user logged out." });
};
