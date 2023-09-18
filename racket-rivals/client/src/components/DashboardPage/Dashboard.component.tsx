import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useGetTournamentQuery } from "../../services/tournaments/endpoints";
import { Ro8Board } from "./Ro8Board";
import styles from "./Dashboard.module.scss";

export const Dashboard: FC = () => {
  const { tournamentId } = useParams();
  const { data: tournament } = useGetTournamentQuery({ tournamentId });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <FaArrowLeft onClick={() => goBack()} className={styles.backArrow} />
      <h1 className={styles.title}>Gérer votre tournoi ici</h1>
      {tournament?.number_of_participants === 8 && (
        <Ro8Board tournament={tournament} />
      )}
    </div>
  );
};

Dashboard.displayName = "Dashboard";
