import styles from "./BlurDivider.module.scss";
import classnames from "classnames";

type BlurDividerProps = {
  position?: string;
};

export const BlurDivider = ({ position }: BlurDividerProps) => {
  return (
    <div
      className={classnames(styles.blurDivider, {
        [styles.top]: position === "top",
      })}
    />
  );
};

BlurDivider.displayName = "BlurDivider";
