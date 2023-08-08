import { BlurDivider } from "../../BlurDivider";
import { ScrollDownArrows } from "../../ScrollArrows";
import { MenuTournamentBloc } from "./MenuTournamentBloc";
import { TournamentBlocCard } from "./TournamentBlocCard";
import styles from "./TournamentBloc.module.scss";

type TournamentBlocProps = {
  index: number;
};

export const TournamentBloc = ({ index }: TournamentBlocProps) => {
  return (
    <div className={styles.tournamentbloc}>
      <BlurDivider position={"top"} />
      <MenuTournamentBloc />
      <TournamentBlocCard />
      <ScrollDownArrows index={index} />
      <BlurDivider />
    </div>
  );
};

TournamentBloc.displayName = "TournamentBloc";
