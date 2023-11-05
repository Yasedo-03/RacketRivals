import { FC } from "react";
import { User } from "../../../../services/users/interfaces/usersInterfaces";
import {
  useGetUsersQuery,
  useSearchUsersQuery,
} from "../../../../services/users/endpoints";
import { Loader } from "../../../Loader";
import { useAppSelector } from "../../../../hooks/store/useStore";
import { CardPlayerFromList } from "../../../CardFromList";
import { useLaptopMediaQuery } from "../../../../hooks/responsive/useLaptopMediaQuery.hook";
import styles from "./PlayerList.module.scss";

export const PlayerList: FC = () => {
  const isLaptop = useLaptopMediaQuery();
  const pageSizePlayerResponsive = isLaptop ? 10 : 3;
  const { isLoading: searchUserLoading } = useSearchUsersQuery({});
  const { isLoading: getUserLoading } = useGetUsersQuery({
    page: 1,
    pageSize: pageSizePlayerResponsive,
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
        <CardPlayerFromList player={player} key={player._id} />
      ))}
    </div>
  );
};

PlayerList.displayName = "PlayerList";
