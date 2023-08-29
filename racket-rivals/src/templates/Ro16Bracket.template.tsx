import { FC } from "react";
import styles from "./Ro16Bracket.module.scss";

export const Ro16Bracket: FC = () => {
  return (
    <div className={styles.bracket}>
      <section className={`${styles.round} ${styles.ro16}`}>
        <div className={styles.winners}>
          <div className={styles.matchups}>
            <div className={styles.matchup}>
              <div className={styles.participants}>
                <div className={`${styles.participant} ${styles.winner}`}>
                  <span>Uno</span>
                  <span>3</span>
                </div>
                <div className={`${styles.participant} ${styles.loser}`}>
                  <span>Ocho</span>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className={styles.matchup}>
              <div className={styles.participants}>
                <div className={styles.participant}>
                  <span>Dos</span>
                </div>
                <div className={`${styles.participant} ${styles.winner}`}>
                  <span>Siete</span>
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
                  <span>Treis</span>
                </div>
                <div className={`${styles.participant} ${styles.winner}`}>
                  <span>Seis</span>
                </div>
              </div>
            </div>
            <div className={styles.matchup}>
              <div className={styles.participants}>
                <div className={styles.participant}>
                  <span>Cuatro</span>
                </div>
                <div className={`${styles.participant} ${styles.winner}`}>
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
        <div className={styles.winners}>
          <div className={styles.matchups}>
            <div className={styles.matchup}>
              <div className={styles.participants}>
                <div className={`${styles.participant} ${styles.winner}`}>
                  <span>Uno</span>
                  <span>3</span>
                </div>
                <div className={`${styles.participant} ${styles.loser}`}>
                  <span>Ocho</span>
                  <span>0</span>
                </div>
              </div>
            </div>
            <div className={styles.matchup}>
              <div className={styles.participants}>
                <div className={styles.participant}>
                  <span>Dos</span>
                </div>
                <div className={`${styles.participant} ${styles.winner}`}>
                  <span>Siete</span>
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
                  <span>Treis</span>
                </div>
                <div className={`${styles.participant} ${styles.winner}`}>
                  <span>Seis</span>
                </div>
              </div>
            </div>
            <div className={styles.matchup}>
              <div className={styles.participants}>
                <div className={styles.participant}>
                  <span>Cuatro</span>
                </div>
                <div className={`${styles.participant} ${styles.winner}`}>
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
      <section className={`${styles.round} ${styles.quarterFinals}`}>
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
        <div className={`${styles.winnersBot} ${styles.winners}`}>
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
      <section className={`${styles.round} ${styles.semiFinals}`}>
        <div className={styles.winners}>
          <div className={styles.matchups}>
            <div className={`${styles.matchup} ${styles.top}`}>
              <div className={styles.participants}>
                <div className={`${styles.participant} ${styles.winner}`}>
                  <span>Uno</span>
                </div>
                <div className={styles.participant}>
                  <span>Seis</span>
                </div>
              </div>
            </div>
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
