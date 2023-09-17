import { FC, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotLogged.module.scss";

interface NotLoggedProps {
  animated?: boolean;
}

export const NotLogged: FC<NotLoggedProps> = ({ animated }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (cardRef.current && animated) {
        cardRef.current.classList.add(styles.containerInPlace);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={animated ? styles.animatedContainer : styles.container}
      ref={cardRef}
    >
      <p>Vous devez être connecté pour pouvoir utiliser cette fonctionnalité</p>
      <button
        className={styles.loginButton}
        onClick={() => navigate("/login")}
        type="button"
      >
        Connexion
      </button>
    </div>
  );
};

NotLogged.displayName = "NotLogged";
