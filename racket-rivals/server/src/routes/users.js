import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { handleLogin } from "../controllers/authController.js";
import { getUser } from "../controllers/usersControllers.js";
import { handleRefreshToken } from "../controllers/refreshTokenControllers.js";
import { handleRegister } from "../controllers/registerController.js";
import { handleLogout } from "../controllers/logoutController.js";

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/me", verifyToken, getUser);
router.get("/refresh", handleRefreshToken);
router.post("/logout", handleLogout);

export { router as userRouter };
