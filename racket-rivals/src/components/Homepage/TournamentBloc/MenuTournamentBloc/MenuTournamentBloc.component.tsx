import styles from "./MenuTournamentBloc.module.scss";

export const MenuTournamentBloc = () => {
  return (
    <div className={styles.container}>
      <button className={styles.menuButton} type="button">
        Mes tournois
      </button>
      <button className={styles.menuButton} type="button">
        Créer un tournoi
      </button>
    </div>
  );
};

MenuTournamentBloc.displayName = "MenuTournamentBloc";
