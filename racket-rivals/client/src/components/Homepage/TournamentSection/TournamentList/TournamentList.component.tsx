import { FC } from "react";
import { TournamentListViews } from "../TournamentCard";
import { Link } from "react-router-dom";
import { NotLogged } from "../../../NotLogged";
import { User } from "../../../../services/users/interfaces/usersInterfaces";
import {
  useGetMyTournamentsQuery,
  useGetTournamentsQuery,
} from "../../../../services/tournaments/endpoints";
import { ITournament } from "../../../../services/tournaments/interfaces/tournamentInterface";
import { Loader } from "../../../Loader";
import {
  useMyTournaments,
  useTournaments,
} from "../../../../hooks/store/tournaments";
import styles from "./TournamentList.module.scss";

interface TournamentListProps {
  me: User | null;
  currentView: TournamentListViews;
}

export const TournamentList: FC<TournamentListProps> = ({
  me,
  currentView,
}) => {
  const { isLoading: isLoadingTournaments } = useGetTournamentsQuery({
    page: 1,
    pageSize: 10,
  });
  const { isLoading: isLoadingMyTournaments } = useGetMyTournamentsQuery(
    { page: 1, pageSize: 10 },
    {
      skip: !me,
    }
  );
  const tournaments = useTournaments();
  const myTournaments = useMyTournaments();

  const tournamentListToMap: Array<ITournament> | null =
    currentView === TournamentListViews.MyTournaments
      ? myTournaments
      : tournaments;

  if (!me && tournamentListToMap === myTournaments) {
    return <NotLogged animated={false} />;
  }

  if (isLoadingTournaments || isLoadingMyTournaments) {
    return (
      <div className={styles.loaderCentered}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {tournamentListToMap?.map((tournament) => (
        <Link
          key={tournament._id}
          className={styles.listItem}
          to={`/tournament/${tournament._id}/details`}
        >
          <span className={styles.tournamentName}>{tournament.name} </span>
          <span>{tournament.uniqueCode}</span>
        </Link>
      ))}
    </div>
  );
};

TournamentList.displayName = "TournamentList";
