/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-empty-function */
import { FC, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { ITournament } from "../../services/tournaments/interfaces/tournamentInterface";
import { format } from "date-fns";
import logoTournament from "../../assets/img/logo_tournament_card.png";
import { Link } from "react-router-dom";
import styles from "./CardFromList.module.scss";

interface TournamentCardFromListProps {
  tournament: ITournament;
  isLaptop: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  setSelectedTournamentId?: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CardFromList: FC<TournamentCardFromListProps> = ({
  tournament,
  isLaptop,
  onClick,
}) => {
  const [isActive, setIsActive] = useState(false);
  const handleCardClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className={`${styles.card} ${isActive ? styles.active : ""} `}
      onClick={() => {
        if (onClick) {
          onClick();
        }
        handleCardClick();
      }}
    >
      <img src={logoTournament} alt="logo tournament" className={styles.logo} />
      <div className={styles.details}>
        <span className={styles.date}>
          {format(new Date(tournament.start_date), "dd/MM/yyyy")}
        </span>
        <h1>{tournament.name}</h1>
      </div>
      <div className={styles.hoverInfo}>
        <span className={styles.dateHover}>
          {format(new Date(tournament.start_date), "dd/MM/yyyy")}
        </span>
        <h1>{tournament.name}</h1>
        <span>{tournament.location}</span>
        <span>{tournament.number_of_participants} joueurs</span>
        <span>{tournament.uniqueCode}</span>
        {isLaptop ? (
          <AiFillEye className={styles.eyeLogo} />
        ) : (
          <Link
            key={tournament._id}
            to={`/tournament/${tournament._id}/details`}
          >
            <AiFillEye className={styles.eyeLogo} />
          </Link>
        )}
      </div>
    </div>
  );
};

CardFromList.displayName = "CardFromList";
