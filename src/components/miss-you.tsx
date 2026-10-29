import { useCallback, useRef, useState } from "react";
import { Heart } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const TEASES = [
  "Arey, pakad ke dikhao 😌",
  "Itna aasaan nahi hai…",
  "Jhooth mat bolo 🙈",
  "Bas karo, Yes daba do na",
  "Even the button knows the truth 💛",
];

export function MissYou({ answered, onYes }: { answered: boolean; onYes: () => void }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [tries, setTries] = useState(0);
  const lastFlee = useRef(0);

  // Jump the "No" button to a random spot inside the visible part of the section,
  // far enough from where it was that the pointer can't catch it.
  const flee = useCallback(() => {
    const btn = noRef.current;
    const area = areaRef.current;
    if (!btn || !area) return;
    // a tap fires touchstart + click together; only jump once
    const now = performance.now();
    if (now - lastFlee.current < 300) return;
    lastFlee.current = now;

    const b = btn.getBoundingClientRect();
    // where the button sits without any translate, read from the live (possibly mid-transition) transform
    const m = new DOMMatrixReadOnly(getComputedStyle(btn).transform);
    const baseX = b.left - m.m41;
    const baseY = b.top - m.m42;
    const a = area.getBoundingClientRect();
    const pad = 12;
    const minX = a.left + pad;
    const maxX = a.right - b.width - pad;
    const minY = Math.max(a.top, 0) + pad;
    const maxY = Math.min(a.bottom, window.innerHeight) - b.height - pad;

    let tx = b.left;
    let ty = b.top;
    for (let i = 0; i < 24; i++) {
      tx = minX + Math.random() * Math.max(0, maxX - minX);
      ty = minY + Math.random() * Math.max(0, maxY - minY);
      if (Math.hypot(tx - b.left, ty - b.top) > 170) break;
    }
    setOffset({ x: tx - baseX, y: ty - baseY });
    setTries((n) => n + 1);
  }, []);

  return (
    <section className="relative z-10 px-5 py-20">
      <div
        ref={areaRef}
        className="relative mx-auto flex min-h-[82svh] max-w-4xl flex-col items-center justify-center text-center"
      >
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cocoa-soft">okay, one honest question</p>
          <h2 className="mt-4 font-display text-5xl leading-tight text-cocoa sm:text-7xl">
            Going to miss you<span className="text-rose">…</span>
          </h2>
          <p className="mt-3 font-display text-xl italic text-cocoa-soft sm:text-2xl">a lot. like, a lot a lot. 🥺</p>
          <p className="mt-8 font-script text-4xl text-plum sm:text-5xl">and you?</p>
        </Reveal>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
          <button
            type="button"
            onClick={onYes}
            className={cn(
              "group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#eaa9c0] via-[#d9b0e0] to-[#c3a9ea] px-7 py-4 text-sm font-semibold text-[#4a3046] shadow-[0_18px_40px_-18px_rgba(192,138,72,.8)] transition-all duration-300 hover:shadow-[0_22px_50px_-18px_rgba(192,138,72,.9)] sm:text-base",
              answered && "pointer-events-none",
            )}
            style={{ transform: `scale(${Math.min(1 + tries * 0.05, 1.3)})` }}
          >
            <Heart className="size-4 fill-[#9c7cc6] text-[#9c7cc6] transition-transform group-hover:scale-125" />
            Yes… I am also going to miss u
          </button>

          <button
            ref={noRef}
            type="button"
            onMouseEnter={flee}
            onTouchStart={flee}
            onClick={flee}
            className={cn(
              "relative z-30 rounded-full border border-[#e3c8d6] bg-ivory/90 px-6 py-3.5 text-sm text-cocoa-soft shadow-sm transition-[transform,opacity] duration-[420ms] ease-[cubic-bezier(.34,1.56,.64,1)] sm:text-base",
              answered && "pointer-events-none opacity-0",
            )}
            style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          >
            No, I am not going to miss u at all
          </button>
        </div>

        <p className="mt-8 h-6 text-sm text-cocoa-soft transition-opacity">
          {answered ? "I knew it 😌" : tries > 0 ? TEASES[(tries - 1) % TEASES.length] : ""}
        </p>
      </div>
    </section>
  );
}
