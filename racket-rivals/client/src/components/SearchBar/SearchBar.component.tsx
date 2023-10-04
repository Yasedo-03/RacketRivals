import { tournamentsEndpoints } from "../../services/tournaments/endpoints";
import { GrPowerReset } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "../../hooks/store/useStore";
import {
  setSearchQueryUsers,
  setSearchQueryTournaments,
} from "../../store/slice/searchSlice";
import { usersEndpoints } from "../../services/users/endpoints";
import styles from "./SearchBar.module.scss";
import { racketRivalsApi } from "../../services/api";

interface SearchBarProps {
  context: "tournaments" | "users";
}

export const SearchBar: React.FC<SearchBarProps> = ({ context }) => {
  const dispatch = useAppDispatch();

  const searchQuery = useAppSelector(
    (state) => state.search[context].searchQuery
  );
  const currentView = useAppSelector(
    (state) => state.tournamentView.currentView
  );

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (context === "tournaments") {
      dispatch(
        racketRivalsApi.util.invalidateTags([
          { type: "Tournaments", id: `SEARCH_${searchQuery}` },
        ])
      );
      dispatch(
        tournamentsEndpoints.endpoints.searchTournament.initiate({
          searchQuery,
          currentView,
        })
      );
    } else if (context === "users") {
      dispatch(
        racketRivalsApi.util.invalidateTags([
          { type: "Users", id: `SEARCH_${searchQuery}` },
        ])
      );
      dispatch(usersEndpoints.endpoints.searchUsers.initiate({ searchQuery }));
    }
  };

  const handleReset = () => {
    if (context === "tournaments") {
      dispatch(
        racketRivalsApi.util.invalidateTags([
          { type: "Tournaments", id: "SEARCH_" },
        ])
      );
      dispatch(
        tournamentsEndpoints.endpoints.searchTournament.initiate({
          currentView,
        })
      );
    } else if (context === "users") {
      dispatch(
        racketRivalsApi.util.invalidateTags([{ type: "Users", id: "SEARCH_" }])
      );
    }
  };

  return (
    <>
      <form className={styles.searchForm} onSubmit={handleSearch} role="search">
        <label className={styles.labelSearch} htmlFor={styles.search} />
        <input
          id={styles.search}
          type="search"
          placeholder="Rechercher..."
          autoFocus
          required
          value={searchQuery}
          onChange={(e) => {
            if (context === "users") {
              dispatch(setSearchQueryUsers(e.target.value));
            } else if (context === "tournaments") {
              dispatch(setSearchQueryTournaments(e.target.value));
            }
          }}
        />
        <button className={styles.searchBtn} type="submit">
          Go
        </button>
      </form>
      <GrPowerReset
        onClick={() => handleReset()}
        className={styles.resetSearch}
      />
    </>
  );
};

SearchBar.displayName = "SearchBar";
