import { FC, useLayoutEffect, useRef } from "react";
import { MainBloc } from "./MainBloc";
import { PlayerBloc } from "./PlayerBloc";
import { TournamentBloc } from "./TournamentBloc";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createScrollAnimation } from "../../gsap-helpers/scrollAnimation";
import { useNavigate } from "react-router-dom";
import styles from "./homePage.module.scss";

gsap.registerPlugin(ScrollTrigger);

export const Home: FC = () => {
  const navigate = useNavigate();
  let panels = useRef<(HTMLDivElement | null)[]>([]);
  let scrollTween = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const cleanup = createScrollAnimation(
      panels.current,
      scrollTween,
      navigate
    );
    return cleanup;
  }, []);

  return (
    <>
      <div className={styles.bloc} ref={(div) => (panels.current[0] = div)}>
        <MainBloc index={0} />
      </div>
      <div className={styles.bloc} ref={(div) => (panels.current[1] = div)}>
        <TournamentBloc index={1} />
      </div>
      <div className={styles.bloc} ref={(div) => (panels.current[2] = div)}>
        <PlayerBloc index={2} />
      </div>
    </>
  );
};
