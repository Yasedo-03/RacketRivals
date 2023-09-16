import { useLayoutEffect, useRef } from "react";
import { CreateTournamentForm } from "../../../CreateTournamentForm";
import styles from "./CreateTournamentCard.module.scss";
import { CreateTournamentFormModal } from "../../../Modals/ModalsContent";
import { ModalTemplate } from "../../../Modals";
import { useAppSelector } from "../../../../hooks/store/useStore";
import { RootState } from "../../../../store/store";

export const CreateTournamentCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const modalState = useAppSelector((state: RootState) => state.modals);

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
      {modalState && modalState.visible && (
        <ModalTemplate name={modalState.name} visible={modalState.visible}>
          {modalState.name === "contactFormModal" && (
            <CreateTournamentFormModal />
          )}
        </ModalTemplate>
      )}
      <CreateTournamentForm />
    </div>
  );
};

CreateTournamentCard.displayName = "CreateTournamentCard";
