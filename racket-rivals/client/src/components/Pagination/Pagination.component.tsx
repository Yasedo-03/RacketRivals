/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store/useStore";
import { racketRivalsApi } from "../../services/api";
import { setActivePage } from "../../store/slice/tournaments";
import { RootState } from "../../store/store";
import { TournamentListViews } from "../Homepage/TournamentSection/TournamentCard";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  context: "users" | "tournaments";
  onPageChange: (pageNumber: number) => void;
  currentView: TournamentListViews;
}

export const Pagination: FC<PaginationProps> = ({
  onPageChange,
  context,
  currentView,
}) => {
  const dispatch = useAppDispatch();

  const config = {
    users: {
      pageSize: 7,
      type: "Users" as const,
      stateSelector: (state: RootState) => state.user.totalUsers,
      activePageSelector: (state: RootState) => state.user.activePage,
    },
    tournaments: {
      pageSize: 3,
      type: "Tournaments" as const,
      stateSelector: (state: RootState) => state.tournaments.totalTournaments,
      activePageSelector: (state: RootState) => state.tournaments.activePage,
    },
  }[context];

  const contentRange = useAppSelector(config.stateSelector);
  const activePage = useAppSelector(config.activePageSelector);

  const totalPages = Math.ceil(contentRange / config.pageSize);

  if (totalPages <= 1) {
    return null;
  }

  const handleLinkClick = (
    pageNumber: number,
    event: { preventDefault: () => void }
  ) => {
    event.preventDefault();
    dispatch(setActivePage(pageNumber));

    if (
      currentView === TournamentListViews.MyTournaments &&
      context === "tournaments"
    ) {
      dispatch(
        racketRivalsApi.util.invalidateTags([
          {
            type: "Tournaments",
            id: `GET_MY_${pageNumber}_${config.pageSize}`,
          },
        ])
      );
    } else {
      dispatch(
        racketRivalsApi.util.invalidateTags([
          { type: config.type, id: `GET_${pageNumber}_${config.pageSize}` },
        ])
      );
    }

    dispatch(
      racketRivalsApi.util.invalidateTags([{ type: config.type, id: "SEARCH" }])
    );

    onPageChange(pageNumber);
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <li key={pageNumber} className={styles.pagination__item}>
              <a
                href="#"
                onClick={(event) => handleLinkClick(pageNumber, event)}
                className={
                  pageNumber === activePage
                    ? `${styles.pagination__link} ${styles.is_active}`
                    : styles.pagination__link
                }
              >
                {pageNumber}
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

Pagination.displayName = "Pagination";
