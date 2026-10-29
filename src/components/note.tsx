import { Reveal } from "@/components/reveal";

export function Note() {
  return (
    <section className="relative z-10 px-5 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-2xl">
        <div className="relative rounded-[28px] border border-[#ecd3df] bg-ivory/80 px-7 py-12 text-center shadow-soft backdrop-blur-sm sm:px-14">
          <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 rounded-sm bg-blush/80" />
          <p className="font-script text-4xl text-rose sm:text-5xl">Dear special person,</p>
          <p className="mt-6 font-display text-xl leading-relaxed text-cocoa sm:text-2xl">
            This Diwali you're heading home, and honestly, everything here is going to feel a little dimmer
            without you around.
          </p>
          <p className="mt-4 font-display text-xl leading-relaxed text-cocoa sm:text-2xl">
            So before you leave, here's a tiny corner of the internet, lit up only for you. 🪔
          </p>
          <p className="mt-8 text-xs uppercase tracking-[0.3em] text-cocoa-soft">keep scrolling, slowly</p>
        </div>
      </Reveal>
    </section>
  );
}
