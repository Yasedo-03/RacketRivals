import { ScrollDownArrows } from "../../ScrollArrows";
import styles from "./TournamentBloc.module.scss";

type TournamentBlocProps = {
  index: number;
};

export const TournamentBloc = ({ index }: TournamentBlocProps) => {
  return (
    <div className={styles.bloc}>
      TOURNAMENT BLOC
      <ScrollDownArrows index={index} />
    </div>
  );
};

TournamentBloc.displayName = "TournamentBloc";
