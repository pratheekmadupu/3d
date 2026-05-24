"use client";

import React, { useRef, useEffect } from "react";
import gsap, { ScrollTrigger } from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import { Sparkles, Eye, Leaf } from "lucide-react";

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;
    if (!container || !textElement) return;

    // Word-by-word reveal animation
    const words = textElement.querySelectorAll(".manifesto-word");
    
    const ctx = gsap.context(() => {
      // Pinning the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1.0,
          anticipatePin: 1,
        },
      });

      // Highlight each word progressively
      tl.to(words, {
        color: "#102010",
        opacity: 1,
        textShadow: "0 0 1px rgba(46,125,50,0.2)",
        stagger: 0.1,
        ease: "power2.out",
      });

      // Floating background parallax items
      gsap.to(".parallax-bg-item", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, container);

    // Mouse-reactive environmental glow
    const handleMouseMove = (e: MouseEvent) => {
      const glow = glowRef.current;
      if (!glow) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glow, {
        x: x - 150,
        y: y - 150,
        duration: 1.2,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const manifestoText = "SAVAXA creates intelligent crop protection solutions designed for modern farming, sustainable ecosystems, and future-ready agriculture.";
  const words = manifestoText.split(" ");

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative min-h-screen bg-[#F4FFF4] flex items-center justify-center overflow-hidden py-24"
    >
      {/* Decorative Parallax Background Elements */}
      <div
        className="parallax-bg-item absolute top-[15%] left-[8%] w-[120px] h-[120px] rounded-2xl bg-white/40 border border-primary/5 shadow-2xl flex items-center justify-center opacity-60 backdrop-blur-sm pointer-events-none"
        style={{ transform: "rotate(-12deg)" }}
      >
        <Leaf className="h-10 w-10 text-primary/30" />
      </div>

      <div
        className="parallax-bg-item absolute bottom-[18%] right-[8%] w-[150px] h-[150px] rounded-3xl bg-white/40 border border-primary/5 shadow-2xl flex items-center justify-center opacity-60 backdrop-blur-sm pointer-events-none"
        style={{ transform: "rotate(15deg)" }}
      >
        <Sparkles className="h-12 w-12 text-accent/30" />
      </div>

      {/* Reactive Glow sphere */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-primary/10 to-accent/15 blur-[80px] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-8 flex flex-col items-center">
        {/* Section Label */}
        <SectionLabel number="01" text="Our Brand Manifesto" />

        {/* Word reveal core container */}
        <div className="text-center mt-6">
          <p
            ref={textRef}
            className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-primary/15 max-w-4xl"
          >
            {words.map((word, idx) => (
              <span
                key={idx}
                className="manifesto-word inline-block mr-[0.25em] transition-all duration-300 select-none opacity-20"
                style={{ willChange: "color, opacity" }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Brand highlights cards below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-20">
          <div className="glassmorphism p-6 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_12px_24px_rgba(46,125,50,0.04)] group">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
              <Leaf className="h-5 w-5" />
            </div>
            <h3 className="font-display font-semibold text-lg text-ink mb-2">Sustainable Care</h3>
            <p className="font-sans text-xs text-muted leading-relaxed">
              Formulated to nurture soils, eliminate targets, and decompose cleanly in active biosphere grids.
            </p>
          </div>

          <div className="glassmorphism p-6 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_12px_24px_rgba(46,125,50,0.04)] group">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-display font-semibold text-lg text-ink mb-2">Target Precision</h3>
            <p className="font-sans text-xs text-muted leading-relaxed">
              Engineered with chemical micro-sensors that neutralize disease vectors while preserving critical pollinators.
            </p>
          </div>

          <div className="glassmorphism p-6 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_12px_24px_rgba(46,125,50,0.04)] group">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="font-display font-semibold text-lg text-ink mb-2">Digital Integration</h3>
            <p className="font-sans text-xs text-muted leading-relaxed">
              Pairs seamlessly with precision drone delivery, field IoT sensors, and satellite crop diagnostics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
