import { FC } from "react";
import styles from "./Nav.module.scss";
import classNames from "classnames";

interface NavProps {
  isVisible: boolean;
  isLogged: boolean;
  navItems: Array<string>;
}

export const Nav: FC<NavProps> = ({
  isVisible,
  navItems,
  isLogged,
}: NavProps) => {
  const className = classNames(styles.container, {
    [styles.visible]: isVisible,
  });

  return (
    <>
      <div className={className}>
        {navItems.map((navItem) => (
          <div className={styles.navItem}>
            <a className={styles.text} href="">
              {navItem}
            </a>
          </div>
        ))}
        <div className={styles.loginButtonContainer}>
          <div className={styles.loginButton}>
            {isLogged ? "Déconnexion" : "Connexion"}
          </div>
        </div>
      </div>
    </>
  );
};

Nav.displayName = "Nav";
