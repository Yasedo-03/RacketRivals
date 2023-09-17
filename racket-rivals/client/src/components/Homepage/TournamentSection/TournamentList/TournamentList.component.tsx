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
import styles from "./TournamentList.module.scss";

type TournamentListProps = {
  tournamentListView: TournamentListViews;
};

export const TournamentList: FC<TournamentListProps> = ({
  tournamentListView,
}) => {
  const me = useGetUser();
  const tournaments = useTournaments();
  const myTournaments = useMyTournaments();

  const tournamentListToMap: Array<ITournament> | null =
    tournamentListView === TournamentListViews.MyTournaments
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
