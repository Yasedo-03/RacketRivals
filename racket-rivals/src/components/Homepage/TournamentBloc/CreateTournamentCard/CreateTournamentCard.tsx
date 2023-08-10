import { useLayoutEffect, useRef } from "react";
import { CreateTournamentForm } from "../../../CreateTournamentForm";
import styles from './CreateTournamentCard.module.scss';

export const CreateTournamentCard = () => {
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
      <CreateTournamentForm />
    </div>
  )
};

CreateTournamentCard.displayName = "CreateTournamentCard";


