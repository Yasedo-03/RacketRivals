import { FC, useLayoutEffect, useRef } from "react";
import styles from "./TournamentDetails.module.scss";

export const TournamentDetails: FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add(styles.containerInPlace);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.details} ref={cardRef}>
      <h1 className={styles.name}>Spring Championship</h1>
      <p className={styles.date}>28 Aout 2023 à 19h30</p>
      <p className={styles.location}>New York</p>
      <div>
        <p className={styles.format}>Format: Round Robin</p>
        <p className={styles.nbPlayers}>16 joueurs</p>
      </div>
      <p className={styles.accesibility}>Public</p>
      <p className={styles.prize}>Prize Money: 5€</p>
      <p className={styles.description}>
        Annual Spring Championship for table tennis enthusiasts
      </p>
      <button className={styles.registrationTournament} type="submit">
        S'inscrire
      </button>
    </div>
  );
};

TournamentDetails.displayName = "TournamentDetails";
