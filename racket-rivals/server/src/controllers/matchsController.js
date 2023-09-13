import { TournamentModel } from "../models/Tournaments.js";
import { MatchModel } from "../models/Matchs.js";

export const getMatchs = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;

    const tournament =
      await TournamentModel.findById(tournamentId).populate("matchs");

    if (!tournament) {
      return res.status(404).json({ message: "Tournoi introuvable." });
    }

    res.status(200).json(tournament.matchs);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des matchs." });
  }
};
