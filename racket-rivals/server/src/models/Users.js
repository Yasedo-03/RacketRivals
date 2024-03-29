import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  club: { type: String },
  rank: { type: Number },
  password: { type: String, required: true },
  refreshToken: [String],
});

export const UserModel = mongoose.model("users", UserSchema);
