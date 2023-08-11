import { NavLink } from "react-router-dom";
import styles from "./MenuTournamentBloc.module.scss";

export const MenuTournamentBloc = () => {
  return (
    <div className={styles.container}>
      <NavLink
        to="/tournament/list"
        className={({ isActive }) =>
          isActive ? `${styles.active} ${styles.menuButton}` : styles.menuButton
        }
      >
        <span>Trouver un tournoi</span>
      </NavLink>
      <NavLink
        to="/tournament/create"
        className={({ isActive }) =>
          isActive ? `${styles.active} ${styles.menuButton}` : styles.menuButton
        }
      >
        <span>Créer un tournoi</span>
      </NavLink>
    </div>
  );
};

MenuTournamentBloc.displayName = "MenuTournamentBloc";
