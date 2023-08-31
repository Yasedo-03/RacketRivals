import { FC, useLayoutEffect, useRef } from "react";
import styles from "./TournamentPlayersList.module.scss";

const participants = [
  {
    id: 1,
    user_id: 101,
    first_name: "John",
    last_name: "Smith",
    club: "Table Tennis Club A",
    ranking: 1350,
  },
  {
    id: 2,
    user_id: 102,
    first_name: "Alice",
    last_name: "Johnson",
    club: "Table Tennis Club B",
    ranking: 1280,
  },
  {
    id: 3,
    user_id: 103,
    first_name: "Michael",
    last_name: "Williams",
    club: "Table Tennis Club C",
    ranking: 1200,
  },
  {
    id: 4,
    user_id: 104,
    first_name: "Emily",
    last_name: "Brown",
    club: "Table Tennis Club A",
    ranking: 1420,
  },
  {
    id: 5,
    user_id: 105,
    first_name: "David",
    last_name: "Jones",
    club: "Table Tennis Club B",
    ranking: 1175,
  },
  {
    id: 6,
    user_id: 106,
    first_name: "Olivia",
    last_name: "Miller",
    club: "Table Tennis Club C",
    ranking: 1295,
  },
  {
    id: 7,
    user_id: 107,
    first_name: "James",
    last_name: "Wilson",
    club: "Table Tennis Club A",
    ranking: 1387,
  },
  {
    id: 8,
    user_id: 108,
    first_name: "Sophia",
    last_name: "Taylor",
    club: "Table Tennis Club B",
    ranking: 1218,
  },
  {
    id: 9,
    user_id: 109,
    first_name: "Daniel",
    last_name: "Anderson",
    club: "Table Tennis Club C",
    ranking: 1246,
  },
  {
    id: 10,
    user_id: 110,
    first_name: "Isabella",
    last_name: "Martinez",
    club: "Table Tennis Club A",
    ranking: 1410,
  },
  {
    id: 11,
    user_id: 111,
    first_name: "William",
    last_name: "Thompson",
    club: "Table Tennis Club B",
    ranking: 1302,
  },
  {
    id: 12,
    user_id: 112,
    first_name: "Ava",
    last_name: "Garcia",
    club: "Table Tennis Club C",
    ranking: 1187,
  },
  {
    id: 13,
    user_id: 113,
    first_name: "Alexander",
    last_name: "Robinson",
    club: "Table Tennis Club A",
    ranking: 1365,
  },
  {
    id: 14,
    user_id: 114,
    first_name: "Mia",
    last_name: "Lee",
    club: "Table Tennis Club B",
    ranking: 1225,
  },
  {
    id: 15,
    user_id: 115,
    first_name: "Ethan",
    last_name: "Turner",
    club: "Table Tennis Club C",
    ranking: 1274,
  },
  {
    id: 16,
    user_id: 116,
    first_name: "Charlotte",
    last_name: "Harris",
    club: "Table Tennis Club A",
    ranking: 1338,
  },
];

export const TournamentPlayersList: FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add(styles.containerInPlace);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container} ref={cardRef}>
      {participants.map((participant) => (
        <div className={styles.participantItem}>
          <div className={styles.participantNameAndClub}>
            {participant.last_name} {participant.first_name}
            <span>{participant.club}</span>
          </div>
          <span>{participant.ranking} pts</span>
        </div>
      ))}
    </div>
  );
};

TournamentPlayersList.displayName = "TournamentPlayersList";
