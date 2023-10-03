import { FC } from "react";
import { TournamentListViews } from "../TournamentCard";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/store/useStore";
import { setTournamentView } from "../../../../store/slice/tournamentView";
import styles from "./MenuTournamentCard.module.scss";

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
        }}
      >
        <span>Liste des tournois</span>
      </div>
    </div>
  );
};

MenuTournamentCard.displayName = "MenuTournamentCard";
