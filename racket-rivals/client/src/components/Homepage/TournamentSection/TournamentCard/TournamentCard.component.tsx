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
import { useLaptopMediaQuery } from "../../../../hooks/responsive/useLaptopMediaQuery.hook";
import styles from "./TournamentCard.module.scss";

export enum TournamentListViews {
  MyTournaments = "myTournaments",
  TournamentList = "tournamentList",
}

export const TournamentCard = () => {
  const isLaptop = useLaptopMediaQuery();
  const pageSizeTournamentResponsive = isLaptop ? 8 : 3;
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
    if (currentView === TournamentListViews.MyTournaments) {
      dispatch(
        tournamentsEndpoints.endpoints.getMyTournaments.initiate({
          page: newPage,
          pageSize: pageSizeTournamentResponsive,
        })
      );
    } else if (currentView === TournamentListViews.TournamentList) {
      dispatch(
        tournamentsEndpoints.endpoints.getTournaments.initiate({
          page: newPage,
          pageSize: pageSizeTournamentResponsive,
        })
      );
    }
  };

  return (
    <div className={styles.container} ref={cardRef}>
      <SearchBar context="tournaments" />
      <MenuTournamentCard
        pageSizeTournamentResponsive={pageSizeTournamentResponsive}
      />
      <TournamentList me={me} currentView={currentView} />
      {(currentView === TournamentListViews.TournamentList || me) && (
        <Pagination
          context="tournaments"
          onPageChange={handlePageChange}
          currentView={currentView}
          pageSizeTournamentResponsive={pageSizeTournamentResponsive}
        />
      )}
    </div>
  );
};

TournamentCard.displayName = "TournamentCard";
