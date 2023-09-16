import { TournamentModel } from "../models/Tournaments.js";
import { MatchModel } from "../models/Matchs.js";

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

    await MatchModel.findByIdAndUpdate(matchId, matchInput);

    if (matchInput.winner && matchInput.nextMatchId) {
      const nextMatch = await MatchModel.findById(matchInput.nextMatchId);

      if (nextMatch) {
        const updates = {};

        // Si le match suivant n'a aucun joueur
        if (!nextMatch.player1 && !nextMatch.player2) {
          updates.player1 = matchInput.winner;
        }
        // Si le match suivant a déjà un joueur1 mais pas de joueur2
        else if (nextMatch.player1 && !nextMatch.player2) {
          // Vérifiez que le joueur gagnant du quart n'est pas identique au joueur1 déjà enregistré
          if (nextMatch.player1.toString() !== matchInput.winner.toString()) {
            updates.player2 = matchInput.winner;
          }
        }
        // Si le match suivant a un joueur2 mais pas de joueur1
        else if (!nextMatch.player1 && nextMatch.player2) {
          // Vérifiez que le joueur gagnant du match précédent n'est pas identique au joueur2 déjà enregistré
          if (nextMatch.player2.toString() !== matchInput.winner.toString()) {
            updates.player1 = matchInput.winner;
          }
        }

        if (Object.keys(updates).length) {
          await MatchModel.findByIdAndUpdate(nextMatch._id, updates);
        }
      }
    }

    const allMatches = await MatchModel.find({ tournamentId: tournamentId })
      .populate("player1", "firstName lastName _id")
      .populate("player2", "firstName lastName _id");

    res.status(200).json(allMatches);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du match." });
  }
};
