import { FC } from "react";
import styles from "./Loader.module.scss";

interface LoaderProps {
  color?: string;
}

export const Loader: FC<LoaderProps> = ({ color }) => (
  <span className={`${styles.loader} ${color ? styles[color] : ""}`}></span>
);
