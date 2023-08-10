import styles from "./SearchBar.module.scss";

export const SearchBar = () => {
  return (
    <form
      className={styles.searchForm}
      onSubmit={(event) => event.preventDefault()}
      role="search"
    >
      <label className={styles.labelSearch} htmlFor={styles.search}>Rechercher un tournoi</label>
      <input
        id={styles.search}
        type="search"
        placeholder="Rechercher..."
        autoFocus
        required
      />
      <button className={styles.searchBtn} type="submit">
        Go
      </button>
    </form>
  );
};

SearchBar.displayName = "SearchBar";
