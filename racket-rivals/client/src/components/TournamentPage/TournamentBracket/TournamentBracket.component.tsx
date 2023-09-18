import { FC, useLayoutEffect, useRef } from "react";
import { Ro16Bracket, Ro8Bracket } from "../../../templates";
import { useTournament } from "../../../hooks/store/tournaments";
import styles from "./TournamentBracket.module.scss";

export const TournamentBracket: FC = () => {
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
      {tournament?.number_of_participants === 8 && (
        <Ro8Bracket tournament={tournament} />
      )}
      {tournament?.number_of_participants === 16 && (
        <Ro16Bracket tournament={tournament} />
      )}
    </div>
  );
};

TournamentBracket.displayName = "TournamentBracket";
