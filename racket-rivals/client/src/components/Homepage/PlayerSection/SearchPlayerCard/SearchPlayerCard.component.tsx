import { useLayoutEffect, useRef } from "react";
import { Pagination } from "../../../Pagination";
import { SearchBar } from "../../../SearchBar";
import { PlayerList } from "../PlayerList";
import { usersEndpoints } from "../../../../services/users/endpoints";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/store/useStore";
import styles from "./SearchPlayerCard.module.scss";
import { useLaptopMediaQuery } from "../../../../hooks/responsive/useLaptopMediaQuery.hook";

export const SearchPlayerCard = () => {
  const isLaptop = useLaptopMediaQuery();
  const pageSizePlayerResponsive = isLaptop ? 10 : 3;
  const dispatch = useAppDispatch();
  const cardRef = useRef<HTMLDivElement>(null);
  const currentView = useAppSelector(
    (state) => state.tournamentView.currentView
  );

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add(styles.containerInPlace);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (newPage: number) => {
    dispatch(
      usersEndpoints.endpoints.getUsers.initiate({
        page: newPage,
        pageSize: pageSizePlayerResponsive,
      })
    );
  };

  return (
    <div className={styles.container} ref={cardRef}>
      <SearchBar context="users" />
      <PlayerList />
      <Pagination
        context="users"
        onPageChange={handlePageChange}
        currentView={currentView}
        pageSizePlayerResponsive={pageSizePlayerResponsive}
      />
    </div>
  );
};

SearchPlayerCard.displayName = "SearchPlayerCard";
