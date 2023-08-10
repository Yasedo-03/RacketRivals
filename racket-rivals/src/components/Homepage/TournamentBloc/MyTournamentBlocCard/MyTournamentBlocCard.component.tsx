import { useLayoutEffect, useRef } from "react";
import { Pagination } from "../../../Pagination";
import { SearchBar } from "../../../SearchBar";
import { TournamentList } from "../TournamentList";
import styles from './MyTournamentCard.module.scss';

export const MyTournamentBlocCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add(styles.containerInPlace);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container} ref={cardRef}>
      <SearchBar />
      <TournamentList />
      <Pagination />
    </div>
  );
};

MyTournamentBlocCard.displayName = "MyTournamentBlocCard";
