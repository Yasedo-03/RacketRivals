import { FC, useLayoutEffect, useRef } from "react";
import { useTournament } from "../../../hooks/store/tournaments";
import styles from "./TournamentPlayersList.module.scss";

export const TournamentPlayersList: FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const tournament = useTournament();

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
      {tournament &&
        tournament.participants &&
        tournament.participants.map((participant) => (
          <div className={styles.participantItem} key={participant._id}>
            <div className={styles.participantNameAndClub}>
              {participant.lastName} {participant.firstName}
              <span>{participant.club}</span>
            </div>
            <span>{participant.rank} pts</span>
          </div>
        ))}
    </div>
  );
};

TournamentPlayersList.displayName = "TournamentPlayersList";
