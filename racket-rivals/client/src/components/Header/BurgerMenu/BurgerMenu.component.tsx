// BurgerMenu.tsx
import React from "react";
import styles from "./BurgerMenu.module.scss";
import classnames from "classnames";

interface BurgerMenuProps {
  onClick: () => void;
  isOpen: boolean;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClick, isOpen }) => {
  return (
    <div
      className={classnames(styles.burgerMenu, { [styles.open]: isOpen })}
      onClick={onClick}
    >
      <div className={`${styles.bar} ${styles.topBar}`}></div>
      <div className={`${styles.bar} ${styles.middleBar}`}></div>
      <div className={`${styles.bar} ${styles.bottomBar}`}></div>
    </div>
  );
};

export default BurgerMenu;
