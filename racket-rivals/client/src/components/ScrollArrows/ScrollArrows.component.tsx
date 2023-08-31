import { FC } from "react";
import { handleClick } from "../../gsap-helpers/scrollAnimation";
import styles from "./ScrollArrows.module.scss";
import "./ScrollArrows.scss";

type ScrollArrowsProps = {
  index: number;
  scrollArrowsDirection?: ScrollArrowsDirection;
};

export enum ScrollArrowsDirection {
  TOP = "TOP",
  BOT = "BOT",
}

export const ScrollArrows: FC<ScrollArrowsProps> = ({
  index,
  scrollArrowsDirection,
}) => {
  const handleClickArrows = (
    index: number,
    scrollArrowsDirection?: ScrollArrowsDirection
  ) => {
    const newIndex = scrollArrowsDirection === "TOP" ? index - 1 : index + 1;
    handleClick(newIndex);
  };

  return (
    <svg
      onClick={() => handleClickArrows(index, scrollArrowsDirection)}
      className={styles.arrows}
    >
      <g
        className={
          scrollArrowsDirection === ScrollArrowsDirection.TOP ? "rotation" : ""
        }
      >
        <g className="scaling">
          <path className={styles.a1} d="M0 0 L30 32 L60 0"></path>
          <path className={styles.a2} d="M0 20 L30 52 L60 20"></path>
          <path className={styles.a3} d="M0 40 L30 72 L60 40"></path>
        </g>
      </g>
    </svg>
  );
};

ScrollArrows.displayName = "ScrollArrows";
