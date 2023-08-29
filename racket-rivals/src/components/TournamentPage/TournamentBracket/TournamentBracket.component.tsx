import { FC, useLayoutEffect, useRef } from "react";
import { Ro16Bracket, Ro8Bracket } from "../../../templates";
import styles from "./TournamentBracket.module.scss";

export const TournamentBracket: FC = () => {
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
      <Ro8Bracket />
      {/* <Ro16Bracket /> */}
    </div>
  );
};

TournamentBracket.displayName = "TournamentBracket";
