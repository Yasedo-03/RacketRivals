import styles from "./LoaderForRouter.module.scss";

export const LoaderForRouter = () => (
  <div className={styles.container}>
    <div className={styles.ball}></div>
    <div className={styles.shadow}></div>
    <div className={styles.text}>
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
  </div>
);
