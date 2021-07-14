import mongoose from "mongoose";
import { IUser } from "../types/user.types";

export const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  profilePicture: { type: String, required: false },
  refreshToken: { type: String, required: true },
  accessToken: { type: String, required: true },
  accessTokenExp: { type: Date, required: true },
});

export const userModel = mongoose.model<IUser>("User", UserSchema);
