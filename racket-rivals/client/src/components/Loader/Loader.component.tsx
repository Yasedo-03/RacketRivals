import styles from "./Loader.module.scss";

export const Loader = () => (
  <div className={styles.containerLoader}>
    <span className={styles.loaderElement}></span>
    <span className={styles.loaderElement}></span>
    <span className={styles.loaderElement}></span>
    <span className={styles.loaderElement}></span>
  </div>
);
