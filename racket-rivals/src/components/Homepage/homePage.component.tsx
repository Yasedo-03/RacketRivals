import { useLayoutEffect, useRef } from "react";
import { MainBloc } from "./MainBloc";
import { PlayerBloc } from "./PlayerBloc";
import { TournamentBloc } from "./TournamentBloc";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createScrollAnimation } from "../../gsap-helpers/scrollAnimation";

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  let panels = useRef<(HTMLDivElement | null)[]>([]);
  let scrollTween = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const cleanup = createScrollAnimation(panels.current, scrollTween);
    return cleanup;
  }, []);

  return (
    <>
      <div ref={(div) => (panels.current[0] = div)}>
        <MainBloc index={0} />
      </div>
      <div ref={(div) => (panels.current[1] = div)}>
        <TournamentBloc index={1} />
      </div>
      <div ref={(div) => (panels.current[2] = div)}>
        <PlayerBloc index={2} />
      </div>
    </>
  );
};
