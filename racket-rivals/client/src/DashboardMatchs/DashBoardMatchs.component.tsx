import { FC, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { MatchBoard } from "./MatchBoard";
import { useGetMatchsQuery } from "../services/matchs/endpoints";
import styles from "./DashBoardMatchs.module.scss";

enum RoundNames {
  Ro16 = "Huitièmes de finale",
  Ro8 = "Quarts de finale",
  Ro4 = "Demi-finales",
  Ro2 = "Finale",
}

export const DashboardMatchs: FC = () => {
  const { tournamentId } = useParams();
  const { data: matchs } = useGetMatchsQuery({ tournamentId });
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const [uniqueRounds, setUniqueRounds] = useState<string[]>([]);
  const [selectedRound, setSelectedRound] = useState<RoundNames | string>("");

  useEffect(() => {
    if (matchs) {
      const rounds = [...new Set(matchs.map((match) => match.round))];
      setUniqueRounds(rounds);

      setSelectedRound(rounds[0] || "");
    }
  }, [matchs]);

  const filteredMatchs =
    matchs?.filter((match) => match.round === selectedRound) || [];

  return (
    <div className={styles.container}>
      <FaArrowLeft onClick={() => goBack()} className={styles.backArrow} />
      <h1 className={styles.title}>Score des matchs</h1>
      <div className={styles.selectWrapper}>
        <select
          onChange={(e) => setSelectedRound(e.target.value)}
          className={styles.selectRound}
        >
          {uniqueRounds.map((round, index) => (
            <option key={index} value={round}>
              {RoundNames[round as keyof typeof RoundNames]}
            </option>
          ))}
        </select>
      </div>
      {filteredMatchs.map((match) => (
        <MatchBoard key={match._id} match={match} />
      ))}
    </div>
  );
};
