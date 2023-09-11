import { MatchModel } from "../models/Matchs.js";

export const generateMatchsForTournamentRo8 = async (tournamentId) => {
  const quarterFinals = [];
  for (let i = 0; i < 8; i += 2) {
    const match = new MatchModel({
      tournamentId: tournamentId,
      round: "Ro8",
    });
    await match.save();
    quarterFinals.push(match);
  }

  const semiFinals = [];
  for (let i = 0; i < 2; i++) {
    const match = new MatchModel({
      tournamentId: tournamentId,
      round: "Ro4",
    });
    await match.save();
    quarterFinals[i * 2].nextMatchId = match._id;
    quarterFinals[i * 2 + 1].nextMatchId = match._id;
    await quarterFinals[i * 2].save();
    await quarterFinals[i * 2 + 1].save();
    semiFinals.push(match);
  }

  const final = new MatchModel({
    tournamentId: tournamentId,
    round: "Ro2",
  });

  await final.save();

  semiFinals[0].nextMatchId = final._id;
  semiFinals[1].nextMatchId = final._id;

  await semiFinals[0].save();
  await semiFinals[1].save();

  return [...quarterFinals, ...semiFinals, final];
};

export const generateMatchsForTournamentRo16 = async (tournamentId) => {
  const roundOf16 = [];
  for (let i = 0; i < 16; i += 2) {
    const match = new MatchModel({
      tournamentId: tournamentId,
      round: "Ro16",
    });
    await match.save();
    roundOf16.push(match);
  }

  const quarterFinals = [];
  for (let i = 0; i < 8; i += 2) {
    const match = new MatchModel({
      tournamentId: tournamentId,
      round: "Ro8",
    });
    await match.save();
    roundOf16[i * 2].nextMatchId = match._id;
    roundOf16[i * 2 + 1].nextMatchId = match._id;
    await roundOf16[i * 2].save();
    await roundOf16[i * 2 + 1].save();
    quarterFinals.push(match);
  }

  const semiFinals = [];
  for (let i = 0; i < 4; i += 2) {
    const match = new MatchModel({
      tournamentId: tournamentId,
      round: "Ro4",
    });
    await match.save();
    quarterFinals[i].nextMatchId = match._id;
    quarterFinals[i + 1].nextMatchId = match._id;
    await quarterFinals[i].save();
    await quarterFinals[i + 1].save();
    semiFinals.push(match);
  }

  const final = new MatchModel({
    tournamentId: tournamentId,
    round: "Ro2",
  });

  await final.save();

  semiFinals[0].nextMatchId = final._id;
  semiFinals[1].nextMatchId = final._id;

  await semiFinals[0].save();
  await semiFinals[1].save();

  return [...roundOf16, ...quarterFinals, ...semiFinals, final];
};
