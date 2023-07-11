import styles from "./header.module.scss";
import { NavElement } from "./navElement";
import { ReactComponent as AppLogo } from '../../assets/svg/logo_racketrivals.svg';

export const Header = () => {
  return (
    <div className={styles.header}>
      <AppLogo className={styles.appLogo} />
      <NavElement />
    </div>
  );
};

Header.displayName = "Header";
