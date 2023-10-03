import { useLayoutEffect, useRef } from "react";
import { Pagination } from "../../../Pagination";
import { SearchBar } from "../../../SearchBar";
import { PlayerList } from "../PlayerList";
import { useDispatch } from "react-redux";
import { setSearchTermUsers } from "../../../../store/slice/searchSlice";
import { racketRivalsApi } from "../../../../services/api";
import styles from "./SearchPlayerCard.module.scss";

export const SearchPlayerCard = () => {
  const dispatch = useDispatch();
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add(styles.containerInPlace);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container} ref={cardRef}>
      <SearchBar
        context="users"
        onSearch={(query) => {
          dispatch(setSearchTermUsers(query));
        }}
        onReset={() => {
          dispatch(racketRivalsApi.util.invalidateTags(["Users"]));
        }}
      />
      <PlayerList />
      <Pagination />
    </div>
  );
};

SearchPlayerCard.displayName = "SearchPlayerCard";
