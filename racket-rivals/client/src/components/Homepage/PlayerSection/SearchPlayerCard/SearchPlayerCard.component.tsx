import { useLayoutEffect, useRef } from "react";
import { Pagination } from "../../../Pagination";
import { SearchBar } from "../../../SearchBar";
import styles from "./SearchPlayerCard.module.scss";
import { PlayerList } from "../PlayerList";

export const SearchPlayerCard = () => {
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
      <SearchBar />
      <PlayerList />
      <Pagination />
    </div>
  );
};

SearchPlayerCard.displayName = "SearchPlayerCard";
