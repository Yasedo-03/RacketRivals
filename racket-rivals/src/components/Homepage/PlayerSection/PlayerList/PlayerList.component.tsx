import { FC } from "react";
import styles from "./PlayerList.module.scss";

interface player {
  id: number;
  first_name: string;
  last_name: string;
  club: string;
  ranking: number;
}

export const PlayerList: FC = () => {
  const players = [
    {
      id: 1,
      first_name: "Jane",
      last_name: "Doe",
      club: "ézanville",
      ranking: 1200,
    },
    {
      id: 2,
      first_name: "June",
      last_name: "Dah",
      club: "eaubonne",
      ranking: 1400,
    },
    {
      id: 3,
      first_name: "John",
      last_name: "Doe",
      club: "domont",
      ranking: 1700,
    },
  ];

  return (
    <div className={styles.list}>
      {players.map((player: player) => (
        <a key={player.id} className={styles.listItem} href={player.club}>
          <span>
            {player.first_name} {player.last_name}{" "}
          </span>
          <span>{player.club}</span>
          <span>{player.ranking}</span>
        </a>
      ))}
    </div>
  );
};

PlayerList.displayName = "PlayerList";
