import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
const tick = (time: number) => lenis?.raf(time * 1000);

export function initLenis() {
  if (lenis) return lenis;
  lenis = new Lenis({ lerp: 0.075, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function destroyLenis() {
  gsap.ticker.remove(tick);
  lenis?.destroy();
  lenis = null;
}

export const getLenis = () => lenis;
