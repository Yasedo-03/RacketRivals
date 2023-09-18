import { BlurDivider } from "../../BlurDivider";
import { ScrollArrows, ScrollArrowsDirection } from "../../ScrollArrows";
import { MainCard } from "./MainCard";
import styles from "./MainSection.module.scss";

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
