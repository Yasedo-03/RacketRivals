import { FC, useState } from "react";
import { TournamentListViews } from "../TournamentCard";
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
import { useLaptopMediaQuery } from "../../../../hooks/responsive/useLaptopMediaQuery.hook";
import { handleCardClick } from "./utils/handleCard";
import { CardTournamentFromList } from "../../../CardFromList";
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
  const pageSizeTournamentResponsive = isLaptop ? 8 : 3;
  const [selectedTournamentId, setSelectedTournamentId] = useState<
    string | null
  >(null);

  const { isLoading: isLoadingTournaments } = useGetTournamentsQuery({
    page: 1,
    pageSize: pageSizeTournamentResponsive,
  });
  const { isLoading: isLoadingMyTournaments } = useGetMyTournamentsQuery(
    { page: 1, pageSize: pageSizeTournamentResponsive },
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
            <CardTournamentFromList
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
