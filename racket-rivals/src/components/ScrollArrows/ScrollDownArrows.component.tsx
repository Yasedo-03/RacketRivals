import { handleClick } from "../../gsap-helpers/scrollAnimation";
import styles from "./ScrollDownArrows.module.scss";

type ScrollDownArrowsProps = {
  index: number;
};

export const ScrollDownArrows = ({ index }: ScrollDownArrowsProps) => {
  return (
    <svg onClick={() => handleClick(index + 1)} className={styles.arrows}>
      <g transform="scale(0.75)">
        <path className={styles.a1} d="M0 0 L30 32 L60 0"></path>
        <path className={styles.a2} d="M0 20 L30 52 L60 20"></path>
        <path className={styles.a3} d="M0 40 L30 72 L60 40"></path>
      </g>
    </svg>
  );
};

ScrollDownArrows.displayName = "ScrollDownArrows";
