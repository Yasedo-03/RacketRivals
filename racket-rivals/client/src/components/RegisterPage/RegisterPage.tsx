import { FC, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RegisterInput } from "../../services/auth/interfaces/authInterfaces";
import { useRegisterUserMutation } from "../../services/auth/endpoints";
import styles from "./RegisterPage.module.scss";

export const Register: FC = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [registerUser, { isSuccess }] = useRegisterUserMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess]);

  const [formRegister, setFormRegister] = useState<RegisterInput>({
    email: "",
    firstName: "",
    lastName: "",
    club: "",
    rank: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      await registerUser(formRegister).unwrap();
    } catch (err) {
      console.log("Erreur lors de l'inscription:", err);
    }
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormRegister((prev) => ({ ...prev, [name]: value }));

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
              type="text"
              name="firstName"
              required
            />
            <label>Prénom</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              onChange={handleChange}
              type="text"
              name="lastName"
              required
            />
            <label>Nom</label>
          </div>
          <div className={styles["user-box"]}>
            <input onChange={handleChange} type="text" name="club" />
            <label>Club</label>
          </div>
          <div className={styles["user-box"]}>
            <input onChange={handleChange} type="text" name="rank" />
            <label>Classement</label>
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
          <a onClick={handleSubmit} href="#">
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
