import { useMemo } from "react";
import type React from "react";

const COLORS: [string, string][] = [
  ["#F6CFCB", "#E3A3A1"], // blush
  ["#F8DDAF", "#E5B46B"], // gold
  ["#DED3EE", "#B8A6D8"], // lavender
  ["#E9DBF8", "#C2A5E6"], // lilac
  ["#FAD3E2", "#E79BBB"], // pink
  ["#F4BFCB", "#DC8FA4"], // rose
  ["#FFF0C8", "#F0D184"], // butter
];

/** A sky full of balloons drifting up from the bottom of the screen. */
export function Balloons({ count = 46 }: { count?: number }) {
  const balloons = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const [c, c2] = COLORS[i % COLORS.length];
        return {
          left: Math.random() * 96,
          size: 46 + Math.random() * 40,
          dur: 7 + Math.random() * 6,
          delay: Math.random() * 3.5,
          sway: 2.4 + Math.random() * 2,
          drift: (Math.random() - 0.5) * 160,
          c,
          c2,
        };
      }),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden>
      {balloons.map((b, i) => (
        <div
          key={i}
          className="balloon"
          style={
            {
              left: `${b.left}%`,
              "--dur": `${b.dur}s`,
              "--delay": `${b.delay}s`,
              "--sway": `${b.sway}s`,
              "--drift": `${b.drift}px`,
              "--size": `${b.size}px`,
              "--c": b.c,
              "--c2": b.c2,
            } as React.CSSProperties
          }
        >
          <div className="balloon-inner">
            <div className="balloon-body" />
            <div className="balloon-knot" />
            <svg width="20" height="110" viewBox="0 0 20 110" className="-mt-px">
              <path
                d="M10 0 C 2 18, 18 36, 10 55 S 2 92, 10 110"
                fill="none"
                stroke="rgba(90,65,82,.35)"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
