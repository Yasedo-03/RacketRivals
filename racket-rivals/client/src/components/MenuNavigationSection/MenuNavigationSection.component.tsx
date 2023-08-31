import { FC } from "react";
import styles from "./MenuNavigationSection.module.scss";
import { NavLink } from "react-router-dom";

export interface MenuNavigationSectionProps {
  items: Array<{ label: string; to: string }>;
}

export const MenuNavigationSection: FC<MenuNavigationSectionProps> = ({
  items,
}) => {
  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={({ isActive }) =>
            isActive
              ? `${styles.active} ${styles.menuButton}`
              : styles.menuButton
          }
        >
          <span>{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

MenuNavigationSection.displayName = "MenuNavigationSection";
