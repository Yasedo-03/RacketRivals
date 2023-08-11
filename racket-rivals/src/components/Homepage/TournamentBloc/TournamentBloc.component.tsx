import { BlurDivider } from "../../BlurDivider";
import { ScrollDownArrows } from "../../ScrollArrows";
import { MenuTournamentBloc } from "./MenuTournamentBloc";
import { useLocation } from "react-router-dom";
import { TournamentCard } from "./TournamentCard";
import { CreateTournamentCard } from "./CreateTournamentCard";
import { CSSTransition } from "react-transition-group";
import styles from "./TournamentBloc.module.scss";
import "./TournamentBloc.scss";

type TournamentBlocProps = {
  index: number;
};

export const TournamentBloc = ({ index }: TournamentBlocProps) => {
  const location = useLocation();

  const isListPage = location.pathname === "/tournament/list";
  const isCreatePage = location.pathname === "/tournament/create";

  return (
    <div className={styles.tournamentbloc}>
      <BlurDivider position={"top"} />
      <MenuTournamentBloc />
      <div className={styles.container}>
        <CSSTransition
          in={location.pathname === "/tournament"}
          timeout={1000}
          classNames="fade"
          unmountOnExit
        >
          <div>
            <div className={`title ${styles.title}`}>
              Bienvenue dans l'espace Tournois de Tennis de Table
            </div>
            <div className={`text ${styles.text}`}>
              Envie de participer à un tournoi passionnant de tennis de table ?
              Parcourez la liste des événements à venir ou créez votre propre
              tournoi. Utilisez le menu ci-dessus pour commencer !
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={isListPage}
          timeout={800}
          classNames={"page-left"}
          unmountOnExit
        >
          <div className="page">
            <TournamentCard />
          </div>
        </CSSTransition>
        <CSSTransition
          in={isCreatePage}
          timeout={800}
          classNames={"page-right"}
          unmountOnExit
        >
          <div className="page">
            <CreateTournamentCard />
          </div>
        </CSSTransition>
      </div>
      <ScrollDownArrows index={index} />
      <BlurDivider />
    </div>
  );
};
