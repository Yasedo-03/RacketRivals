import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { MenuNavigationTournament } from "./MenuNavigationTournament";
import { TournamentDetails } from "./TournamentDetails";
import { AnimatedViewsTournament } from "./AnimatedViewsTournament";
import { TournamentPlayersList } from "./TournamentPlayersList";
import { TournamentBracket } from "./TournamentBracket";
import { useGetTournamentQuery } from "../../services/tournaments/endpoints";
import { useGetMatchsQuery } from "../../services/matchs/endpoints";
import styles from "./TournamentPage.module.scss";

export enum labelsMenuTournamentPageNavigation {
  DETAILS = "Informations",
  BRACKET = "Tableau",
  PLAYERS_LIST = "Liste des joueurs",
}

export type Views = {
  component?: React.ReactNode;
  route: string;
  timeout: number;
};

export const Tournament: FC = () => {
  const { tournamentId } = useParams();

  const getTournamentRoutes = (tournamentId: string | undefined) => {
    return {
      DETAILS: `/tournament/${tournamentId}/details`,
      BRACKET: `/tournament/${tournamentId}/bracket`,
      PLAYERS_LIST: `/tournament/${tournamentId}/players_list`,
    };
  };

  const tournamentRoutes = getTournamentRoutes(tournamentId);
  const { data: tournament } = useGetTournamentQuery({ tournamentId });
  useGetMatchsQuery({ tournamentId });

  const navItems = [
    {
      label: labelsMenuTournamentPageNavigation.DETAILS,
      path: tournamentRoutes.DETAILS,
    },
    {
      label: labelsMenuTournamentPageNavigation.BRACKET,
      path: tournamentRoutes.BRACKET,
    },
    {
      label: labelsMenuTournamentPageNavigation.PLAYERS_LIST,
      path: tournamentRoutes.PLAYERS_LIST,
    },
  ];

  const views = [
    {
      component: <TournamentDetails />,
      route: tournamentRoutes.DETAILS,
      timeout: 800,
    },
    {
      component: <TournamentBracket />,
      route: tournamentRoutes.BRACKET,
      timeout: 800,
    },
    {
      component: <TournamentPlayersList />,
      route: tournamentRoutes.PLAYERS_LIST,
      timeout: 800,
    },
  ];

  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <header>
        <FaArrowLeft onClick={() => goBack()} className={styles.backArrow} />
        <h1>{tournament?.name}</h1>
      </header>
      <MenuNavigationTournament navItems={navItems} />
      <AnimatedViewsTournament
        tournamentRoutes={tournamentRoutes}
        views={views}
      />
    </div>
  );
};
