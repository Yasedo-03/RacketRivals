import { FC } from "react";
import { TournamentListViews } from "../TournamentCard";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/store/useStore";
import { setTournamentView } from "../../../../store/slice/tournamentView";
import { setActivePage } from "../../../../store/slice/tournaments";
import { racketRivalsApi } from "../../../../services/api";
import styles from "./MenuTournamentCard.module.scss";

interface IPaginationDefault {
  pageNumber: number;
  pageSize: number;
}

const paginationDefault: IPaginationDefault = {
  pageNumber: 1,
  pageSize: 10,
};

export const MenuTournamentCard: FC = () => {
  const dispatch = useAppDispatch();
  const currentView = useAppSelector(
    (state) => state.tournamentView.currentView
  );

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
          dispatch(setActivePage(1));
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
          dispatch(setActivePage(1));
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
