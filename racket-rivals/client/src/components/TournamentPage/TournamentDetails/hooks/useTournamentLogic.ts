import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useLaunchEliminationTournamentMutation,
  useRegisterToTournamentMutation,
  useUnregisterToTournamentMutation,
} from "../../../../services/tournaments/endpoints";
import { ITournament } from "../../../../services/tournaments/interfaces/tournamentInterface";
import { User } from "../../../../services/users/interfaces/usersInterfaces";

export const useTournamentLogic = (
  tournament?: ITournament,
  me?: User | null
) => {
  const navigate = useNavigate();
  const [buttonSubmitLabel, setButtonSubmitLabel] = useState("");
  const [registerToTournamentBody, setRegisterToTournamentBody] = useState<{
    tournamentId: string | null;
    userId: string | null;
  }>({ tournamentId: null, userId: null });
  const [formattedStartTournamentDate, setFormattedStartTournamentDate] =
    useState("");
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [isUserOrganizer, setIsUserOrganizer] = useState(false);
  const [registerToTournament, { isSuccess: isRegisterSuccess }] =
    useRegisterToTournamentMutation();
  const [unregisterToTournament, { isSuccess: isUnregisterSuccess }] =
    useUnregisterToTournamentMutation();
  const [
    launchEliminationTournamentMutation,
    { isSuccess: isTournamentLaunched },
  ] = useLaunchEliminationTournamentMutation();

  const checkIfUserIsRegistered = (tournament: ITournament): boolean => {
    return (
      tournament.participants?.some(
        (participant) => participant._id === me?._id
      ) || false
    );
  };

  useEffect(() => {
    const label = isUserOrganizer
      ? "Dashboard"
      : isUserRegistered || isRegisterSuccess
      ? "Déjà inscrit"
      : "S'inscrire";
    setButtonSubmitLabel(label);
  }, [isUserRegistered, isRegisterSuccess, isUserOrganizer]);

  const handleSubmit = async () => {
    if (!me) navigate("/login");
    if (isUserOrganizer) navigate(`/dashboard/${tournament?._id}`);
    else {
      await registerToTournament(registerToTournamentBody).unwrap();
      setIsUserRegistered(true);
    }
  };

  const handleCancel = async () => {
    await unregisterToTournament(registerToTournamentBody).unwrap();
    setIsUserRegistered(false);
  };

  const handleGenerate = async () => {
    if (
      tournament &&
      tournament?.participants?.length === tournament?.number_of_participants
    ) {
      await launchEliminationTournamentMutation({
        tournamentId: tournament._id,
      }).unwrap();
    }
  };

  return {
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
    isRegisterSuccess,
    isUnregisterSuccess,
    isUserOrganizer,
    checkIfUserIsRegistered,
  };
};
