import express from "express";
import { handleLogin } from "../controllers/authController.js";
import { handleRefreshToken } from "../controllers/refreshTokenControllers.js";
import { handleRegister } from "../controllers/registerController.js";
import { handleLogout } from "../controllers/logoutController.js";

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/refresh", handleRefreshToken);
router.post("/logout", handleLogout);

export { router as authRouter };
