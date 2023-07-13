import styles from "./PlayerBloc.module.scss";

type PlayerBlocProps = {
  index: number;
};

export const PlayerBloc = ({ index }: PlayerBlocProps) => {
  return <div className={styles.bloc}>PLAYER BLOC</div>;
};

PlayerBloc.displayName = "PlayerBloc";
