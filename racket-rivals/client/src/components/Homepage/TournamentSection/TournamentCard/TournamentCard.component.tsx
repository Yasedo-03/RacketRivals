import { useLayoutEffect, useRef, useState } from "react";
import { Pagination } from "../../../Pagination";
import { SearchBar } from "../../../SearchBar";
import { TournamentList } from "../TournamentList";
import { MenuTournamentCard } from "../MenuTournamentCard/MenuTournamentCard.component";
import styles from "./TournamentCard.module.scss";

export enum TournamentListViews {
  MyTournaments = "myTournaments",
  TournamentList = "tournamentList",
}

export const TournamentCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tournamentListView, setTournamentListView] =
    useState<TournamentListViews>(TournamentListViews.MyTournaments);

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
      <MenuTournamentCard
        tournamentListView={tournamentListView}
        setTournamentListView={setTournamentListView}
      />
      <TournamentList tournamentListView={tournamentListView} />
      <Pagination />
    </div>
  );
};

TournamentCard.displayName = "TournamentCard";
