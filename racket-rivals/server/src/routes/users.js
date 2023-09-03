import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { verifyToken } from "../middlewares/token.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, firstName, lastName, club, rank, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "Username already exists" });
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
  res.json({ message: "User registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Email or password is incorrect" });
  }
  const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
  res.json({ token, userID: user._id });
});

router.get("/me", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await UserModel.findById(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router as userRouter };
