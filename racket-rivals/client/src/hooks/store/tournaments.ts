import { ITournament } from "../../services/tournaments/interfaces/tournamentInterface";
import { useAppSelector } from "./useStore";

export const useTournaments = (): ITournament[] | null => {
  const tournaments = useAppSelector((state) => state.tournaments.tournaments);
  return tournaments;
};

export const useMyTournaments = (): ITournament[] | null => {
  const myTournaments = useAppSelector(
    (state) => state.tournaments.myTournaments
  );
  return myTournaments;
};

export const useTournament = (): ITournament | null => {
  const tournament = useAppSelector((state) => state.tournaments.tournament);
  return tournament;
};
