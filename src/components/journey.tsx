import { Coffee, MapPin, TrainFront } from "lucide-react";
import DiagonalMarqueeCarousel from "@/components/ui/great-ui-diagonal-marquee-carousel";
import { Reveal } from "@/components/reveal";

const WISHES = [
  { icon: TrainFront, text: "window seat" },
  { icon: Coffee, text: "garam chai" },
  { icon: MapPin, text: "smooth safar" },
];

export function Journey() {
  return (
    <section className="relative z-10 min-h-[100svh] overflow-hidden">
      <DiagonalMarqueeCarousel
        className="absolute inset-0 h-full opacity-70"
        angle={-18}
        baseSpeed={95}
        cardClassName="h-[170px] w-[130px] md:h-[250px] md:w-[190px] rounded-2xl"
        fadeClassName="h-1/3"
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(252,243,245,.94)_0%,rgba(252,243,245,.6)_45%,rgba(252,243,245,.15)_100%)]" />

      <div className="pointer-events-none relative z-20 flex min-h-[100svh] items-center justify-center px-5">
        <Reveal className="pointer-events-auto w-full max-w-xl">
          <div className="rounded-[32px] border border-white/70 bg-ivory/70 px-7 py-12 text-center shadow-soft backdrop-blur-md sm:px-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cocoa-soft">✦ before you go ✦</p>
            <h2 className="text-gold-gradient mt-3 pb-2 font-script text-6xl sm:text-8xl">Happy Journey</h2>
            <p className="mt-4 font-display text-xl leading-relaxed text-cocoa sm:text-2xl">
              Window seat mile, chai garam mile, aur raasta ekdum smooth ho.
            </p>
            <p className="mt-2 text-sm text-cocoa-soft">Bas safely pahunchna, that's the only rule.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-2">
              {WISHES.map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#ecd3df] bg-cream/80 px-3.5 py-1.5 text-xs text-cocoa"
                >
                  <Icon className="size-3.5 text-gold" /> {text}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
