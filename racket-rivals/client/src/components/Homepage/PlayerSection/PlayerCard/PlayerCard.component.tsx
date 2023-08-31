import { useLayoutEffect, useRef } from "react";
import styles from "./PlayerCard.module.scss";

export const PlayerCard = () => {
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
    <div className={styles.container} ref={cardRef}>
      <h1 className={styles.fullName}>John Doe</h1>
      <p className={styles.rank}>
        Classement <span className={styles.greenBorder}>1200</span>
      </p>
      <div className={styles.tournamentStats}>
        <h2 className={styles.tournamentStatsTitle}>Tournois</h2>
        <p className={styles.tournamentWin}>
          Victoires <span className={styles.greenBorder}>3</span>
        </p>
      </div>
      <div className={styles.matchStatsContainer}>
        <h2 className={styles.matchStatsTitle}>Matchs</h2>
        <div className={styles.matchStats}>
          <div className={styles.matchStatsWin}>
            <h3>Victoires</h3>
            <span className={styles.greenBorder}>50</span>
          </div>
          <div className={styles.matchStatsLost}>
            <h3>Défaites</h3>
            <span className={styles.redBorder}>50</span>
          </div>
        </div>
        <div className={styles.winrate}>
          <h3>Winrate</h3>
          <span className={styles.greenBorder}>50</span>
        </div>
      </div>
    </div>
  );
};

PlayerCard.displayName = "PlayerCard";
