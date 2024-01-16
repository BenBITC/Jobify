import mongoose from "mongoose";
import { USER_ROLE } from "../utils/constants.js";

// DEFINE USER OBJECT SCHEMA
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "Last Name",
  },
  location: {
    type: String,
    default: "My City",
  },
  role: {
    type: String,
    enum: USER_ROLE,
  },
  avatar: String,
  avatarPublicId: String,
});

UserSchema.methods.makeJSONWithoutPassword = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
