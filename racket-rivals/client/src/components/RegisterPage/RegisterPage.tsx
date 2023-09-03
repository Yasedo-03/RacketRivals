import { FC } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.scss";

export const Register: FC = () => {
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
            <input type="text" name="email" required />
            <label>Email</label>
          </div>
          <div className={styles["user-box"]}>
            <input type="text" name="firstname" required />
            <label>Prénom</label>
          </div>
          <div className={styles["user-box"]}>
            <input type="text" name="lastname" required />
            <label>Nom</label>
          </div>
          <div className={styles["user-box"]}>
            <input type="text" name="club" required />
            <label>Club</label>
          </div>
          <div className={styles["user-box"]}>
            <input type="text" name="rank" />
            <label>Classement</label>
          </div>
          <div className={styles["user-box"]}>
            <input type="password" name="password" required />
            <label>Mot de passe</label>
          </div>
          <a href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            S'inscrire
          </a>
        </form>
      </div>
    </div>
  );
};
