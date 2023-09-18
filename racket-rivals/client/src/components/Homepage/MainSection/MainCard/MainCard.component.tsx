import { useNavigate } from "react-router-dom";
import { useAuthStatus, useGetToken } from "../../../../hooks/store/user";
import { useAppDispatch } from "../../../../hooks/store/useStore";
import { logout } from "../../../../store/slice/auth";
import { useLogoutMutation } from "../../../../services/auth/endpoints";
import styles from "./MainCard.module.scss";

export const MainCard = () => {
  const navigate = useNavigate();
  const isLogged = useAuthStatus();
  const dispatch = useAppDispatch();
  const [logoutMutation] = useLogoutMutation();

  const handleClickLoggin = async (isLogged: boolean) => {
    if (isLogged) {
      try {
        await logoutMutation(null).unwrap();
        dispatch(logout());
      } catch (error) {
        console.error("Erreur lors de la déconnexion : ", error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={styles.mainCard}>
      <h1 className={styles.title}>Bienvenue sur RacketRivals</h1>
      <p className={styles.text}>
        Votre espace pour organiser et trouver des tournois de tennis de table.
      </p>
      <p className={styles.text}>Rejoignez la compétition en quelques clics.</p>
      <button
        className={styles.loginButton}
        onClick={() => handleClickLoggin(isLogged)}
        type="button"
      >
        {isLogged ? "Déconnexion" : "Connexion"}
      </button>
    </div>
  );
};

MainCard.displayName = "MainCard";
