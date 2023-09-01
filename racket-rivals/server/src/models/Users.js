import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    club: { type: String, required: true },
    password: { type: String, required: true },
});

export const UserModel = mongoose.model("users", UserSchema);