import styles from "./TournamentList.module.scss";

export const TournamentList = () => {
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

  return (
    <div className={styles.list}>
      {tournaments.map((tournament) => (
        <a key={tournament.id} className={styles.listItem} href={tournament.id}>
          <span>{tournament.name} </span>
          <span>{tournament.id}</span>
        </a>
      ))}
    </div>
  );
};

TournamentList.displayName = "TournamentList";
