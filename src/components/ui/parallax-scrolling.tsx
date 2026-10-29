// src/components/ui/parallax-scrolling.tsx
'use client';

import { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { Diya } from '@/components/diya';
import { FairyLights } from '@/components/fairy-lights';
import { seeded } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

// Lenis is started once in App (src/lib/smooth-scroll.ts) so this component
// only owns its own timeline and doesn't kill other ScrollTriggers on unmount.

const LAYERS = [
  { layer: '1', yPercent: 70 },
  { layer: '2', yPercent: 55 },
  { layer: '3', yPercent: 40 },
  { layer: '4', yPercent: 10 },
];

const LANTERNS = [
  { left: '8%', top: '30%', s: 0.8, d: 0, c: ['#ffe6f0', '#f2a3c2', '#d77aa0'] },
  { left: '20%', top: '16%', s: 0.55, d: 1.2, c: ['#f1e6ff', '#c3a6ee', '#9a7bd0'] },
  { left: '78%', top: '22%', s: 0.65, d: 0.6, c: ['#ffe6b0', '#f3b56b', '#d98a4e'] },
  { left: '90%', top: '40%', s: 0.9, d: 1.8, c: ['#f1e6ff', '#c3a6ee', '#9a7bd0'] },
  { left: '64%', top: '10%', s: 0.45, d: 2.4, c: ['#ffe6f0', '#f2a3c2', '#d77aa0'] },
];

export interface ParallaxComponentProps {
  photo: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function ParallaxComponent({ photo, eyebrow, title, subtitle }: ParallaxComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  const stars = useMemo(() => {
    const r = seeded(3);
    return Array.from({ length: 40 }, () => ({ l: r() * 100, t: r() * 55, s: 1 + r() * 2.5, d: r() * 4 }));
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');
      if (!triggerElement) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
        },
      });

      LAYERS.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          { yPercent: layerObj.yPercent, ease: 'none' },
          idx === 0 ? undefined : '<',
        );
      });
    }, parallaxRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="parallax relative z-10" ref={parallaxRef}>
      <section className="relative h-[100svh] min-h-[620px] overflow-hidden">
        <FairyLights />
        <div data-parallax-layers className="absolute inset-0">
          {/* layer 1 · dusk sky, moon, stars, lanterns */}
          <div data-parallax-layer="1" className="absolute inset-0 will-change-transform">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#e6d3f0_0%,#f2d6e6_35%,#f9e6ee_65%,#fcf3f5_100%)]" />
            <div className="absolute right-[12%] top-[14%] size-24 rounded-full bg-[radial-gradient(circle_at_40%_40%,#fffaf0,#f6e3f0_60%,#ead3ee)] shadow-[0_0_80px_30px_rgba(255,233,200,.7)] sm:size-32" />
            {stars.map((s, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${s.l}%`,
                  top: `${s.t}%`,
                  width: s.s,
                  height: s.s,
                  animation: `twinkle ${3 + s.d}s ease-in-out ${s.d}s infinite`,
                }}
              />
            ))}
            {LANTERNS.map((l, i) => (
              <div
                key={i}
                className="absolute"
                style={{ left: l.left, top: l.top, transform: `scale(${l.s})`, animation: `float-y ${6 + i}s ease-in-out ${l.d}s infinite` }}
              >
                <div className="h-14 w-10 rounded-[40%_40%_30%_30%] opacity-80" style={{ background: `radial-gradient(ellipse at 50% 70%, ${l.c[0]}, ${l.c[1]} 55%, ${l.c[2]})`, boxShadow: `0 0 40px 14px ${l.c[1]}73` }} />
              </div>
            ))}
          </div>

          {/* layer 2 · the window (jharokha) with her photo */}
          <div data-parallax-layer="2" className="absolute inset-0 will-change-transform">
            <div className="absolute bottom-[15%] left-1/2 w-[min(58vw,300px,34svh)] -translate-x-1/2 sm:bottom-[13%]">
              <div className="absolute -inset-5 rounded-t-full bg-[radial-gradient(ellipse_at_50%_60%,rgba(255,206,140,.55),transparent_70%)] blur-xl" />
              <div className="relative aspect-[3/4] overflow-hidden rounded-t-full border-[7px] border-[#f3d9e4] bg-blush shadow-soft">
                <img src={photo} alt="" loading="eager" className="h-full w-full object-cover object-[50%_30%]" />
                <div className="pointer-events-none absolute inset-2 rounded-t-full border border-[#d5b6e8]/70" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fff0f6]/10 via-transparent to-[#efc6dc]/25" />
              </div>
            </div>
          </div>

          {/* layer 3 · title */}
          <div data-parallax-layer="3" className="absolute inset-x-0 top-[12%] px-4 text-center will-change-transform sm:top-[11%]">
            {eyebrow && (
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-cocoa-soft sm:text-xs">{eyebrow}</p>
            )}
            <h1 className="text-gold-gradient font-display text-6xl font-medium leading-[0.95] sm:text-8xl md:text-9xl">{title}</h1>
            {subtitle && <p className="mt-2 font-script text-3xl text-rose sm:text-4xl">{subtitle}</p>}
          </div>

          {/* layer 4 · ledge with diyas */}
          <div data-parallax-layer="4" className="absolute inset-0 will-change-transform">
            <div className="absolute inset-x-0 bottom-0 h-[16%] bg-[linear-gradient(180deg,#efd8e3,#e2c6d6)] shadow-[0_-10px_30px_-10px_rgba(90,65,82,.25)]">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-[#f8e6ee]" />
              <div className="absolute inset-x-0 -top-9 flex items-end justify-center gap-[7vw] sm:gap-16">
                {[38, 44, 52, 44, 38].map((s, i) => (
                  <Diya key={i} size={s} delay={i * 0.4} className={i === 0 || i === 4 ? 'hidden sm:block' : ''} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-cream to-transparent" />
        <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center text-cocoa-soft" style={{ animation: 'hint-bob 2.4s ease-in-out infinite' }}>
          <span className="text-[10px] uppercase tracking-[0.3em]">scroll slowly</span>
          <ChevronDown className="size-4" />
        </div>
      </section>
    </div>
  );
}
