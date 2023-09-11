import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getTournament,
  newTournament,
  getTournaments,
  getMyTournaments,
  registerToTournament,
  unregisterFromTournament,
  updateTournament,
} from "../controllers/tournamentsController.js";

const router = express.Router();

router.post("/create", verifyToken, newTournament);
router.patch("/register", verifyToken, registerToTournament);
router.patch("/unregister", verifyToken, unregisterFromTournament);
router.patch("/:tournamentId/update", verifyToken, updateTournament);
router.get("/myTournaments", verifyToken, getMyTournaments);
router.get("/:tournamentId", getTournament);
router.get("/", getTournaments);

export { router as tournamentRouter };
