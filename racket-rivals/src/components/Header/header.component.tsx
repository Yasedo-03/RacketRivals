import styles from './header.module.scss';
import { NavElement } from './navElement';

export const Header = () => {
    return (
        <div className={styles.header}>
            <NavElement />
        </div>
    );
};

Header.displayName = 'Header';