import { useLayoutEffect, useRef } from "react";
import { Pagination } from "../../../Pagination";
import { SearchBar } from "../../../SearchBar";
import { TournamentList } from "../TournamentList";
import { MenuTournamentCard } from "../MenuTournamentCard/MenuTournamentCard.component";
import { tournamentsEndpoints } from "../../../../services/tournaments/endpoints";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/store/useStore";
import { useGetUser } from "../../../../hooks/store/user";
import styles from "./TournamentCard.module.scss";

export enum TournamentListViews {
  MyTournaments = "myTournaments",
  TournamentList = "tournamentList",
}

export const TournamentCard = () => {
  const me = useGetUser();
  const dispatch = useAppDispatch();
  const currentView = useAppSelector(
    (state) => state.tournamentView.currentView
  );
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add(styles.containerInPlace);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (newPage: number) => {
    dispatch(
      tournamentsEndpoints.endpoints.getTournaments.initiate({
        page: newPage,
        pageSize: 10,
      })
    );
  };

  return (
    <div className={styles.container} ref={cardRef}>
      <SearchBar context="tournaments" />
      <MenuTournamentCard />
      <TournamentList me={me} currentView={currentView} />
      {(currentView === TournamentListViews.TournamentList || me) && (
        <Pagination context="tournaments" onPageChange={handlePageChange} />
      )}
    </div>
  );
};

TournamentCard.displayName = "TournamentCard";
