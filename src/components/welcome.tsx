import { useMemo, useState } from "react";
import type React from "react";
import { cn, seeded } from "@/lib/utils";
import { Diya } from "@/components/diya";

type Stage = "idle" | "opening" | "leaving" | "gone";

const PETALS = ["#F2B5C9", "#D7C2F0", "#F6C9A8", "#EFA3BD", "#C9B4EC"];

export function Welcome({ onOpen }: { onOpen: () => void }) {
  const [stage, setStage] = useState<Stage>("idle");

  const petals = useMemo(() => {
    const r = seeded(11);
    return Array.from({ length: 18 }, () => ({
      left: r() * 100,
      size: 8 + r() * 10,
      dur: 10 + r() * 10,
      delay: -r() * 20,
      px: (r() - 0.5) * 30 + "vw",
      c: PETALS[Math.floor(r() * PETALS.length)],
    }));
  }, []);

  const open = () => {
    if (stage !== "idle") return;
    setStage("opening");
    window.setTimeout(() => {
      setStage("leaving");
      onOpen();
    }, 2600);
    window.setTimeout(() => setStage("gone"), 3900);
  };

  if (stage === "gone") return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-cream px-6 transition-all duration-[1300ms] ease-[cubic-bezier(.22,1,.36,1)]",
        stage === "leaving" && "pointer-events-none scale-105 opacity-0 blur-sm",
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,#f7dcec_0%,#eedff5_35%,#fcf3f5_75%)]" />
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute -top-8 rounded-[60%_0_60%_0]"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.3,
              background: p.c,
              opacity: 0.7,
              animation: `petal-fall ${p.dur}s linear ${p.delay}s infinite`,
              "--px": p.px,
            } as React.CSSProperties
          }
        />
      ))}

      <div className="relative flex flex-col items-center text-center">
        <p className="animate-[soft-pulse_3s_ease-in-out_infinite] text-[11px] font-semibold uppercase tracking-[0.4em] text-cocoa-soft">
          psst… this one's for you
        </p>
        <h1 className="mt-4 font-display text-4xl italic leading-tight text-cocoa sm:text-6xl">
          For a very <span className="text-gold-gradient not-italic">special person</span>
        </h1>
        <p className="mt-3 max-w-sm text-sm text-cocoa-soft sm:text-base">
          Before the lights, the mithai and the long ride home, open this first.
        </p>

        <button
          type="button"
          onClick={open}
          aria-label="Open the envelope"
          className={cn("envelope mt-20 sm:mt-24 [@media(max-height:760px)]:mt-16", stage !== "idle" && "is-open")}
        >
          <div className="env-back" />
          <div className="env-letter">
            <span className="font-script text-3xl text-plum sm:text-4xl">Happy Diwali</span>
            <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-cocoa-soft">with love, always</span>
            <Diya size={30} className="mt-3" />
          </div>
          <div className="env-front" />
          <div className="env-flap" />
          <div className="env-seal">S</div>
        </button>

        <p
          className={cn(
            "mt-8 text-xs uppercase tracking-[0.3em] text-cocoa-soft transition-opacity duration-500",
            stage !== "idle" ? "opacity-0" : "animate-[soft-pulse_2.4s_ease-in-out_infinite]",
          )}
        >
          tap the envelope ✦
        </p>

        <div className="mt-8 flex items-end gap-10 opacity-90 [@media(max-height:640px)]:hidden">
          <Diya size={34} />
          <Diya size={42} delay={0.5} />
          <Diya size={34} delay={1} />
        </div>
      </div>
    </div>
  );
}
