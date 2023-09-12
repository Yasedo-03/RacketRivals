import { FC } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaTrophy } from "react-icons/fa";
import { VscChromeMinimize } from "react-icons/vsc";
import styles from "./MatchBoard.module.scss";
import { Match } from "../../services/tournaments/interfaces/tournamentInterface";

interface MatchBoardProps {
  match: Match;
}

export const MatchBoard: FC<MatchBoardProps> = ({ match }) => {
  return (
    <>
      <div className={styles.matchContainer}>
        <div className={`${styles.match} ${styles.player1}`}>
          <span>p1</span>
          <div className={styles.endContainer}>
            <div className={styles.score}>
              <FaPlus className={styles.scoreBtn} />
              <input type="number" />
              <VscChromeMinimize className={styles.scoreBtn} />
            </div>
            <FaTrophy className={styles.scoreBtnWin} />
          </div>
        </div>
        <div className={`${styles.match} ${styles.player2}`}>
          <span>p2</span>
          <div className={styles.endContainer}>
            <div className={styles.score}>
              <FaPlus className={styles.scoreBtn} />
              <input type="number" />
              <VscChromeMinimize className={styles.scoreBtn} />
            </div>
            <FaTrophy className={styles.scoreBtnWin} />
          </div>
        </div>
      </div>
      <button className={styles.updateMatchBtn} type="submit">
        Mettre à jour
      </button>
    </>
  );
};

MatchBoard.displayName = "MatchBoard";
