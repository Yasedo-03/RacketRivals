import { STATUS } from "../services/tournaments/interfaces/tournamentInterface";

export const determineWinner = (
  winnerId: string | null,
  player1Id: string | null,
  player2Id: string | null
) => {
  if (winnerId === player1Id) {
    return player1Id;
  } else if (winnerId === player2Id) {
    return player2Id;
  } else {
    return null;
  }
};

export const determineMatchStatus = (
  score: { player1: number; player2: number },
  winner: string | null
): STATUS => {
  if (winner) {
    return STATUS.FINISHED;
  } else if (score.player1 > 0 || score.player2 > 0) {
    return STATUS.ONGOING;
  } else {
    return STATUS.NOT_STARTED;
  }
};
