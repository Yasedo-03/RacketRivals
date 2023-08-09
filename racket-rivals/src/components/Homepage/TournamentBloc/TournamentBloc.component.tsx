import { BlurDivider } from "../../BlurDivider";
import { ScrollDownArrows } from "../../ScrollArrows";
import { MenuTournamentBloc } from "./MenuTournamentBloc";
import { MyTournamentBlocCard } from "./MyTournamentBlocCard";
import { Route, Routes, useLocation } from "react-router-dom";
import styles from "./TournamentBloc.module.scss";
import { CreateTournamentCard } from "./CreateTournamentCard";

type TournamentBlocProps = {
  index: number;
};

export const TournamentBloc = ({ index }: TournamentBlocProps) => {
  return (
    <div className={styles.tournamentbloc}>
      <BlurDivider position={"top"} />
      <MenuTournamentBloc />
      <Routes>
        <Route path="/tournament/list" element={<MyTournamentBlocCard />} />
        <Route path="/tournament/create" element={<CreateTournamentCard />} />
      </Routes>
      <ScrollDownArrows index={index} />
      <BlurDivider />
    </div>
  );
};

TournamentBloc.displayName = "TournamentBloc";
