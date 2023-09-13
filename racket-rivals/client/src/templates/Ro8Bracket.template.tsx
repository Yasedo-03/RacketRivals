import { FC } from "react";
import {
  ITournament,
  Participant,
} from "../services/tournaments/interfaces/tournamentInterface";
import styles from "./Ro8Bracket.module.scss";

interface Ro8BracketProps {
  tournament: ITournament;
}

type Score = {
  [key: string]: number;
  player1: number;
  player2: number;
};

export const Match: FC<{
  participantIds: string[];
  participants: Participant[];
  score: Score;
}> = ({ participantIds, participants, score }) => {
  const matchedParticipants = participantIds.map((id) =>
    participants.find((p) => p._id === id)
  );

  return (
    <div className={styles.matchup}>
      <div className={styles.participants}>
        {matchedParticipants.map((participant, index) => (
          <div
            key={index}
            className={`${styles.participant} ${
              score &&
              score[`player${index + 1}`] ===
                Math.max(score.player1, score.player2)
                ? styles.winner
                : ""
            }`}
          >
            <span className={styles.participantName}>
              {participant?.firstName} {participant?.lastName}
            </span>
            <span className={styles.score}>
              {score ? score[`player${index + 1}`] : 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Ro8Bracket: FC<Ro8BracketProps> = ({ tournament }) => {
  const ro8Matches = tournament.matchs.filter((match) => match.round === "Ro8");
  const ro4Matches = tournament.matchs.filter((match) => match.round === "Ro4");
  const finalsMatch = tournament.matchs.find((match) => match.round === "Ro2");

  return (
    <div className={styles.bracket}>
      <section className={`${styles.round} ${styles.quarterfinals}`}>
        <div className={styles.winners}>
          <div className={styles.matchups}>
            <Match
              participantIds={[ro8Matches[0]?.player1, ro8Matches[0]?.player2]}
              participants={tournament.participants || []}
              score={ro8Matches[0]?.score}
            />
            <Match
              participantIds={[ro8Matches[1]?.player1, ro8Matches[1]?.player2]}
              participants={tournament.participants || []}
              score={ro8Matches[1]?.score}
            />
          </div>
          <div className={styles.connector}>
            <div className={styles.merger}></div>
            <div className={styles.line}></div>
          </div>
        </div>
        <div className={styles.winners}>
          <div className={styles.matchups}>
            <Match
              participantIds={[ro8Matches[2]?.player1, ro8Matches[2]?.player2]}
              participants={tournament.participants || []}
              score={ro8Matches[2]?.score}
            />
            <Match
              participantIds={[ro8Matches[3]?.player1, ro8Matches[3]?.player2]}
              participants={tournament.participants || []}
              score={ro8Matches[3]?.score}
            />
          </div>
          <div className={styles.connector}>
            <div className={styles.merger}></div>
            <div className={styles.line}></div>
          </div>
        </div>
      </section>
      <section className={`${styles.round} ${styles.semifinals}`}>
        <div className={styles.winners}>
          <div className={styles.matchups}>
            {ro4Matches.map((match, index) => (
              <Match
                key={index}
                participantIds={[match.player1, match.player2]}
                participants={tournament.participants || []}
                score={match.score}
              />
            ))}
          </div>
          <div className={styles.connector}>
            <div className={styles.merger}></div>
            <div className={styles.line}></div>
          </div>
        </div>
      </section>
      <section className={`${styles.round} ${styles.finals}`}>
        <div className={styles.winners}>
          <div className={styles.matchups}>
            {finalsMatch && (
              <Match
                participantIds={[finalsMatch.player1, finalsMatch.player2]}
                participants={tournament.participants || []}
                score={finalsMatch.score}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
