import jwt from "jsonwebtoken";
import { UserModel } from "../models/Users.js";
import bcrypt from "bcrypt";

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const cookies = req.cookies;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Email or password is incorrect" });
  } else {
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" },
    );

    const newRefreshToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    let newRefreshTokenArray = !cookies?.refresh_token
      ? user.refreshToken
      : user.refreshToken.filter((rt) => rt !== cookies.refresh_token);

    if (cookies?.refresh_token) {
      const refreshToken = cookies.refresh_token;
      const foundToken = await UserModel.findOne({ refreshToken });

      if (!foundToken) {
        newRefreshTokenArray = [];
      }

      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await user.save();

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken, userID: user._id });
  }
};
