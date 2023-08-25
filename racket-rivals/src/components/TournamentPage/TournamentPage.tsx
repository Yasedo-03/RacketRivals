import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { MenuNavigationTournament } from "./MenuNavigationTournament";
import { TournamentDetails } from "./TournamentDetails";
import styles from "./TournamentPage.module.scss";
import { AnimatedViewsTournament } from "./AnimatedViewsTournament";

export enum labelsMenuTournamentPageNavigation {
  DETAILS = "Informations",
  BRACKET = "Tableau",
  PLAYERS_LIST = "Liste des joueurs",
}

enum TOURNAMENT_VIEWS_ROUTES {
  DETAILS = "/tournament/1/details",
  BRACKET = "/tournament/1/bracket",
  PLAYERS_LIST = "/tournament/1/players/list",
}

export type Views = {
  component?: React.ReactNode;
  route: string;
  timeout: number;
};

export const Tournament: FC = () => {
  const navItems = [
    {
      label: labelsMenuTournamentPageNavigation.DETAILS,
      path: TOURNAMENT_VIEWS_ROUTES.DETAILS,
    },
    {
      label: labelsMenuTournamentPageNavigation.BRACKET,
      path: TOURNAMENT_VIEWS_ROUTES.BRACKET,
    },
    {
      label: labelsMenuTournamentPageNavigation.PLAYERS_LIST,
      path: TOURNAMENT_VIEWS_ROUTES.PLAYERS_LIST,
    },
  ];

  const views = [
    {
      component: <TournamentDetails />,
      route: TOURNAMENT_VIEWS_ROUTES.DETAILS,
      timeout: 800,
    },
    {
      // component: <TournamentCard />,
      route: TOURNAMENT_VIEWS_ROUTES.BRACKET,
      timeout: 800,
    },
    {
      // component: <CreateTournamentCard />,
      route: TOURNAMENT_VIEWS_ROUTES.PLAYERS_LIST,
      timeout: 800,
    },
  ];
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.container}>
      <header>
        <FaArrowLeft onClick={() => goBack()} className={styles.backArrow} />
        <h1>Nom du tournoi</h1>
      </header>
      <MenuNavigationTournament navItems={navItems} />
      <AnimatedViewsTournament views={views} />
    </div>
  );
};
