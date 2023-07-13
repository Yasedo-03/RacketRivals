import { BlurDivider } from "../../BlurDivider";
import styles from "./PlayerBloc.module.scss";

type PlayerBlocProps = {
  index: number;
};

export const PlayerBloc = ({ index }: PlayerBlocProps) => {
  return (
    <div className={styles.playerbloc}>
      <BlurDivider position={"top"} />
      PLAYER BLOC
      <BlurDivider />
    </div>
  );
};

PlayerBloc.displayName = "PlayerBloc";
