import { UserModel } from "../models/Users.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await UserModel.findById(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUsers = async (req, res) => {
  try {
    const result = await UserModel.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};
