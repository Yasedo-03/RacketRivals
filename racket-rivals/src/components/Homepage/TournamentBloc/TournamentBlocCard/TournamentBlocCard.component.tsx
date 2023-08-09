import { Pagination } from "../../../Pagination";
import { SearchBar } from "../../../SearchBar";
import { TournamentList } from "../TournamentList";
import styles from "./TournamentBlocCard.module.scss";

export const TournamentBlocCard = () => {
  return (
    <div className={styles.container}>
      <SearchBar />
      <TournamentList />
      <Pagination />
    </div>
  );
};

TournamentBlocCard.displayName = "TournamentBlocCard";
