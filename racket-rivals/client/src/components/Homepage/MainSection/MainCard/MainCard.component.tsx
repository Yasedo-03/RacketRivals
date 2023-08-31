import { useNavigate } from "react-router-dom";
import styles from "./MainCard.module.scss";

export const MainCard = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.mainCard}>
      <h1 className={styles.title}>Bienvenue sur RacketRivals</h1>
      <p className={styles.text}>
        Votre espace pour organiser et trouver des tournois de tennis de table.
      </p>
      <p className={styles.text}>Rejoignez la compétition en quelques clics.</p>
      <button
        className={styles.loginButton}
        onClick={() => navigate("/login")}
        type="button"
      >
        Connexion
      </button>
    </div>
  );
};

MainCard.displayName = "MainCard";
