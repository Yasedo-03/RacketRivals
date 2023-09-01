import { FC, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/store/useStore";
import { LoginRequest } from "../../services/users/interfaces/usersInterfaces";
import { useLoginMutation } from "../../services/users/endpoints";
import { setCredentials } from "../../store/slice/slice";
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

  const [login, { isLoading }] = useLoginMutation();

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
            <input onChange={handleChange} type="text" name="email" required />
            <label>Email</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              required
            />
            <label>Mot de passe</label>
          </div>
          <a
            onClick={async () => {
              try {
                const result = await login(formState);

                if ("data" in result && result.data) {
                  dispatch(setCredentials(result.data));
                  navigate("/");
                }
              } catch (err) {
                console.log(err);
              }
            }}
            href="#"
          >
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
