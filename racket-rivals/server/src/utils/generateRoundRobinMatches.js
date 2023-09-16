import { MatchModel } from "../models/Matches.js";
import { TournamentModel } from "../models/Tournaments.js";

export const generateRoundRobinMatches = async (tournamentId) => {
  try {
    const tournament = await TournamentModel.findById(tournamentId);

    if (!tournament) {
      throw new Error("Tournoi introuvable.");
    }

    if (tournament.matchs.length !== 0) {
      throw new Error("Les matches ont déjà été générés pour ce tournoi.");
    }

    const participants = tournament.seeds;
    let matches = [];

    for (let i = 0; i < participants.length; i++) {
      for (let j = i + 1; j < participants.length; j++) {
        const match = new MatchModel({
          player1: participants[i],
          player2: participants[j],
          // Add additional match details here if needed.
        });
        await match.save();
        matches.push(match._id);
      }
    }

    tournament.matchs = matches;
    await tournament.save();

    return matches;
  } catch (error) {
    throw error;
  }
};
