/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, useEffect, useLayoutEffect, useRef } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useGetTournamentQuery } from "../../../services/tournaments/endpoints";
import { ITournament } from "../../../services/tournaments/interfaces/tournamentInterface";
import { useGetUser } from "../../../hooks/store/user";
import { useParams } from "react-router-dom";
import { Loader } from "../../Loader";
import { useTournamentLogic } from "./hooks/useTournamentLogic";
import styles from "./TournamentDetails.module.scss";
interface TournamentDetailsProps {
  isTournamentLoading: boolean;
}

export const TournamentHeader: FC<{
  tournament: ITournament;
  formattedStartTournamentDate: string;
}> = ({ tournament, formattedStartTournamentDate }) => {
  return (
    <>
      <h1 className={styles.name}>{tournament.name}</h1>
      <p
        className={styles.date}
      >{`${formattedStartTournamentDate} à ${tournament.start_hour}`}</p>
      <p className={styles.location}>{tournament.location}</p>
      <div>
        <p className={styles.format}>Format: {tournament.format}</p>
        <p className={styles.nbPlayers}>
          {tournament.number_of_participants} joueurs
        </p>
      </div>
      <p className={styles.accesibility}>{tournament.accesibility}</p>
      <p className={styles.prize}>Prize Money: {tournament.price}€</p>
      <p className={styles.description}>{tournament.description}</p>
    </>
  );
};

export const RegistrationButton: FC<{
  handleSubmit: () => void;
  buttonSubmitLabel: string;
  isUserRegistered: boolean;
}> = ({ handleSubmit, buttonSubmitLabel, isUserRegistered }) => {
  return (
    <button
      onClick={handleSubmit}
      className={styles.registrationTournament}
      type="submit"
      disabled={isUserRegistered}
    >
      {buttonSubmitLabel}
    </button>
  );
};

export const CancelButton: FC<{ handleCancel: () => void }> = ({
  handleCancel,
}) => {
  return (
    <span onClick={handleCancel} className={styles.cancel}>
      Annuler
    </span>
  );
};

export const GenerateTreeButton: FC<{ handleGenerate: () => void }> = ({
  handleGenerate,
}) => {
  return (
    <button
      onClick={handleGenerate}
      className={styles.generateTournament}
      type="submit"
    >
      Générer l'arbre
    </button>
  );
};

export const TournamentDetails: FC<TournamentDetailsProps> = ({
  isTournamentLoading,
}) => {
  const { tournamentId } = useParams();
  const { data: tournament } = useGetTournamentQuery({ tournamentId });
  const me = useGetUser();
  const cardRef = useRef<HTMLDivElement>(null);

  const {
    buttonSubmitLabel,
    isUserRegistered,
    handleCancel,
    handleSubmit,
    handleGenerate,
    formattedStartTournamentDate,
    setIsUserOrganizer,
    setIsUserRegistered,
    setFormattedStartTournamentDate,
    setRegisterToTournamentBody,
    isUnregisterSuccess,
    isRegisterSuccess,
    isUserOrganizer,
    checkIfUserIsRegistered,
  } = useTournamentLogic(tournament, me);

  useEffect(() => {
    if (tournament && me) {
      me._id === tournament.organizer?._id
        ? setIsUserOrganizer(true)
        : setIsUserOrganizer(false);
      setIsUserRegistered(checkIfUserIsRegistered(tournament));
      setRegisterToTournamentBody({
        tournamentId: tournament._id,
        userId: me._id,
      });

      if (tournament.start_date && !formattedStartTournamentDate) {
        setFormattedStartTournamentDate(
          format(new Date(tournament.start_date), "dd MMMM yyyy", {
            locale: fr,
          })
        );
      }
    }
  }, [tournament, isRegisterSuccess, isUnregisterSuccess, me]);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add(styles.containerInPlace);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [tournament]);

  if (isTournamentLoading) {
    return (
      <div className={styles.loaderCentered}>
        <Loader color="black" />
      </div>
    );
  }

  return (
    <div className={styles.details} ref={cardRef}>
      {tournament && (
        <>
          <TournamentHeader
            tournament={tournament}
            formattedStartTournamentDate={formattedStartTournamentDate}
          />
          <RegistrationButton
            handleSubmit={handleSubmit}
            buttonSubmitLabel={buttonSubmitLabel}
            isUserRegistered={isUserRegistered}
          />
          {isUserRegistered && !isUserOrganizer && (
            <CancelButton handleCancel={handleCancel} />
          )}
          {isUserOrganizer && (
            <GenerateTreeButton handleGenerate={handleGenerate} />
          )}
          <span className={styles.codeTournament}>{tournament.uniqueCode}</span>
        </>
      )}
    </div>
  );
};

TournamentDetails.displayName = "TournamentDetails";
