import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { destroyLenis, getLenis, initLenis } from "@/lib/smooth-scroll";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import { Welcome } from "@/components/welcome";
import { NameDrift } from "@/components/name-drift";
import { Fireflies } from "@/components/fireflies";
import { Note } from "@/components/note";
import { Stories } from "@/components/stories";
import { Journey } from "@/components/journey";
import { MissYou } from "@/components/miss-you";
import { Balloons } from "@/components/balloons";
import { Finale } from "@/components/finale";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [saidYes, setSaidYes] = useState(false);
  const [wave, setWave] = useState(0);
  const finaleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const lenis = initLenis();
    lenis.stop();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      destroyLenis();
    };
  }, []);

  useEffect(() => {
    if (!opened) return;
    window.scrollTo(0, 0);
    getLenis()?.start();
    ScrollTrigger.refresh();
  }, [opened]);

  useEffect(() => {
    if (!saidYes) return;
    ScrollTrigger.refresh();
    const t = window.setTimeout(() => {
      if (finaleRef.current) getLenis()?.scrollTo(finaleRef.current, { offset: -20, duration: 2.4 });
    }, 900);
    return () => window.clearTimeout(t);
  }, [saidYes]);

  const sayYes = () => {
    setSaidYes(true);
    setWave((w) => w + 1);
  };

  return (
    <main className="grain relative min-h-screen bg-cream">
      {!opened && <Welcome onOpen={() => setOpened(true)} />}

      <NameDrift />
      <Fireflies />

      <ParallaxComponent
        photo="/photos/p2.jpg"
        eyebrow="for my special person"
        title="Happy Diwali"
        subtitle="may your days glow like diyas"
      />
      <Note />
      <Stories />
      <Journey />
      <MissYou answered={saidYes} onYes={sayYes} />
      {saidYes && <Finale ref={finaleRef} onMoreBalloons={() => setWave((w) => w + 1)} />}

      <footer className="relative z-10 pb-12 pt-6 text-center">
        <p className="font-script text-2xl text-rose">Sona · Guddu</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-cocoa-soft">made with a lot of love, for one very special person</p>
      </footer>

      {wave > 0 && <Balloons key={wave} />}
    </main>
  );
}
