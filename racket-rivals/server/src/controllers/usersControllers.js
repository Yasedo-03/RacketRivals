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
    const page = parseInt(req.query.page || "1");
    const pageSize = parseInt(req.query.pageSize || "7");

    const totalUsers = await UserModel.countDocuments();

    const skip = (page - 1) * pageSize;

    const users = await UserModel.find()
      .select("firstName lastName _id rank club")
      .sort({ rank: -1 })
      .skip(skip)
      .limit(pageSize);

    const endItem = skip + users.length - 1;
    res.setHeader("Content-Range", `${skip}-${endItem}/${totalUsers}`);

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { search } = req.query;
    const page = parseInt(req.query.page || "1");
    const pageSize = parseInt(req.query.pageSize || "7");

    let searchCriteria = {};

    if (search) {
      searchCriteria = {
        $or: [
          { firstName: new RegExp(search, "i") },
          { lastName: new RegExp(search, "i") },
          { club: new RegExp(search, "i") },
        ],
      };
    }

    const totalUsersWithSearchCriteria =
      await UserModel.countDocuments(searchCriteria);

    const skip = (page - 1) * pageSize;

    const users = await UserModel.find(searchCriteria)
      .select("firstName lastName _id rank club")
      .sort({ rank: -1 })
      .skip(skip)
      .limit(pageSize);

    const endItem = skip + users.length - 1;
    res.setHeader(
      "Content-Range",
      `${skip}-${endItem}/${totalUsersWithSearchCriteria}`,
    );

    res.status(200).send(users);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erreur lors de la recherche des joueurs." });
  }
};
