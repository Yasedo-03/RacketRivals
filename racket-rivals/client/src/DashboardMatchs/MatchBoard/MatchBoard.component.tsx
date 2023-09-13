import { FC, useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaTrophy } from "react-icons/fa";
import { VscChromeMinimize } from "react-icons/vsc";
import { Match } from "../../services/tournaments/interfaces/tournamentInterface";
import { useAppDispatch, useAppSelector } from "../../hooks/store/useStore";
import { updateMatchForm } from "../../store/slice/matchForm";
import { determineWinner } from "../../utils/match";
import styles from "./MatchBoard.module.scss";

interface MatchBoardProps {
  match: Match;
}

export const MatchBoard: FC<MatchBoardProps> = ({ match }) => {
  const dispatch = useAppDispatch();
  const matchForm = useAppSelector((state) => state.matchForm);
  const currentMatchData = useAppSelector(
    (state) => state.matchForm[match._id]
  );

  const currentWinnerId = currentMatchData?.winner || match.winner;

  const winnerPlayer = determineWinner(
    currentWinnerId,
    match.player1,
    match.player2
  );

  const score = useMemo(() => {
    return matchForm[match._id]?.score || { player1: 0, player2: 0 };
  }, [matchForm, match._id]);

  useEffect(() => {
    const initialMatchData = {
      matchId: match._id,
      data: {
        score: match.score || { player1: 0, player2: 0 },
        winner: match.winner || null,
      },
    };

    dispatch(updateMatchForm(initialMatchData));
  }, [match]);

  const handleScoreChange = (player: string, value: number) => {
    const newScore = value < 0 ? 0 : value > 4 ? 4 : value;
    dispatch(
      updateMatchForm({
        matchId: match._id,
        data: { score: { ...score, [player]: newScore } },
      })
    );
  };

  const handleWinnerUpdate = (playerId: string) => {
    dispatch(
      updateMatchForm({ matchId: match._id, data: { winner: playerId } })
    );
  };

  return (
    <>
      <div className={styles.matchContainer}>
        <div className={styles.match}>
          <span>p1</span>
          <div className={styles.endContainer}>
            <div className={styles.score}>
              <FaPlus
                className={styles.scoreBtn}
                onClick={() => handleScoreChange("player1", score?.player1 + 1)}
              />
              <input
                type="number"
                value={score.player1}
                onChange={(e) => handleScoreChange("player1", +e.target.value)}
              />
              <VscChromeMinimize
                className={styles.scoreBtn}
                onClick={() => handleScoreChange("player1", score?.player1 - 1)}
              />
            </div>
            <FaTrophy
              className={`${styles.scoreBtnWin} ${
                match.player1 && winnerPlayer === match.player1
                  ? styles.winner
                  : ""
              }`}
              onClick={() => match.player1 && handleWinnerUpdate(match.player1)}
            />
          </div>
        </div>
        <div className={styles.match}>
          <span>p2</span>
          <div className={styles.endContainer}>
            <div className={styles.score}>
              <FaPlus
                className={styles.scoreBtn}
                onClick={() => handleScoreChange("player2", score?.player2 + 1)}
              />
              <input
                type="number"
                value={score.player2}
                onChange={(e) => handleScoreChange("player2", +e.target.value)}
              />
              <VscChromeMinimize
                className={styles.scoreBtn}
                onClick={() => handleScoreChange("player2", score?.player2 - 1)}
              />
            </div>
            <FaTrophy
              className={`${styles.scoreBtnWin} ${
                match.player2 && winnerPlayer === match.player2
                  ? styles.winner
                  : ""
              }`}
              onClick={() => match.player2 && handleWinnerUpdate(match.player2)}
            />
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
