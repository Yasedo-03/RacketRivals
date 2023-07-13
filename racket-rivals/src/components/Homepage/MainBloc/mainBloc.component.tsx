import { ScrollDownArrows } from "../../ScrollArrows";
import styles from "./MainBloc.module.scss";

type MainBlocPros = {
  index: number;
};

export const MainBloc = ({ index }: MainBlocPros) => {
  return (
    <div className={styles.bloc}>
      <div className={styles.mainCard}>
        <h1 className={styles.title}>Bienvenue sur RacketRivals</h1>
        <p className={styles.text}>
          Votre espace pour organiser et trouver des tournois de tennis de
          table.
        </p>
        <p className={styles.text}>
          Rejoignez la compétition en quelques clics. Prêts à relever le défi?
        </p>
        <button className={styles.loginButton} type="button">
          Connexion
        </button>
      </div>
      <ScrollDownArrows index={index} />
    </div>
  );
};

MainBloc.displayName = "MainBloc";
