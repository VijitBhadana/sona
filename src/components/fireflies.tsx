import { useMemo } from "react";
import type React from "react";
import { seeded } from "@/lib/utils";

const GLOWS = ["255,214,140", "244,170,200", "200,175,240"]; // gold, pink, lilac

/** Soft glowing specks floating around the page. */
export function Fireflies({ count = 22 }: { count?: number }) {
  const dots = useMemo(() => {
    const r = seeded(7);
    return Array.from({ length: count }, () => ({
      left: r() * 100,
      top: r() * 100,
      size: 3 + r() * 5,
      dur: 9 + r() * 10,
      delay: -r() * 15,
      fx: (r() - 0.5) * 160,
      fy: (r() - 0.5) * 160,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={
            {
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
              background: `radial-gradient(circle, rgba(${GLOWS[i % GLOWS.length]},.95), rgba(${GLOWS[i % GLOWS.length]},0))`,
              boxShadow: `0 0 12px 3px rgba(${GLOWS[i % GLOWS.length]},.35)`,
              animation: `firefly ${d.dur}s ease-in-out ${d.delay}s infinite`,
              "--fx": `${d.fx}px`,
              "--fy": `${d.fy}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
