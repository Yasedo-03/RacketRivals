import { FC } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";

export const Login: FC = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles.container}>
      <FaArrowLeft onClick={() => goBack()} className={styles.backArrow} />
      <div className={styles["login-box"]}>
        <form>
          <div className={styles["user-box"]}>
            <input type="text" name="" required />
            <label>Identifiant</label>
          </div>
          <div className={styles["user-box"]}>
            <input type="password" name="" required />
            <label>Mot de passe</label>
          </div>
          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Connexion
          </a>
        </form>
        <Link className={styles.signupLink} to="/register">
          S'inscrire
        </Link>
      </div>
    </div>
  );
};
