import { FC } from "react";
import styles from "./Nav.module.scss";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { handleClick } from "../../../gsap-helpers/scrollAnimation";
import { useLogoutMutation } from "../../../services/auth/endpoints";
import { useAppDispatch } from "../../../hooks/store/useStore";
import { logout } from "../../../store/slice/auth";

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
  const dispatch = useAppDispatch();
  const [logoutMutation] = useLogoutMutation();
  const className = classNames(styles.container, {
    [styles.visible]: isVisible,
  });

  const handleClickLoggin = async (isLogged: boolean) => {
    if (isLogged) {
      try {
        await logoutMutation(null).unwrap();
        dispatch(logout());
      } catch (error) {
        console.error("Erreur lors de la déconnexion : ", error);
      }
    } else {
      navigate("/login");
    }
  };

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
              [styles.hidden]: !isLogged && navItem.label === "Mon compte",
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
            onClick={() => handleClickLoggin(isLogged)}
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
