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
    const { search } = req.query;

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

    const users = await UserModel.find(searchCriteria);

    res.status(200).send(users);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erreur lors de la recherche des joueurs." });
  }
};
