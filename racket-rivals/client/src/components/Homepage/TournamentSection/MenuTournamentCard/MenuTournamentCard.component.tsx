/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC } from "react";
import { TournamentListViews } from "../TournamentCard";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/store/useStore";
import { setTournamentView } from "../../../../store/slice/tournamentView";
import { setActivePageTournaments } from "../../../../store/slice/tournaments";
import { racketRivalsApi } from "../../../../services/api";
import styles from "./MenuTournamentCard.module.scss";

interface IPaginationDefault {
  pageNumber: number;
  pageSize: number;
}
interface MenuTournamentCardProps {
  pageSizeTournamentResponsive: number;
}

export const MenuTournamentCard: FC<MenuTournamentCardProps> = ({
  pageSizeTournamentResponsive,
}) => {
  const dispatch = useAppDispatch();
  const currentView = useAppSelector(
    (state) => state.tournamentView.currentView
  );

  const paginationDefault: IPaginationDefault = {
    pageNumber: 1,
    pageSize: pageSizeTournamentResponsive,
  };

  return (
    <div className={styles.container}>
      <div
        className={
          currentView === TournamentListViews.MyTournaments
            ? `${styles.active} ${styles.menuButton}`
            : styles.menuButton
        }
        onClick={() => {
          dispatch(setTournamentView(TournamentListViews.MyTournaments));
          dispatch(setActivePageTournaments(1));
          dispatch(
            racketRivalsApi.util.invalidateTags([
              {
                type: "Tournaments",
                id: `GET_MY_${paginationDefault.pageNumber}_${paginationDefault.pageSize}`,
              },
            ])
          );
        }}
      >
        <span>Mes Tournois</span>
      </div>
      <div
        className={
          currentView === TournamentListViews.TournamentList
            ? `${styles.active} ${styles.menuButton}`
            : styles.menuButton
        }
        onClick={() => {
          dispatch(setTournamentView(TournamentListViews.TournamentList));
          dispatch(setActivePageTournaments(1));
          dispatch(
            racketRivalsApi.util.invalidateTags([
              {
                type: "Tournaments",
                id: `GET_${paginationDefault.pageNumber}_${paginationDefault.pageSize}`,
              },
            ])
          );
        }}
      >
        <span>Liste des tournois</span>
      </div>
    </div>
  );
};

MenuTournamentCard.displayName = "MenuTournamentCard";
