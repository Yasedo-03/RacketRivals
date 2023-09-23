import { getUsers } from "../src/controllers/usersControllers.js";

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      await getUsers(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur est survenue' });
    }
  } else {
    res.status(405).end();
  }
};
