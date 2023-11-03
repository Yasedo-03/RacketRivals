/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store/useStore";
import { racketRivalsApi } from "../../services/api";
import { setActivePage } from "../../store/slice/tournaments";
import { RootState } from "../../store/store";
import { TournamentListViews } from "../Homepage/TournamentSection/TournamentCard";
import { Pagination as PaginationUI } from "@aws-amplify/ui-react";
import "./styles.scss";

interface PaginationProps {
  context: "users" | "tournaments";
  onPageChange: (pageNumber: number) => void;
  currentView: TournamentListViews;
  pageSizeResponsive: number;
}

export const Pagination: FC<PaginationProps> = ({
  onPageChange,
  context,
  currentView,
  pageSizeResponsive,
}) => {
  const dispatch = useAppDispatch();
  console.log(context);

  const config = {
    users: {
      pageSize: 7,
      type: "Users" as const,
      stateSelector: (state: RootState) => state.user.totalUsers,
      activePageSelector: (state: RootState) => state.user.activePage,
    },
    tournaments: {
      pageSize: pageSizeResponsive,
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

  const handleOnChange = (newPageIndex?: number) => {
    if (typeof newPageIndex === "number") {
      handlePageClick(newPageIndex);
    }
  };

  const handleNextPage = () => {
    if (activePage < totalPages) {
      handleOnChange(activePage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (activePage > 1) {
      handleOnChange(activePage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
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
    <PaginationUI
      className="pagination"
      currentPage={activePage}
      totalPages={totalPages}
      onNext={handleNextPage}
      onPrevious={handlePreviousPage}
      onChange={handleOnChange}
      siblingCount={1}
    />
  );
};

Pagination.displayName = "Pagination";
