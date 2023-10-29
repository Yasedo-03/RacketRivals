import { FC } from "react";
import { User } from "../../../../services/users/interfaces/usersInterfaces";
import {
  useGetUsersQuery,
  useSearchUsersQuery,
} from "../../../../services/users/endpoints";
import { Loader } from "../../../Loader";
import { useAppSelector } from "../../../../hooks/store/useStore";
import styles from "./PlayerList.module.scss";

export const PlayerList: FC = () => {
  const { isLoading: searchUserLoading } = useSearchUsersQuery({});
  const { isLoading: getUserLoading } = useGetUsersQuery({
    page: 1,
    pageSize: 7,
  });
  const players = useAppSelector((state) => state.user.usersList);

  if (searchUserLoading || getUserLoading) {
    return (
      <div className={styles.loaderCentered}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {players?.map((player: User) => (
        <a key={player._id} className={styles.listItem} href={player.club}>
          <span>
            {player.firstName} {player.lastName}{" "}
          </span>
          <span className={styles.playerClub}>{player.club}</span>
          <span>{player.rank}</span>
        </a>
      ))}
    </div>
  );
};

PlayerList.displayName = "PlayerList";
