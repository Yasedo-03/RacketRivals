import { useMobileMediaQuery } from '../../../hooks/responsive/useMobileMediQuery.hook';
import imgBg from '../../../assets/img/bg1.png';
import imgBgMobile from '../../../assets/img/imgBgMobile.jpg';
import styles from './mainBloc.module.scss';

export const MainBloc = () => {
    const isMobile = useMobileMediaQuery();
    return (
        <div className={styles.bloc}>
            <img
                className={styles.img}
                src={isMobile ? imgBgMobile : imgBg}
                alt="..."
                loading="lazy"
            />
        </div>
    );
};

MainBloc.displayName = 'MainBloc';