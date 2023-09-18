import { BlurDivider } from "../../BlurDivider";
import { ScrollArrows, ScrollArrowsDirection } from "../../ScrollArrows";
import styles from "./MainSection.module.scss";
import { MainCard } from "./MainCard";

type MainSectionPros = {
  index: number;
};

export const MainSection = ({ index }: MainSectionPros) => {
  return (
    <div className={styles.mainSection}>
      <MainCard />
      <ScrollArrows index={index} />
      <BlurDivider />
    </div>
  );
};

MainSection.displayName = "MainSection";
