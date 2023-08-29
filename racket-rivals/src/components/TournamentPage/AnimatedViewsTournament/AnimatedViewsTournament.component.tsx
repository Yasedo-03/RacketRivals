import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import { TOURNAMENT_VIEWS_ROUTES, Views } from "../TournamentPage";
import "./AnimatedViewsTournament.scss";
import styles from "./AnimatedViewsTournament.module.scss";

type AnimatedViewsTournamentProps = {
  views: Views[];
};

export const AnimatedViewsTournament = ({
  views,
}: AnimatedViewsTournamentProps) => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      {views.map((view, index) => (
        <CSSTransition
          key={index}
          in={location.pathname === view.route}
          timeout={view.timeout}
          classNames="views"
          unmountOnExit
        >
          <div
            className={
              view.route === TOURNAMENT_VIEWS_ROUTES.BRACKET
                ? `${styles.views} ${styles.bracketView}`
                : styles.views
            }
          >
            {view.component}
          </div>
        </CSSTransition>
      ))}
    </div>
  );
};

AnimatedViewsTournament.displayName = "AnimatedViewsTournament";
