import { FC, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaTrophy } from "react-icons/fa";
import { VscChromeMinimize } from "react-icons/vsc";
import { Match } from "../../../services/matchs/interfaces/matchInterface";
import { useAppDispatch, useAppSelector } from "../../../hooks/store/useStore";
import { useUpdateMatchMutation } from "../../../services/matchs/endpoints";
import {
  determineMatchStatus,
  determineWinner,
} from "../../../utils/matchUtils";
import { updateMatchForm } from "../../../store/slice/matchForm";
import styles from "./MatchBoard.module.scss";

interface MatchBoardProps {
  match: Match;
}

export const MatchBoard: FC<MatchBoardProps> = ({ match }) => {
  const dispatch = useAppDispatch();
  const currentMatchData = useAppSelector(
    (state) => state.matchForm[match._id]
  );
  const displayData = currentMatchData || match;

  const [updateMatch, { isLoading }] = useUpdateMatchMutation();

  const currentWinnerId = currentMatchData?.winner;

  const winnerPlayer =
    currentMatchData?.player1 && currentMatchData?.player2
      ? determineWinner(
          currentWinnerId ?? null,
          currentMatchData?.player1?._id ?? null,
          currentMatchData?.player2?._id ?? null
        )
      : undefined;

  const score = match.score || { player1: 0, player2: 0 };

  useEffect(() => {
    dispatch(
      updateMatchForm({
        matchId: match._id,
        originalMatch: match,
      })
    );
  }, [match]);

  const handleScoreChange = (player: string, value: number) => {
    const newScore = value < 0 ? 0 : value > 4 ? 4 : value;
    const updatedScore = { ...displayData.score, [player]: newScore };
    const status = determineMatchStatus(updatedScore, currentWinnerId ?? null);
    dispatch(
      updateMatchForm({
        matchId: match._id,
        data: { score: updatedScore, status },
      })
    );
  };

  const handleWinnerUpdate = (playerId: string) => {
    let status;
    if (currentMatchData.winner === playerId) {
      status = determineMatchStatus(score, null);
      dispatch(
        updateMatchForm({ matchId: match._id, data: { winner: null, status } })
      );
    } else {
      status = determineMatchStatus(score, playerId);
      dispatch(
        updateMatchForm({
          matchId: match._id,
          data: { winner: playerId, status },
        })
      );
    }
  };

  const handleSubmit = async () => {
    if (!currentMatchData) {
      console.error("Données du match introuvables.");
      return;
    }

    try {
      const { _id, ...updatedMatchData } = currentMatchData;

      await updateMatch({
        tournamentId: match.tournamentId,
        matchInput: updatedMatchData,
        matchId: _id,
      }).unwrap();
    } catch (err) {
      console.error("Erreur lors de la mise à jour du match:", err);
    }
  };

  return (
    <>
      <div className={styles.matchContainer}>
        <div className={styles.match}>
          <span>
            {(displayData?.player1?.firstName || "") +
              " " +
              (displayData?.player1?.lastName || "")}
          </span>
          <div className={styles.endContainer}>
            <div className={styles.score}>
              <FaPlus
                className={styles.scoreBtn}
                onClick={() =>
                  handleScoreChange(
                    "player1",
                    (displayData.score?.player1 || 0) + 1
                  )
                }
              />
              <input
                type="number"
                value={displayData.score?.player1 || 0}
                onChange={(e) => handleScoreChange("player1", +e.target.value)}
              />
              <VscChromeMinimize
                className={styles.scoreBtn}
                onClick={() =>
                  handleScoreChange(
                    "player1",
                    (displayData.score?.player1 || 0) - 1
                  )
                }
              />
            </div>
            <FaTrophy
              className={`${styles.scoreBtnWin} ${
                displayData?.player1 &&
                winnerPlayer === displayData?.player1._id
                  ? styles.winner
                  : ""
              }`}
              onClick={() =>
                displayData?.player1 &&
                handleWinnerUpdate(displayData?.player1._id)
              }
            />
          </div>
        </div>
        <div className={styles.match}>
          <span>
            {(displayData?.player2?.firstName || "") +
              " " +
              (displayData?.player2?.lastName || "")}
          </span>
          <div className={styles.endContainer}>
            <div className={styles.score}>
              <FaPlus
                className={styles.scoreBtn}
                onClick={() =>
                  handleScoreChange(
                    "player2",
                    (displayData.score?.player2 || 0) + 1
                  )
                }
              />
              <input
                type="number"
                value={displayData.score?.player2 || 0}
                onChange={(e) => handleScoreChange("player2", +e.target.value)}
              />
              <VscChromeMinimize
                className={styles.scoreBtn}
                onClick={() =>
                  handleScoreChange(
                    "player2",
                    (displayData.score?.player2 || 0) - 1
                  )
                }
              />
            </div>
            <FaTrophy
              className={`${styles.scoreBtnWin} ${
                displayData?.player2 &&
                winnerPlayer === displayData?.player2._id
                  ? styles.winner
                  : ""
              }`}
              onClick={() =>
                displayData?.player2 &&
                handleWinnerUpdate(displayData?.player2._id)
              }
            />
          </div>
        </div>
      </div>
      <button
        className={styles.updateMatchBtn}
        onClick={handleSubmit}
        type="submit"
      >
        Mettre à jour
      </button>
    </>
  );
};

MatchBoard.displayName = "MatchBoard";
