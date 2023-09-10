import { CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import { Page } from "../Homepage/TournamentSection";
import styles from "./AnimatedContainer.module.scss";
import "./AnimatedContainer.scss";

type AnimatedContainerProps = {
  pages: Page[];
};

export const AnimatedContainer = ({ pages }: AnimatedContainerProps) => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      {pages.map((page, index) => (
        <CSSTransition
          key={index}
          in={location.pathname === page.route}
          timeout={page.timeout}
          classNames={page.classNames}
          unmountOnExit
        >
          <div className="page">{page.component}</div>
        </CSSTransition>
      ))}
    </div>
  );
};
