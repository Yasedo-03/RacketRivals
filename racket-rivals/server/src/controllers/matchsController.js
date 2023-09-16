import { TournamentModel } from "../models/Tournaments.js";
import { MatchModel } from "../models/Matchs.js";
import { handleWinnerChange } from "../utils/handleWinnerChange.js";

export const getMatchs = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;

    const tournament = await TournamentModel.findById(tournamentId).populate({
      path: "matchs",
      populate: [
        { path: "player1", select: "firstName lastName _id" },
        { path: "player2", select: "firstName lastName _id" },
      ],
    });

    const formattedMatches = tournament.matchs.map((match) => ({
      _id: match._id,
      tournamentId: tournamentId,
      round: match.round,
      player1: match.player1
        ? {
            _id: match.player1._id,
            firstName: match.player1.firstName,
            lastName: match.player1.lastName,
          }
        : null,
      player2: match.player2
        ? {
            _id: match.player2._id,
            firstName: match.player2.firstName,
            lastName: match.player2.lastName,
          }
        : null,
      score: match.score,
      winner: match.winner,
      nextMatchId: match.nextMatchId,
      status: match.status,
    }));

    if (!tournament) {
      return res.status(404).json({ message: "Tournoi introuvable." });
    }

    res.status(200).json(formattedMatches);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des matchs." });
  }
};

export const updateTournamentEliminationMatch = async (req, res) => {
  try {
    const tournamentId = req.params.tournamentId;
    const updatedMatch = req.body;
    const { matchInput, matchId } = updatedMatch;

    if (!matchId) {
      return res.status(400).json({ message: "L'ID du match est requis." });
    }

    const tournament = await TournamentModel.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "Tournoi introuvable." });
    }

    if (req.user.id !== tournament.organizer.toString()) {
      return res
        .status(403)
        .json({ message: "L'organisateur ne correspond pas." });
    }

    const matchToUpdate = await MatchModel.findById(matchId);
    const updatedMatches = [];

    const nextMatch = await handleWinnerChange(matchToUpdate, matchInput);

    const updated = await MatchModel.findByIdAndUpdate(matchId, matchInput, {
      new: true,
    })
      .populate("player1", "firstName lastName _id")
      .populate("player2", "firstName lastName _id");
    updatedMatches.push(updated);

    if (nextMatch) {
      updatedMatches.push(nextMatch);
    }

    res.status(200).json(updatedMatches);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du match." });
  }
};
