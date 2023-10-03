import { useLayoutEffect, useRef } from "react";
import { Pagination } from "../../../Pagination";
import { SearchBar } from "../../../SearchBar";
import { TournamentList } from "../TournamentList";
import { MenuTournamentCard } from "../MenuTournamentCard/MenuTournamentCard.component";
import {
  setSearchQueryTournaments,
  setSearchTermTournaments,
} from "../../../../store/slice/searchSlice";
import { useDispatch } from "react-redux";
import { racketRivalsApi } from "../../../../services/api";
import styles from "./TournamentCard.module.scss";

export enum TournamentListViews {
  MyTournaments = "myTournaments",
  TournamentList = "tournamentList",
}

export const TournamentCard = () => {
  const dispatch = useDispatch();
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
      <SearchBar
        context="tournaments"
        onSearch={(query) => {
          dispatch(setSearchTermTournaments(query));
        }}
        onReset={() => {
          dispatch(racketRivalsApi.util.invalidateTags(["Tournaments"]));
        }}
      />
      <MenuTournamentCard />
      <TournamentList />
      <Pagination />
    </div>
  );
};

TournamentCard.displayName = "TournamentCard";
