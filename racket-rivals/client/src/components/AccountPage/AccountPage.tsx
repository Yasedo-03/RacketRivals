import { FC } from "react";
import { FaArrowLeft, FaPenToSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../../hooks/store/user";
import styles from "./AccountPage.module.scss";

export const Account: FC = () => {
  const me = useGetUser();
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className={styles.container}>
      <FaArrowLeft onClick={() => goBack()} className={styles.backArrow} />
      <div className={styles.card}>
        <div>
          <span>Nom :</span>
          <span className={styles.userInfos}>{me?.lastName}</span>
        </div>
        <div>
          <span>Prénom :</span>
          <span className={styles.userInfos}>{me?.firstName}</span>
        </div>
        <div>
          <span>Email :</span>
          <span className={styles.userInfos}>{me?.email}</span>
        </div>
        <div>
          <span>Mot de passe :</span>
          <span className={styles.userInfos}>
            *******
            <FaPenToSquare className={styles.editIcon} />
          </span>
        </div>
        <div>
          <span>Club :</span>
          <span className={styles.userInfos}>
            {me?.club}
            <FaPenToSquare className={styles.editIcon} />
          </span>
        </div>
        <div>
          <span>Classement :</span>
          <span className={styles.userInfos}>
            {me?.rank}
            <FaPenToSquare className={styles.editIcon} />
          </span>
        </div>
      </div>
    </div>
  );
};
