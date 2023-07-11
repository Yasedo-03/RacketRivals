import { MainBloc } from "./MainBloc";
import { PlayerBloc } from "./PlayerBloc";
import { TournamentBloc } from "./TournamentBloc";

export const Home = () => {
  return (
    <>
      <MainBloc />
      <TournamentBloc />
      <PlayerBloc />
    </>
  );
};
