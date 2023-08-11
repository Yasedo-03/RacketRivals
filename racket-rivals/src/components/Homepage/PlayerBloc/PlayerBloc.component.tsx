import { BlurDivider } from "../../BlurDivider";
import { ScrollArrows, ScrollArrowsDirection } from "../../ScrollArrows";
import styles from "./PlayerBloc.module.scss";

type PlayerBlocProps = {
  index: number;
};

export const PlayerBloc = ({ index }: PlayerBlocProps) => {
  return (
    <div className={styles.playerbloc}>
      <BlurDivider position={"top"} />
      PLAYER BLOC
      <ScrollArrows
        index={index}
        scrollArrowsDirection={ScrollArrowsDirection.TOP}
      />
      <BlurDivider />
    </div>
  );
};

PlayerBloc.displayName = "PlayerBloc";
