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

  const accessToken = jwt.sign({ 
    id: user._id, email: user.email 
  }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });

  const refreshToken = jwt.sign({
    id: user._id,
}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

  res.cookie('refresh_token', refreshToken, { httpOnly: true, 
      sameSite: 'None', secure: true,
      maxAge: 24 * 60 * 60 * 1000 
    }
  ); 
  res.json({ accessToken, userID: user._id });
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

router.post("/refresh", async (req, res) => {

  const user = await UserModel.findOne({ email });

  if (req.cookies?.jwt) {
      const refreshToken = req.cookies.jwt;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
    (err, decoded) => {
        if (err) {
          return res.status(406).json({ message: 'Unauthorized' });
        }
        else {
            const accessToken = jwt.sign({
              id: user._id,
              email: user.email
            }, process.env.ACCESS_TOKEN_SECRET, {
              expiresIn: '10m'
            });
            return res.json({ accessToken, userID: user._id });
        }
    })
} else {
    return res.status(406).json({ message: 'Unauthorized' });
}
});

export { router as userRouter };
