import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getMatchs,
  updateTournamentEliminationMatch,
} from "../controllers/matchsController.js";

const router = express.Router();

router.get("/:tournamentId", getMatchs);
router.patch(
  "/:tournamentId/matchs_update",
  verifyToken,
  updateTournamentEliminationMatch,
);

export { router as matchRouter };
