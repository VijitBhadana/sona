const PHRASE = "Sona ✦ Guddu ✦ ";
const ROWS = 11;

/** The two names drifting diagonally behind everything, barely there. */
export function NameDrift() {
  const line = PHRASE.repeat(8);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-1/2 flex w-[260vmax] -translate-x-1/2 -translate-y-1/2 -rotate-[24deg] flex-col gap-6 sm:gap-10">
        {Array.from({ length: ROWS }, (_, i) => (
          <div
            key={i}
            data-drift
            className="flex w-max whitespace-nowrap font-script text-5xl text-[#9b6aa8]/[0.075] sm:text-7xl"
            style={{ animation: `${i % 2 ? "drift-right" : "drift-left"} ${90 + i * 9}s linear infinite` }}
          >
            <span className="pr-6">{line}</span>
            <span className="pr-6">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
