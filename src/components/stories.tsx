import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORIES } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const TILTS = [-2.5, 1.8, -1.2, 2.4, -2, 1.4, -1.6, 2];

/**
 * Pinned section: scrolling down slides the stories from left to right.
 * The track starts shifted left (so its right end is in view) and moves to x = 0,
 * which is why the list is reversed in the DOM: story 01 is the first one you see.
 */
export function Stories() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.fromTo(
        track,
        { x: () => -distance() },
        {
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${distance() * 1.15}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const ordered = [...STORIES].reverse();

  return (
    <section ref={sectionRef} className="relative z-10 flex h-[100svh] flex-col justify-center overflow-hidden">
      <div className="mx-auto mb-6 w-full max-w-6xl px-6 sm:mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cocoa-soft">chapter one</p>
        <h2 className="mt-2 font-display text-4xl text-cocoa sm:text-6xl">
          Little stories <span className="font-script text-rose">of you</span>
        </h2>
        <div className="mt-4 h-[2px] w-40 overflow-hidden rounded-full bg-[#ead2de]">
          <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-rose to-lilac" />
        </div>
      </div>

      <div ref={trackRef} className="flex w-max items-center gap-8 px-[10vw] will-change-transform sm:gap-14">
        {ordered.map((s) => (
          <figure
            key={s.id}
            className="relative w-[62vw] max-w-[290px] shrink-0 rounded-md bg-ivory p-3 pb-5 shadow-polaroid sm:w-[290px]"
            style={{ rotate: `${TILTS[s.id - 1]}deg` }}
          >
            <span className="absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 rotate-3 rounded-sm bg-[#e4d5f2]/80" />
            <div className="aspect-[4/5] overflow-hidden rounded-[3px] bg-blush/50">
              <img
                src={s.src}
                alt={s.title}
                draggable={false}
                className="h-full w-full object-cover"
                style={{ objectPosition: s.focus }}
              />
            </div>
            <figcaption className="px-1 pt-4 text-center">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cocoa-soft">
                story {String(s.id).padStart(2, "0")}
              </span>
              <p className="font-script text-3xl leading-tight text-plum">{s.title}</p>
              <p className="mt-1 font-display text-base italic leading-snug text-cocoa">{s.line}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-8 text-center text-[10px] uppercase tracking-[0.3em] text-cocoa-soft sm:mt-12">
        keep scrolling, the stories drift in from the left →
      </p>
    </section>
  );
}
