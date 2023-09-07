import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTournament } from "../../../hooks/store/tournaments";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  useRegisterToTournamentMutation,
  useUnregisterToTournamentMutation,
} from "../../../services/tournaments/endpoints";
import {
  ITournament,
  RegisterToTournamentBody,
} from "../../../services/tournaments/interfaces/tournamentInterface";
import { useGetUser } from "../../../hooks/store/user";
import { useNavigate } from "react-router-dom";
import styles from "./TournamentDetails.module.scss";

export const TournamentDetails: FC = () => {
  const navigate = useNavigate();
  const [registerToTournamentBody, setRegisterToTournamentBody] =
    useState<RegisterToTournamentBody>({
      tournamentId: null,
      userId: null,
    });
  const [formattedStartTournamentDate, setFormattedStartTournamentDate] =
    useState<string>("");
  const [isUserRegistered, setIsUserRegistered] = useState<boolean>(false);
  const [registerToTournament, { isSuccess: isRegisterSuccess }] =
    useRegisterToTournamentMutation();
  const [unregisterToTournament, { isSuccess: isUnregisterSuccess }] =
    useUnregisterToTournamentMutation();
  const me = useGetUser();
  const cardRef = useRef<HTMLDivElement>(null);
  const tournament = useTournament();
  const buttonLabel =
    isUserRegistered || isRegisterSuccess ? "Inscrit" : "S'inscrire";
  const buttonDisabled = isUserRegistered || isRegisterSuccess;

  const checkIfUserIsRegistered = (tournament: ITournament): boolean => {
    return (
      tournament.participants?.some(
        (participant) => participant._id === me?._id
      ) || false
    );
  };

  useEffect(() => {
    if (tournament && me) {
      setIsUserRegistered(checkIfUserIsRegistered(tournament));
      setRegisterToTournamentBody({
        tournamentId: tournament?._id,
        userId: me?._id,
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
  }, []);

  const handleSubmit = async () => {
    try {
      if (!me) {
        navigate("/login");
      }
      await registerToTournament(registerToTournamentBody).unwrap();
      setIsUserRegistered(true);
    } catch (err) {
      console.log("Erreur lors de l'inscription:", err);
    }
  };

  const handleCancel = async () => {
    try {
      await unregisterToTournament(registerToTournamentBody).unwrap();
      setIsUserRegistered(false);
    } catch (err) {
      console.log("Erreur lors de l'annulation de l'inscription:", err);
    }
  };

  return (
    <div className={styles.details} ref={cardRef}>
      {tournament && (
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
          <button
            onClick={handleSubmit}
            className={styles.registrationTournament}
            type="submit"
            disabled={buttonDisabled}
          >
            {buttonLabel}
          </button>
          {isUserRegistered && (
            <span onClick={handleCancel} className={styles.cancel}>
              Annuler
            </span>
          )}
          <span className={styles.codeTournament}>{tournament.uniqueCode}</span>
        </>
      )}
    </div>
  );
};

TournamentDetails.displayName = "TournamentDetails";
