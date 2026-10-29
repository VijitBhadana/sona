import { forwardRef } from "react";
import { CalendarHeart, PartyPopper } from "lucide-react";
import { DiyaRow } from "@/components/diya";
import { Reveal } from "@/components/reveal";

function daysUntilNov14() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let target = new Date(now.getFullYear(), 10, 14);
  if (target < today) target = new Date(now.getFullYear() + 1, 10, 14);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

export const Finale = forwardRef<HTMLElement, { onMoreBalloons: () => void }>(function Finale({ onMoreBalloons }, ref) {
  const days = daysUntilNov14();

  return (
    <section ref={ref} className="relative z-10 px-5 pb-24 pt-16">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cocoa-soft">✦ yay ✦</p>
          <h2 className="text-gold-gradient mt-3 font-display text-5xl font-medium leading-tight sm:text-7xl">
            Happy &amp; Safe Diwali
          </h2>
          <DiyaRow className="mt-10" />
          <p className="mx-auto mt-8 max-w-xl font-display text-xl leading-relaxed text-cocoa sm:text-2xl">
            Diye jalana, mithai khaana, patakhon se thoda door rehna, aur bahut saara muskurana. 🪔
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <Reveal delay={100}>
            <div className="flex h-full flex-col items-center rounded-[28px] border border-[#ecd3df] bg-ivory/80 px-6 py-9 shadow-soft backdrop-blur-sm">
              <CalendarHeart className="size-5 text-rose" />
              <p className="mt-3 font-script text-4xl text-cocoa">Catch you at</p>
              <div className="mt-4 w-28 overflow-hidden rounded-2xl border border-[#e8d0dc] bg-white shadow-polaroid">
                <div className="bg-gradient-to-r from-[#eaa9c0] to-[#c3a9ea] py-1.5 text-xs font-bold tracking-[0.3em] text-white">NOV</div>
                <div className="py-3 font-display text-5xl font-semibold text-cocoa">14</div>
              </div>
              <p className="mt-4 text-sm text-cocoa-soft">
                {days === 0 ? "it's today!!" : `${days} ${days === 1 ? "day" : "days"} to go, already counting`}
              </p>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <div className="flex h-full flex-col items-center justify-center rounded-[28px] border border-[#ecd3df] bg-ivory/80 px-6 py-9 shadow-soft backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-cocoa-soft">one tiny request</p>
              <div className="mt-5 w-full max-w-[260px] space-y-2 text-left">
                <div className="w-fit rounded-2xl rounded-bl-md bg-[#f1e4f5] px-4 py-2.5 text-sm text-cocoa shadow-sm">
                  Ghar pahunch ke ping kar dena 📱
                </div>
                <div className="w-fit rounded-2xl rounded-bl-md bg-[#f1e4f5] px-4 py-2.5 text-sm text-cocoa shadow-sm">
                  bas ek "reached" bhi chalega 🙂
                </div>
                <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-[#f1e4f5] px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="size-1.5 rounded-full bg-cocoa-soft"
                      style={{ animation: `typing 1.2s ease-in-out ${i * 0.15}s infinite` }}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-5 text-sm text-cocoa-soft">I'll be waiting for that text.</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <button
            type="button"
            onClick={onMoreBalloons}
            className="mt-14 inline-flex items-center gap-2 rounded-full border border-[#e3c8d6] bg-ivory/90 px-6 py-3 text-sm text-cocoa shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <PartyPopper className="size-4 text-plum" /> more balloons please
          </button>
        </Reveal>
      </div>
    </section>
  );
});
