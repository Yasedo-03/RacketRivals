import { FC, useLayoutEffect, useRef } from "react";
import { Ro16Bracket, Ro8Bracket } from "../../../templates";
import { useTournament } from "../../../hooks/store/tournaments";
import { Loader } from "../../Loader";
import styles from "./TournamentBracket.module.scss";
interface TournamentBracketProps {
  isTournamentLoading: boolean;
}

export const TournamentBracket: FC<TournamentBracketProps> = ({
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
