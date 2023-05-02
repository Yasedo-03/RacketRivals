import styles from './mainBloc.module.scss';
import { Header } from '../../Header';

export const MainBloc = () => {
  return (
    <div className={styles.bloc}>
      <Header />
    </div>
  );
};

MainBloc.displayName = 'MainBloc';