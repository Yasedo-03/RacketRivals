import express from "express";
import { getMatchs } from "../controllers/matchsController.js";

const router = express.Router();

router.get("/:tournamentId", getMatchs);

export { router as matchRouter };
