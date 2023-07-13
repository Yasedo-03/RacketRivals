import { BlurDivider } from "../../BlurDivider";
import { ScrollDownArrows } from "../../ScrollArrows";
import styles from "./TournamentBloc.module.scss";

type TournamentBlocProps = {
  index: number;
};

export const TournamentBloc = ({ index }: TournamentBlocProps) => {
  return (
    <div className={styles.tournamentbloc}>
      <BlurDivider position={"top"} />
      TOURNAMENT BLOC
      <ScrollDownArrows index={index} />
      <BlurDivider />
    </div>
  );
};

TournamentBloc.displayName = "TournamentBloc";
