import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getUser, getUsers } from "../controllers/usersControllers.js";

const router = express.Router();

router.get("/me", verifyToken, getUser);
router.get("/users", getUsers);

export { router as userRouter };
