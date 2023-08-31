import { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MenuNavigationTournament.module.scss";

export interface MenuNavigationSectionProps {
  navItems: Array<{ label: string; path: string }>;
}

export const MenuNavigationTournament: FC<MenuNavigationSectionProps> = ({
  navItems,
}) => {
  return (
    <div className={styles.navContainer}>
      {navItems.map((navItem) => (
        <NavLink
          to={navItem.path}
          key={navItem.label}
          className={({ isActive }) =>
            isActive ? `${styles.active} ${styles.navItem}` : styles.navItem
          }
        >
          <span>{navItem.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

MenuNavigationTournament.displayName = "MenuNavigationTournament";
