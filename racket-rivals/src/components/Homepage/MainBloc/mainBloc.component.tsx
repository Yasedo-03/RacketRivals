import { BlurDivider } from "../../BlurDivider";
import { ScrollDownArrows } from "../../ScrollArrows";
import styles from "./MainBloc.module.scss";
import { MainCard } from "./MainCard";

type MainBlocPros = {
  index: number;
};

export const MainBloc = ({ index }: MainBlocPros) => {
  return (
    <div className={styles.mainBloc}>
      <MainCard />
      <ScrollDownArrows index={index} />
      <BlurDivider />
    </div>
  );
};

MainBloc.displayName = "MainBloc";
