import { STATUS } from "../../tournaments/interfaces/tournamentInterface";

export interface UpdateMatchParams {
  tournamentId: string;
  matchInput: MatchUpdate;
  matchId: string;
}

export interface Match {
  _id: string;
  tournamentId: string;
  round: string;
  player1?: Player;
  player2?: Player;
  score: {
    player1: number;
    player2: number;
  };
  winner: string | null;
  nextMatchId?: string | undefined;
  status: STATUS;
}

export interface Player {
  _id: string;
  firstName: string;
  lastName: string;
}

export interface MatchUpdate {
  winner?: string | null;
  score?: {
    player1?: number;
    player2?: number;
  };
  status?: STATUS;
}
