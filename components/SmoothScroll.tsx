"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap, { ScrollTrigger } from "@/lib/gsap";
import { setLenis, destroyLenis } from "@/lib/lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    // Register into singleton so other components can subscribe
    setLenis(lenis);

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const updateGsap = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateGsap);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateGsap);
      lenis.destroy();
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
}
