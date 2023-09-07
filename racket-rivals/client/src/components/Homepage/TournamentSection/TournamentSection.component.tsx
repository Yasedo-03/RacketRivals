import { BlurDivider } from "../../BlurDivider";
import { ScrollArrows } from "../../ScrollArrows";
import { TournamentCard } from "./TournamentCard";
import { CreateTournamentCard } from "./CreateTournamentCard";
import { MenuNavigationSection } from "../../MenuNavigationSection";
import { AnimatedContainer } from "../../AnimatedContainer";
import {
  useGetMyTournamentsQuery,
  useGetTournamentsQuery,
} from "../../../services/tournaments/endpoints";
import "./TournamentSection.scss";
import styles from "./TournamentSection.module.scss";

type TournamentSectionProps = {
  index: number;
};

export enum labelsMenuTournamentNavigation {
  SEARCH_TOURNAMENT = "Trouver un tournoi",
  CREATE_TOURNAMENT = "Créer un tournoi",
}

enum TOURNAMENT_ROUTES {
  LIST = "/tournaments/list",
  CREATE = "/tournaments/create",
}

export type Page = {
  component: React.ReactNode;
  route: string;
  timeout: number;
  classNames: string;
};

export const TournamentSection = ({ index }: TournamentSectionProps) => {
  useGetTournamentsQuery();
  useGetMyTournamentsQuery();

  const menuItems = [
    {
      label: labelsMenuTournamentNavigation.SEARCH_TOURNAMENT,
      to: TOURNAMENT_ROUTES.LIST,
    },
    {
      label: labelsMenuTournamentNavigation.CREATE_TOURNAMENT,
      to: TOURNAMENT_ROUTES.CREATE,
    },
  ];

  const pages = [
    {
      component: (
        <div>
          <div className={`title ${styles.title}`}>
            Bienvenue dans l'espace Tournois de RacketRivals
          </div>
          <div className={`text ${styles.text}`}>
            Envie de participer à un tournoi passionnant de tennis de table ?
            Parcourez la liste des événements à venir ou créez votre propre
            tournoi. Utilisez le menu ci-dessus pour commencer !
          </div>
        </div>
      ),
      route: "/tournament",
      timeout: 1000,
      classNames: "fade",
    },
    {
      component: <TournamentCard />,
      route: TOURNAMENT_ROUTES.LIST,
      timeout: 800,
      classNames: "page-left",
    },
    {
      component: <CreateTournamentCard />,
      route: TOURNAMENT_ROUTES.CREATE,
      timeout: 800,
      classNames: "page-right",
    },
  ];

  return (
    <div className={styles.tournamentbloc}>
      <BlurDivider position={"top"} />
      <MenuNavigationSection items={menuItems} />
      <AnimatedContainer pages={pages} />
      <ScrollArrows index={index} />
      <BlurDivider />
    </div>
  );
};
