import { BlurDivider } from "../../BlurDivider";
import { ScrollDownArrows } from "../../ScrollArrows";
import { MenuTournamentBloc } from "./MenuTournamentBloc";
import { useLocation } from "react-router-dom";
import { MyTournamentBlocCard } from "./MyTournamentBlocCard";
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
        <CSSTransition in={isListPage} timeout={800} classNames={'page-left'} unmountOnExit>
          <div className="page pageL">
            <MyTournamentBlocCard />
          </div>
        </CSSTransition>
        <CSSTransition in={isCreatePage} timeout={800} classNames={'page-right'} unmountOnExit>
          <div className="page pageR">
            <CreateTournamentCard />
          </div>
        </CSSTransition>
      </div>
      <ScrollDownArrows index={index} />
      <BlurDivider />
    </div>
  );
};
