import { BlurDivider } from "../../BlurDivider";
import { ScrollArrows, ScrollArrowsDirection } from "../../ScrollArrows";
import styles from "./MainBloc.module.scss";
import { MainCard } from "./MainCard";

type MainBlocPros = {
  index: number;
};

export const MainBloc = ({ index }: MainBlocPros) => {
  return (
    <div className={styles.mainBloc}>
      <MainCard />
      <ScrollArrows index={index} />
      <BlurDivider />
    </div>
  );
};

MainBloc.displayName = "MainBloc";
