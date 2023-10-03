import { FC } from "react";
import { User } from "../../../../services/users/interfaces/usersInterfaces";
import { useAppSelector } from "../../../../hooks/store/useStore";
import { useSearchUsersQuery } from "../../../../services/users/endpoints";
import styles from "./PlayerList.module.scss";

export const PlayerList: FC = () => {
  const { data: users, error: errorSearchUsersQuery } =
    useSearchUsersQuery(null);
  const players = useAppSelector((state) => state.user.usersList);

  return (
    <div className={styles.list}>
      {players?.map((player: User) => (
        <a key={player._id} className={styles.listItem} href={player.club}>
          <span>
            {player.firstName} {player.lastName}{" "}
          </span>
          <span>{player.club}</span>
          <span>{player.rank}</span>
        </a>
      ))}
    </div>
  );
};

PlayerList.displayName = "PlayerList";
