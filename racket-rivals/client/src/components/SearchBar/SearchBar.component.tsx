import { useSearchTournamentQuery } from "../../services/tournaments/endpoints";
import { GrPowerReset } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/store/useStore";
import {
  setSearchQueryUsers,
  setSearchQueryTournaments,
} from "../../store/slice/searchSlice";
import { useSearchUsersQuery } from "../../services/users/endpoints";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  context: "tournaments" | "users";
  onSearch: (query: string) => void;
  onReset: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onReset,
  context,
}) => {
  const dispatch = useDispatch();

  const searchQuery = useAppSelector(
    (state) => state.search[context].searchQuery
  );
  const searchTerm = useAppSelector(
    (state) => state.search[context].searchTerm
  );
  const currentView = useAppSelector(
    (state) => state.tournamentView.currentView
  );

  const { data, error } =
    context === "tournaments"
      ? useSearchTournamentQuery({ searchTerm, currentView })
      : useSearchUsersQuery(searchTerm, {
          skip: searchTerm === "",
        });

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  const handleReset = () => {
    if (onReset) onReset();
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
