/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/store/useStore";
import { LoginRequest } from "../../services/auth/interfaces/authInterfaces";
import { authenticateAndFetchUser } from "../../services/auth/authThunk";
import styles from "./LoginPage.module.scss";

export const Login: FC = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const action = await dispatch(authenticateAndFetchUser(formState));

      if (authenticateAndFetchUser.fulfilled.match(action)) {
        navigate("/");
      }
    } catch (err) {
      console.log("Erreur lors de la connexion:", err);
    }
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  return (
    <div className={styles.container}>
      <FaArrowLeft onClick={() => goBack()} className={styles.backArrow} />
      <div className={styles["login-box"]}>
        <form>
          <div className={styles["user-box"]}>
            <input
              onChange={handleChange}
              type="text"
              name="email"
              required
              autoComplete="off"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              required
            />
            <label htmlFor="password">Mot de passe</label>
          </div>
          <a onClick={handleLogin} href="#">
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
