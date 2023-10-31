/* eslint-disable @typescript-eslint/no-empty-function */
import { FC } from "react";
import { AiFillEye } from "react-icons/ai";
import { ITournament } from "../../services/tournaments/interfaces/tournamentInterface";
import { format } from "date-fns";
import logoTournament from "../../assets/img/logo_tournament_card.png";
import styles from "./CardFromList.module.scss";

interface TournamentCardFromListProps {
  tournament: ITournament;
}

export const CardFromList: FC<TournamentCardFromListProps> = ({
  tournament,
}) => {
  return (
    <div className={styles.card}>
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
        <AiFillEye className={styles.eyeLogo} />
      </div>
    </div>
  );
};

CardFromList.displayName = "CardFromList";
