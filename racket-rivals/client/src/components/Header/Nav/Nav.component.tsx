import { FC } from "react";
import styles from "./Nav.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { handleClick } from "../../../gsap-helpers/scrollAnimation";

interface NavItem {
  label: string;
  path: string;
}

interface NavProps {
  isVisible: boolean;
  isLogged: boolean;
  navItems: Array<NavItem>;
  setIsNavVisible: (visible: boolean) => void;
}

export const Nav: FC<NavProps> = ({
  isVisible,
  navItems,
  isLogged,
  setIsNavVisible,
}: NavProps) => {
  const navigate = useNavigate();
  const className = classNames(styles.container, {
    [styles.visible]: isVisible,
  });

  const handleNavigation = (path: string, index: number) => {
    if (path === "/account" || path === "/register") {
      navigate(path);
    } else {
      handleClick(index);
    }
    setIsNavVisible(false);
  };

  return (
    <>
      <div className={className}>
        {navItems.map((navItem, index) => (
          <div
            className={classNames(styles.navItem, {
              [styles.hidden]: isLogged && navItem.label === "Inscription",
            })}
            key={navItem.label}
          >
            <div
              className={styles.text}
              onClick={() => handleNavigation(navItem.path, index)}
            >
              {navItem.label}
            </div>
          </div>
        ))}
        <div className={styles.loginButtonContainer}>
          <div
            onClick={
              isLogged
                ? () => {
                    null;
                  }
                : () => navigate("/login")
            }
            className={styles.loginButton}
          >
            {isLogged ? "Déconnexion" : "Connexion"}
          </div>
        </div>
      </div>
    </>
  );
};

Nav.displayName = "Nav";
