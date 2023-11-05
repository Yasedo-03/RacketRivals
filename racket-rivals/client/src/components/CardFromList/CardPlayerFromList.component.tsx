/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-empty-function */
import { FC } from "react";
import { AiFillEye } from "react-icons/ai";
import logoPlayer from "../../assets/img/logo_player_card.png";
import { User } from "../../services/users/interfaces/usersInterfaces";
import styles from "./CardFromList.module.scss";

interface PlayerCardFromListProps {
  player: User;
}

export const CardPlayerFromList: FC<PlayerCardFromListProps> = ({ player }) => {
  return (
    <div className={styles.cardPlayer}>
      <img src={logoPlayer} alt="logo player" className={styles.logo} />
      <div className={styles.details}>
        <span className={styles.date}>{player.club}</span>
        <h1>
          {player.lastName} {player.firstName}
        </h1>
        <span className={styles.rank}>{player.rank}</span>
      </div>
      <div className={styles.hoverInfo}>
        <AiFillEye className={styles.eyeLogo} />
      </div>
    </div>
  );
};

CardPlayerFromList.displayName = "CardPlayerFromList";
