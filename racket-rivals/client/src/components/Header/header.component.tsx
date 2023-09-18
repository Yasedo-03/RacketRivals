import { Nav } from "./Nav";
import { ReactComponent as AppLogo } from "../../assets/svg/logo_racketrivals.svg";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu/BurgerMenu.component";
import { useAuthStatus } from "../../hooks/store/user";
import styles from "./Header.module.scss";

const navItems = [
  { label: "Accueil", path: "/" },
  { label: "Tournois", path: "/tournaments" },
  { label: "Joueurs", path: "/players" },
  { label: "Mon compte", path: "/account" },
  { label: "Inscription", path: "/register" },
];

export const Header = () => {
  const [isNavVisible, setIsNavVisible] = useState<boolean>(false);
  const isLogged = useAuthStatus();

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <AppLogo className={styles.appLogo} />
          <h1 className={styles.title}>RacketRivals</h1>
        </div>
        <BurgerMenu
          onClick={() => setIsNavVisible(!isNavVisible)}
          isOpen={isNavVisible}
        />
      </div>
      <Nav
        isVisible={isNavVisible}
        isLogged={isLogged}
        navItems={navItems}
        setIsNavVisible={setIsNavVisible}
      />
    </>
  );
};

Header.displayName = "Header";
