import { FC } from "react";
import styles from "./MenuTournamentCard.module.scss";
import { TournamentListViews } from "../TournamentCard";

type MenuTournamentCardProps = {
  tournamentListView: TournamentListViews;
  setTournamentListView: (view: TournamentListViews) => void;
};

export const MenuTournamentCard: FC<MenuTournamentCardProps> = ({
  tournamentListView,
  setTournamentListView,
}) => {
  return (
    <div className={styles.container}>
      <div
        className={
          tournamentListView === TournamentListViews.MyTournaments
            ? `${styles.active} ${styles.menuButton}`
            : styles.menuButton
        }
        onClick={() => setTournamentListView(TournamentListViews.MyTournaments)}
      >
        <span>Mes Tournois</span>
      </div>
      <div
        className={
          tournamentListView === TournamentListViews.TournamentList
            ? `${styles.active} ${styles.menuButton}`
            : styles.menuButton
        }
        onClick={() =>
          setTournamentListView(TournamentListViews.TournamentList)
        }
      >
        <span>Liste des tournois</span>
      </div>
    </div>
  );
};

MenuTournamentCard.displayName = "MenuTournamentCard";
