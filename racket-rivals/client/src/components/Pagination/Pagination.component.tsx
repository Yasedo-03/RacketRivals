import { useState } from "react";
import styles from "./Pagination.module.scss";

export const Pagination = () => {
  const [activePage, setActivePage] = useState(1);

  const handleLinkClick = (
    pageNumber: number,
    event: { preventDefault: () => void }
  ) => {
    event.preventDefault();
    setActivePage(pageNumber);
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.pagination}>
        {[1, 2, 3, 4, 5].map((pageNumber) => (
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
        ))}
      </ul>
    </div>
  );
};

Pagination.displayName = "Pagination";
