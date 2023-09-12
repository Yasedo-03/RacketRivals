export interface Organizer {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  club?: string;
}

export interface Participant {
  _id: string;
  firstName: string;
  lastName: string;
  club?: string;
  rank?: string;
}

export interface Contact {
  email: string;
  phone?: string;
}

export interface Match {
  _id: string;
  tournamentId: string;
  round: string;
  player1: Participant;
  player2: Participant;
  score: {
    player1: Number;
    player2: Number;
  };
  winner: Participant;
  nextMatchId: string | null;
}

export interface GetTournamentParams {
  tournamentId: string | undefined;
}

export interface UpdateTournamentParams {
  tournamentId: string | undefined;
  tournament: ITournamentInput;
}

export interface RegisterToTournamentBody {
  tournamentId: string | null;
  userId: string | null;
}

export interface ITournamentInput {
  name: string;
  start_date: string;
  end_date: string;
  start_hour: string;
  location: string;
  format: string;
  description?: string;
  number_of_participants: number;
  accesibility: string;
  contact: Contact;
  price: number;
}

export interface ITournament extends ITournamentInput {
  _id: string;
  organizer: Organizer;
  uniqueCode: string;
  participants?: Participant[] | undefined;
  seeds?: Participant[];
  matchs: Match[];
}
