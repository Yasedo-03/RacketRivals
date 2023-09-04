import { UserModel } from "../models/Users.js";

export const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refresh_token) return res.sendStatus(204);
  const refreshToken = cookies.refresh_token;

  const foundUser = await UserModel.findOne({ refreshToken });
  if (!foundUser) {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken,
  );
  const result = await foundUser.save();

  res.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.sendStatus(204);
};
