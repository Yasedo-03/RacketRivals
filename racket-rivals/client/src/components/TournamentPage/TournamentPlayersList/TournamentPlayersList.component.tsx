import { FC, useLayoutEffect, useRef } from "react";
import { useTournament } from "../../../hooks/store/tournaments";
import { Loader } from "../../Loader";
import styles from "./TournamentPlayersList.module.scss";

interface TournamentPlayersListProps {
  isTournamentLoading: boolean;
}

export const TournamentPlayersList: FC<TournamentPlayersListProps> = ({
  isTournamentLoading,
}) => {
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

  if (isTournamentLoading) {
    return (
      <div className={styles.loaderCentered}>
        <Loader color="black" />
      </div>
    );
  }

  return (
    <div className={styles.container} ref={cardRef}>
      {tournament && tournament.participants ? (
        tournament.participants.length > 0 ? (
          tournament.participants.map((participant) => (
            <div className={styles.participantItem} key={participant._id}>
              <div className={styles.participantNameAndClub}>
                {participant.lastName} {participant.firstName}
                <span>{participant.club}</span>
              </div>
              <span>{participant.rank} pts</span>
            </div>
          ))
        ) : (
          <p>Aucun joueurs inscrit pour le moment</p>
        )
      ) : null}
    </div>
  );
};

TournamentPlayersList.displayName = "TournamentPlayersList";
