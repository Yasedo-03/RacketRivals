import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const createScrollAnimation = (
  panels: (HTMLElement | null)[],
  scrollTween: React.MutableRefObject<gsap.core.Tween | null>,
  navigate: (path: string, options?: { replace?: boolean }) => void
) => {
  const ctx = gsap.context(() => {
    const observer = ScrollTrigger.normalizeScroll(true);

    document.addEventListener(
      "touchstart",
      (e) => {
        if (scrollTween.current) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      },
      { capture: true, passive: false }
    );

    function goToSection(i: number) {
      scrollTween.current = gsap.to(window, {
        scrollTo: { y: i * window.innerHeight, autoKill: false },
        onStart: () => {
          observer?.disable();
          observer?.enable();
        },
        duration: 1,
        onComplete: () => (scrollTween.current = null),
        overwrite: true,
      });
    }

    panels.forEach((panel, i) => {
      if (panel) {
        ScrollTrigger.create({
          trigger: panel,
          start: "top bottom",
          end: "+=199%",
          onToggle: (self) => {
            self.isActive && !scrollTween.current && goToSection(i);
            if (self.isActive && scrollTween.current) {
              switch (i) {
                case 0:
                  navigate("/", { replace: true });
                  break;
                case 1:
                  navigate("/tournament", { replace: true });
                  break;
                case 2:
                  navigate("/player", { replace: true });
                  break;
                default:
                  break;
              }
            }
          },
        });
      }
    });

    ScrollTrigger.create({
      start: 0,
      end: "max",
      snap: 1 / (panels.length - 1),
    });
  });

  return () => ctx.revert();
};

export const handleClick = (i: number) => {
  gsap.to(window, {
    scrollTo: { y: i * window.innerHeight, autoKill: false },
    duration: 1,
    overwrite: true,
  });
};
