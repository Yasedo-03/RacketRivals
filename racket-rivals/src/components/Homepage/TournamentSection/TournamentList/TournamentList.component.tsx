import { FC } from "react";
import styles from "./TournamentList.module.scss";
import { TournamentListViews } from "../TournamentCard";
import { Link } from "react-router-dom";

type TournamentListProps = {
  tournamentListView: TournamentListViews;
};

type Tournament = {
  id: string;
  name: string;
};

export const TournamentList: FC<TournamentListProps> = ({
  tournamentListView,
}) => {
  const myTournaments = [
    { id: "#12345", name: "Tournoi d'ézanville" },
    { id: "#12346", name: "Tournoi d'eaubonne" },
    { id: "#12347", name: "Tournoi d'eaubonne" },
  ];

  const tournaments = [
    { id: "#12345", name: "Tournoi d'ézanville" },
    { id: "#12346", name: "Tournoi d'eaubonne" },
    { id: "#12347", name: "Tournoi d'eaubonne" },
    { id: "#12348", name: "Tournoi d'eaubonne" },
    { id: "#12349", name: "Tournoi d'eaubonne" },
    { id: "#12654", name: "Tournoi d'eaubonne" },
    { id: "#16984", name: "Tournoi d'eaubonne" },
    { id: "#12365", name: "Tournoi d'eaubonne" },
    { id: "#16952", name: "Tournoi d'eaubonne" },
    { id: "#19878", name: "Tournoi d'eaubonne" },
  ];

  const tournamentListToMap: Array<Tournament> =
    tournamentListView === TournamentListViews.MyTournaments
      ? myTournaments
      : tournaments;

  return (
    <div className={styles.list}>
      {tournamentListToMap.map((tournament) => (
        <Link
          key={tournament.id}
          className={styles.listItem}
          to={"/tournament/1/details"}
        >
          <span>{tournament.name} </span>
          <span>{tournament.id}</span>
        </Link>
      ))}
    </div>
  );
};

TournamentList.displayName = "TournamentList";
