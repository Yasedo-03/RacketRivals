import { Pagination } from "../../../Pagination";
import { SearchBar } from "../../../SearchBar";
import { TournamentList } from "../TournamentList";
import styles from "./MyTournamentBlocCard.module.scss";

export const MyTournamentBlocCard = () => {
  return (
    <div className={styles.container}>
      <SearchBar />
      <TournamentList />
      <Pagination />
    </div>
  );
};

MyTournamentBlocCard.displayName = "MyTournamentBlocCard";
