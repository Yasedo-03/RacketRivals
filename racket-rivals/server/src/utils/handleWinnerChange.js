import { MatchModel } from "../models/Matchs.js";

export const handleWinnerChange = async (matchToUpdate, matchInput) => {
  let updatesForCurrentMatch = {};

  if (matchToUpdate.winner !== matchInput.winner) {
    updatesForCurrentMatch.winner = matchInput.winner;
  }

  if (Object.keys(updatesForCurrentMatch).length) {
    await MatchModel.findByIdAndUpdate(
      matchToUpdate._id,
      updatesForCurrentMatch,
    );
  }

  if (!matchToUpdate.nextMatchId) {
    return null;
  }

  const nextMatch = await MatchModel.findById(matchToUpdate.nextMatchId);

  if (!nextMatch) {
    return null;
  }

  let updatesForNextMatch = {};

  if (
    matchToUpdate.winner &&
    (matchToUpdate.winner !== matchInput.winner || !matchInput.winner)
  ) {
    if (nextMatch.player1?.toString() === matchToUpdate.winner.toString()) {
      updatesForNextMatch.player1 = null;
      updatesForNextMatch.score = { player1: 0, player2: 0 };
    } else if (
      nextMatch.player2?.toString() === matchToUpdate.winner.toString()
    ) {
      updatesForNextMatch.player2 = null;
      updatesForNextMatch.score = { player1: 0, player2: 0 };
    }
  }

  if (matchInput.winner) {
    if (!nextMatch.player1 && !nextMatch.player2) {
      updatesForNextMatch.player1 = matchInput.winner;
    } else if (nextMatch.player1 && !nextMatch.player2) {
      if (nextMatch.player1.toString() !== matchInput.winner.toString()) {
        updatesForNextMatch.player2 = matchInput.winner;
      }
    } else if (!nextMatch.player1 && nextMatch.player2) {
      if (nextMatch.player2.toString() !== matchInput.winner.toString()) {
        updatesForNextMatch.player1 = matchInput.winner;
      }
    }
  }

  let nextMatchUpdated;
  if (Object.keys(updatesForNextMatch).length) {
    nextMatchUpdated = await MatchModel.findByIdAndUpdate(
      nextMatch._id,
      updatesForNextMatch,
      { new: true },
    )
      .populate("player1", "firstName lastName _id")
      .populate("player2", "firstName lastName _id");
  }

  return nextMatchUpdated;
};
