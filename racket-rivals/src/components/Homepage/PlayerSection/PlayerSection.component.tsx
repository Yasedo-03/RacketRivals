import { AnimatedContainer } from "../../AnimatedContainer";
import { BlurDivider } from "../../BlurDivider";
import { MenuNavigationSection } from "../../MenuNavigationSection";
import { ScrollArrows, ScrollArrowsDirection } from "../../ScrollArrows";
import styles from "./PlayerSection.module.scss";
import { PlayerCard } from "./PlayerCard";
import { SearchPlayerCard } from "./SearchPlayerCard";

type PlayerSectionProps = {
  index: number;
};

export enum labelsMenuPlayerNavigation {
  SEARCH_PLAYER = "Trouver un joueur",
  MY_PROFIL = "Mon profil",
}

enum PLAYER_ROUTES {
  LIST = "/player/list",
  ME = "/player/me",
}

export const PlayerSection = ({ index }: PlayerSectionProps) => {
  const menuItems = [
    { label: labelsMenuPlayerNavigation.SEARCH_PLAYER, to: PLAYER_ROUTES.LIST },
    { label: labelsMenuPlayerNavigation.MY_PROFIL, to: PLAYER_ROUTES.ME },
  ];

  const pages = [
    {
      component: (
        <div>
          <div className={`title ${styles.title}`}>
            Bienvenue dans l'espace Joueur de RacketRivals
          </div>
          <div className={`text ${styles.text}`}>
            Suivez vos performances, analysez vos victoires et défaites, et
            découvrez les joueurs qui partagent votre passion. Que vous soyez un
            compétiteur sérieux ou un joueur amateur, cet espace est fait pour
            vous.
          </div>
        </div>
      ),
      route: "/player",
      timeout: 1000,
      classNames: "fade",
    },
    {
      component: <PlayerCard />,
      route: PLAYER_ROUTES.ME,
      timeout: 800,
      classNames: "page-right",
    },
    {
      component: <SearchPlayerCard />,
      route: PLAYER_ROUTES.LIST,
      timeout: 800,
      classNames: "page-left",
    },
  ];

  return (
    <div className={styles.playerSection}>
      <BlurDivider position={"top"} />
      <MenuNavigationSection items={menuItems} />
      <AnimatedContainer pages={pages} />
      <ScrollArrows
        index={index}
        scrollArrowsDirection={ScrollArrowsDirection.TOP}
      />
      <BlurDivider />
    </div>
  );
};

PlayerSection.displayName = "PlayerSection";
