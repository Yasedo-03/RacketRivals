import styles from "./header.module.scss";
import { Nav } from "./Nav";
import { ReactComponent as AppLogo } from "../../assets/svg/logo_racketrivals.svg";
import { useState } from "react";
import BurgerMenu from "./BurgerMenu/BurgerMenu.component";

const navItems = ["Accueil", "Tournois", "Joueurs", "Mon compte"];

export const Header = () => {
  const [isNavVisible, setIsNavVisible] = useState<boolean>(false);
  const [isLogged, setIsLogged] = useState<boolean>(false);

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
      <Nav isVisible={isNavVisible} isLogged={isLogged} navItems={navItems} />
    </>
  );
};

Header.displayName = "Header";
