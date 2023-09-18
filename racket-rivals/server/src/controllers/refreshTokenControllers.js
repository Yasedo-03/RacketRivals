import { UserModel } from "../models/Users.js";
import jwt from "jsonwebtoken";

export const handleRefreshToken = async (req, res) => {
  if (req.cookies?.refresh_token) {
    const refreshToken = req.cookies.refresh_token;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.status(406).json({ message: "Unauthorized" });
        } else {
          const user = await UserModel.findOne({ _id: decoded.id });
          if (!user) {
            return res.status(406).json({ message: "Unauthorized" });
          }
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
          return res.json({ userID: user._id, accessToken });
        }
      },
    );
  } else {
    return res.status(406).json({ message: "Unauthorized" });
  }
};
