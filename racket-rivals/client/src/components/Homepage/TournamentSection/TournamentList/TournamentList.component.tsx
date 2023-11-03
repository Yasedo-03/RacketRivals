import { FC, useState } from "react";
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
import { CardFromList } from "../../../CardFromList";
import { useLaptopMediaQuery } from "../../../../hooks/responsive/useLaptopMediaQuery.hook";
import { handleCardClick } from "./utils/handleCard";
import styles from "./TournamentList.module.scss";

interface TournamentListProps {
  me: User | null;
  currentView: TournamentListViews;
}

export const TournamentList: FC<TournamentListProps> = ({
  me,
  currentView,
}) => {
  const isLaptop = useLaptopMediaQuery();
  const pageSizeResponsive = isLaptop ? 8 : 3;
  const [selectedTournamentId, setSelectedTournamentId] = useState<
    string | null
  >(null);

  const { isLoading: isLoadingTournaments } = useGetTournamentsQuery({
    page: 1,
    pageSize: pageSizeResponsive,
  });
  const { isLoading: isLoadingMyTournaments } = useGetMyTournamentsQuery(
    { page: 1, pageSize: pageSizeResponsive },
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
      {tournamentListToMap?.map(
        (tournament) =>
          (!selectedTournamentId ||
            selectedTournamentId === tournament._id) && (
            <CardFromList
              key={tournament._id}
              tournament={tournament}
              isLaptop={isLaptop}
              onClick={() =>
                handleCardClick(
                  tournament._id,
                  setSelectedTournamentId,
                  isLaptop,
                  selectedTournamentId
                )
              }
            />
          )
      )}
    </div>
  );
};

TournamentList.displayName = "TournamentList";
