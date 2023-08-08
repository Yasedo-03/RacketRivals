import { SearchBar } from "../../../SearchBar";
import styles from "./TournamentBlocCard.module.scss";

export const TournamentBlocCard = () => {
  return (
    <div className={styles.container}>
      <SearchBar />
    </div>
  );
};

TournamentBlocCard.displayName = "TournamentBlocCard";
