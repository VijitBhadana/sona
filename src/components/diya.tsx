import type React from "react";
import { cn } from "@/lib/utils";

export function Diya({ size = 64, delay = 0, className }: { size?: number; delay?: number; className?: string }) {
  return (
    <div
      className={cn("diya", className)}
      style={{ "--s": `${size}px`, "--d": `${delay}s` } as React.CSSProperties}
      aria-hidden
    >
      <div className="diya-glow" />
      <div className="diya-flame" />
      <div className="diya-bowl" />
    </div>
  );
}

export function DiyaRow({ count = 5, size = 44, className }: { count?: number; size?: number; className?: string }) {
  return (
    <div className={cn("flex items-end justify-center gap-6 sm:gap-10", className)}>
      {Array.from({ length: count }, (_, i) => (
        <Diya key={i} size={i === Math.floor(count / 2) ? size * 1.2 : size} delay={i * 0.37} />
      ))}
    </div>
  );
}
