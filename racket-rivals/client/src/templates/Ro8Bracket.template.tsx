import { FC } from "react";
import { ITournament } from "../services/tournaments/interfaces/tournamentInterface";
import styles from "./Ro8Bracket.module.scss";

interface Ro8BracketProps {
  tournament: ITournament;
}

export const Match: FC<{ participants: any[] | undefined }> = ({
  participants,
}) => (
  <div className={styles.matchup}>
    <div className={styles.participants}>
      {participants?.map((participant, index) => (
        <div key={index} className={`${styles.participant} ${styles.winner}`}>
          <span className={styles.participantName}>
            {participant?.firstName} {participant?.lastName}
          </span>
          <span className={styles.score}>{participant?.score || 0}</span>
        </div>
      ))}
    </div>
  </div>
);

export const Ro8Bracket: FC<Ro8BracketProps> = ({ tournament }) => {
  return (
    <div className={styles.bracket}>
      <section className={`${styles.round} ${styles.quarterfinals}`}>
        <div className={styles.winners}>
          <div className={styles.matchups}>
            <Match
              participants={[
                tournament?.participants?.[0],
                tournament?.participants?.[7],
              ]}
            />
            <Match
              participants={[
                tournament?.participants?.[2],
                tournament?.participants?.[5],
              ]}
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
              participants={[
                tournament?.participants?.[3],
                tournament?.participants?.[4],
              ]}
            />
            <Match
              participants={[
                tournament?.participants?.[6],
                tournament?.participants?.[1],
              ]}
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
            <Match
              participants={[{ firstName: "Uno" }, { firstName: "Dos" }]}
            />
            <Match
              participants={[{ firstName: "Seis" }, { firstName: "Cinco" }]}
            />
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
            <Match
              participants={[{ firstName: "Uno" }, { firstName: "Seis" }]}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
