import { FC } from "react";
import { TournamentListViews } from "../TournamentCard";
import { Link } from "react-router-dom";
import {
  useMyTournaments,
  useTournaments,
} from "../../../../hooks/store/tournaments";
import { ITournament } from "../../../../services/tournaments/interfaces/tournamentInterface";
import { useGetUser } from "../../../../hooks/store/user";
import { NotLogged } from "../../../NotLogged";
import { useAppSelector } from "../../../../hooks/store/useStore";
import styles from "./TournamentList.module.scss";

export const TournamentList: FC = () => {
  const me = useGetUser();
  const tournaments = useTournaments();
  const myTournaments = useMyTournaments();
  const currentView = useAppSelector(
    (state) => state.tournamentView.currentView
  );

  const tournamentListToMap: Array<ITournament> | null =
    currentView === TournamentListViews.MyTournaments
      ? myTournaments
      : tournaments;

  return (
    <div className={styles.list}>
      {!me && tournamentListToMap === myTournaments ? (
        <NotLogged animated={false} />
      ) : (
        tournamentListToMap?.map((tournament) => (
          <Link
            key={tournament._id}
            className={styles.listItem}
            to={`/tournament/${tournament._id}/details`}
          >
            <span>{tournament.name} </span>
            <span>{tournament.uniqueCode}</span>
          </Link>
        ))
      )}
    </div>
  );
};

TournamentList.displayName = "TournamentList";
