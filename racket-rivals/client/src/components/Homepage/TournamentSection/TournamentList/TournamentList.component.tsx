import { FC } from "react";
import { TournamentListViews } from "../TournamentCard";
import { Link } from "react-router-dom";
import {
  useMyTournaments,
  useTournaments,
} from "../../../../hooks/store/tournaments";
import { ITournament } from "../../../../services/tournaments/interfaces/tournamentInterface";
import { NotLogged } from "../../../NotLogged";
import { User } from "../../../../services/users/interfaces/usersInterfaces";
import styles from "./TournamentList.module.scss";

interface TournamentListProps {
  me: User | null;
  currentView: TournamentListViews;
}

export const TournamentList: FC<TournamentListProps> = ({
  me,
  currentView,
}) => {
  const tournaments = useTournaments();
  const myTournaments = useMyTournaments();

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
            <span className={styles.tournamentName}>{tournament.name} </span>
            <span>{tournament.uniqueCode}</span>
          </Link>
        ))
      )}
    </div>
  );
};

TournamentList.displayName = "TournamentList";
