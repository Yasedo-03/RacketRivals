import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getUser,
  getUsers,
  searchUsers,
} from "../controllers/usersControllers.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/me", verifyToken, getUser);
router.get("/users", searchUsers);

export { router as userRouter };
