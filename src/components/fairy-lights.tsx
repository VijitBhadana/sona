import type React from "react";
import { cn } from "@/lib/utils";

const BULBS = ["#F7B3CB", "#CDB4F2", "#FFD9A0", "#F29BBB", "#B9A0EC"];
const SWAGS = [62, 78, 62, 78]; // how far each swag of wire dips, in px
const PER_SWAG = 6;
const HEIGHT = 140;

const STAR = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";

const ORNAMENTS = [
  { left: "25%", thread: "h-[40px] sm:h-[78px]", size: 24, from: "#F7C6D8", to: "#E58FB1", delay: 0 },
  { left: "50%", thread: "h-[14px] sm:h-[26px]", size: 18, from: "#FFE3B5", to: "#E8B4C8", delay: 0.8 },
  { left: "75%", thread: "h-[56px] sm:h-[100px]", size: 28, from: "#DCCBF7", to: "#A98BDB", delay: 1.6 },
];

/** Swags of fairy lights along the top edge, with a few stars hanging from the hooks. */
export function FairyLights({ className }: { className?: string }) {
  const width = 1000 / SWAGS.length;

  const bulbs = SWAGS.flatMap((dip, i) => {
    const x0 = i * width;
    const ctrl = 2 * dip - 2; // quadratic control point so the midpoint sits at `dip`
    return Array.from({ length: PER_SWAG }, (_, k) => {
      const t = (k + 0.5) / PER_SWAG;
      const y = (1 - t) ** 2 * 2 + 2 * (1 - t) * t * ctrl + t ** 2 * 2;
      return { x: (x0 + width * t) / 10, y, color: BULBS[(i * PER_SWAG + k) % BULBS.length], delay: ((i * 7 + k * 3) % 10) * 0.33 };
    });
  });

  return (
    <div className={cn("pointer-events-none absolute inset-x-0 top-0 z-30", className)} style={{ height: HEIGHT }} aria-hidden>
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 1000 ${HEIGHT}`} preserveAspectRatio="none">
        {SWAGS.map((dip, i) => {
          const x0 = i * width;
          return (
            <path
              key={i}
              d={`M ${x0} 2 Q ${x0 + width / 2} ${2 * dip - 2} ${x0 + width} 2`}
              fill="none"
              stroke="#a78bb4"
              strokeOpacity="0.55"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      {bulbs.map((b, i) => (
        <span
          key={i}
          className="absolute flex -translate-x-1/2 flex-col items-center"
          style={{ left: `${b.x}%`, top: b.y - 1 }}
        >
          <span className="h-[4px] w-[4px] rounded-[1px] bg-[#8f7896]" />
          <span
            className="h-[12px] w-[8px] rounded-full"
            style={
              {
                background: `radial-gradient(circle at 40% 35%, #fffaf3 0 18%, ${b.color} 60%)`,
                boxShadow: `0 0 10px 3px ${b.color}99, 0 0 22px 6px ${b.color}40`,
                animation: `bulb 2.8s ease-in-out ${b.delay}s infinite`,
              } as React.CSSProperties
            }
          />
        </span>
      ))}

      {ORNAMENTS.map((o) => (
        <div
          key={o.left}
          className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
          style={{ left: o.left, transformOrigin: "50% 0", animation: `sway 5s ease-in-out ${o.delay}s infinite` }}
        >
          <span className={cn("w-px bg-[#a78bb4]/60", o.thread)} />
          <span style={{ filter: `drop-shadow(0 0 8px ${o.to}aa)` }}>
            <span
              className="block"
              style={{
                width: o.size,
                height: o.size,
                clipPath: STAR,
                background: `linear-gradient(160deg, #fffaf6 0%, ${o.from} 35%, ${o.to} 100%)`,
              }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}
