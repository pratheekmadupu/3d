"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "@/lib/gsap";

const LOADING_WORDS = [
  "NATURE",
  "INTELLIGENCE",
  "SUSTAINABILITY",
  "PROTECTION",
  "FUTURE",
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const curveRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // 1. Digital loader counter animation
    const loaderObj = { value: 0 };
    const counterTimeline = gsap.timeline({
      onComplete: () => {
        animateOut();
      },
    });

    counterTimeline.to(loaderObj, {
      value: 100,
      duration: 3.2,
      ease: "power2.out",
      onUpdate: () => {
        const rounded = Math.floor(loaderObj.value);
        setProgress(rounded);
      },
    });

    // 2. Cycle through values/words
    const wordInterval = setInterval(() => {
      setWordIdx((prev) => (prev < LOADING_WORDS.length - 1 ? prev + 1 : prev));
    }, 600);

    // 3. Slide-up reveal using curved SVG path
    const animateOut = () => {
      const container = containerRef.current;
      const curve = curveRef.current;
      if (!container || !curve) return;

      const duration = 1.0;
      const delay = 0.2;

      // Animate word and percentage out
      gsap.to(textContainerRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.inOut",
      });

      // Warp/curve slide-up effect
      const initialPath = curve.getAttribute("d") || "";
      const targetPath = "M0 0 L100 0 L100 0 Q50 0 0 0 Z";

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.to(curve, {
        attr: { d: targetPath },
        duration: duration,
        ease: "power4.in",
      });

      tl.to(
        container,
        {
          yPercent: -100,
          duration: duration,
          ease: "power4.inOut",
        },
        `-=${duration}`
      );
    };

    return () => {
      clearInterval(wordInterval);
    };
  }, [onComplete]);

  // Handle path dimensions for curve warping on exit
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-ink overflow-hidden"
    >
      {/* Curved SVG background masking that bends upward on reveal */}
      <svg
        className="absolute top-full left-0 w-full h-[15vh] fill-ink pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={curveRef}
          d="M0 0 L100 0 L100 0 Q50 100 0 0 Z"
        />
      </svg>

      <div
        ref={textContainerRef}
        className="flex flex-col items-center select-none text-center"
      >
        {/* Animated Brand Emblem */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border border-primary/30 flex items-center justify-center animate-spin [animation-duration:12s]">
            <div className="h-10 w-10 rounded-full border border-dashed border-accent/40" />
          </div>
          <span className="absolute text-accent font-display text-lg font-bold tracking-widest animate-pulse">
            S
          </span>
        </div>

        {/* Fading words representing brand concepts */}
        <div className="h-12 overflow-hidden mb-2">
          <p className="font-editorial text-2xl italic text-white/90 tracking-wide transition-all duration-300">
            {LOADING_WORDS[wordIdx]}
          </p>
        </div>

        <p className="font-display text-xs tracking-[0.25em] text-muted uppercase font-semibold mb-6">
          SAVAXA AG-TECH COLLABORATIVE
        </p>

        {/* Dynamic numerical counter */}
        <div className="flex items-baseline font-display text-8xl font-bold text-white leading-none">
          <span ref={progressTextRef}>{progress}</span>
          <span className="text-xl text-accent font-light ml-1">%</span>
        </div>
      </div>

      {/* Atmospheric organic ambient light behind loader */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] pointer-events-none animate-pulse-glow" />
    </div>
  );
}
