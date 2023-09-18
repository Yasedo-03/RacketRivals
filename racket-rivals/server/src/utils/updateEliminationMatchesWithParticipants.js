import { MatchModel } from "../models/Matchs.js";

export const updateEliminationMatchesWithParticipants = async (tournament) => {
  try {
    const seeds = tournament.seeds;
    const matchs = tournament.matchs;

    if (seeds.length !== 8) {
      throw new Error(
        "Nombre incorrect de participants pour un tournoi à élimination directe.",
      );
    }

    if (matchs.length !== 7) {
      throw new Error(
        "Nombre incorrect de matchs pour un tournoi à élimination directe.",
      );
    }

    for (let i = 0; i < 4; i++) {
      const match = await MatchModel.findById(matchs[i]);

      if (!match) {
        throw new Error(`Match avec ID ${matchs[i]} introuvable.`);
      }

      if (
        match.player1 &&
        match.player1.toString() === seeds[i].toString() &&
        match.player1 &&
        match.player2.toString() === seeds[7 - i].toString()
      ) {
        throw new Error(
          "Les matchs ont déjà été configurés avec les participants actuels.",
        );
      }

      match.player1 = seeds[i];
      match.player2 = seeds[7 - i];
      await match.save();
    }

    return tournament;
  } catch (error) {
    throw error;
  }
};
