import { FC } from "react";
import { ITournament } from "../services/tournaments/interfaces/tournamentInterface";
import styles from "./Ro8Bracket.module.scss";
interface Ro8BracketProps {
  tournament: ITournament;
}

export const Ro8Bracket: FC<Ro8BracketProps> = ({ tournament }) => {
  console.log(tournament);

  return (
    <div className={styles.bracket}>
      <section className={`${styles.round} ${styles.quarterfinals}`}>
        <div className={styles.winners}>
          <div className={styles.matchups}>
            <div className={styles.matchup}>
              <div className={styles.participants}>
                <div className={`${styles.participant} ${styles.winner}`}>
                  <span>
                    {tournament.participants?.[0]?.firstName}{" "}
                    {tournament.participants?.[0]?.lastName}
                  </span>
                  <span>3</span>
                </div>
                <div className={`${styles.participant} ${styles.loser}`}>
                  <span>
                    {tournament.participants?.[7]?.firstName}{" "}
                    {tournament.participants?.[7]?.lastName}
                  </span>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className={styles.matchup}>
              <div className={styles.participants}>
                <div className={styles.participant}>
                  <span>
                    {tournament.participants?.[2]?.firstName}{" "}
                    {tournament.participants?.[2]?.lastName}
                  </span>
                </div>
                <div className={`${styles.participant} ${styles.winner}`}>
                  <span>
                    {tournament.participants?.[5]?.firstName}{" "}
                    {tournament.participants?.[5]?.lastName}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.connector}>
            <div className={styles.merger}></div>
            <div className={styles.line}></div>
          </div>
        </div>
        <div className={styles.winners}>
          <div className={styles.matchups}>
            <div className={styles.matchup}>
              <div className={styles.participants}>
                <div className={styles.participant}>
                  <span>
                    {tournament.participants?.[3]?.firstName}{" "}
                    {tournament.participants?.[3]?.lastName}
                  </span>
                </div>
                <div className={`${styles.participant} ${styles.winner}`}>
                  <span>
                    {tournament.participants?.[4]?.firstName}{" "}
                    {tournament.participants?.[4]?.lastName}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.matchup}>
              <div className={styles.participants}>
                <div className={styles.participant}>
                  <span>
                    {tournament.participants?.[6]?.firstName}{" "}
                    {tournament.participants?.[6]?.lastName}
                  </span>
                </div>
                <div className={`${styles.participant} ${styles.winner}`}>
                  <span>
                    {tournament.participants?.[1]?.firstName}{" "}
                    {tournament.participants?.[1]?.lastName}
                  </span>
                </div>
              </div>
            </div>
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
            <div className={styles.matchup}>
              <div className={styles.participants}>
                <div className={`${styles.participant} ${styles.winner}`}>
                  <span>Uno</span>
                </div>
                <div className={styles.participant}>
                  <span>Dos</span>
                </div>
              </div>
            </div>
            <div className={styles.matchup}>
              <div className={styles.participants}>
                <div className={`${styles.participant} ${styles.winner}`}>
                  <span>Seis</span>
                </div>
                <div className={styles.participant}>
                  <span>Cinco</span>
                </div>
              </div>
            </div>
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
            <div className={styles.matchup}>
              <div className={styles.participants}>
                <div className={`${styles.participant} ${styles.winner}`}>
                  <span>Uno</span>
                </div>
                <div className={styles.participant}>
                  <span>Seis</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
