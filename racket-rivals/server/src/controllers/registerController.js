import { UserModel } from "../models/Users.js";
import bcrypt from "bcrypt";

export const handleRegister = async (req, res) => {
  const { email, firstName, lastName, club, rank, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    email,
    firstName,
    lastName,
    club,
    rank,
    password: hashedPassword,
  });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
};
