import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  
  // Set default settings
  gsap.config({
    nullTargetWarn: false,
  });
}

export * from "gsap";
export { ScrollTrigger };
export default gsap;

