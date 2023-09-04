import { UserModel } from "../models/Users.js";
import jwt from "jsonwebtoken";

export const handleRefreshToken = async (req, res) => {
  const user = await UserModel.findOne({ email });

  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.status(406).json({ message: "Unauthorized" });
        } else {
          const accessToken = jwt.sign(
            {
              id: user._id,
              email: user.email,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "10m",
            },
          );
          return res.json({ accessToken, userID: user._id });
        }
      },
    );
  } else {
    return res.status(406).json({ message: "Unauthorized" });
  }
};
