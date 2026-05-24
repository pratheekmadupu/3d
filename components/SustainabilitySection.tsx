"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import { Leaf, Droplets, ShieldAlert, Sparkles, Sprout } from "lucide-react";

const PILLARS = [
  {
    id: "soil",
    title: "Organic Soil Protection",
    description: "SAVAXA's unique active molecules decompose cleanly within days, enriching microbial soil layers instead of leaving toxic residues.",
    metric: "Zero Residue",
    icon: Sprout,
  },
  {
    id: "water",
    title: "Eco Water Conservation",
    description: "Our moisture-retentive leaf coatings decrease transpirational water loss in crops, preserving ground water reservoirs.",
    metric: "-40% Water Draw",
    icon: Droplets,
  },
  {
    id: "biodiversity",
    title: "Bioprotective Balance",
    description: "Highly selective pest neutralization maintains complete ecological safety for critical insect pollinators and local bird species.",
    metric: "100% Bee Safe",
    icon: Leaf,
  },
];

export default function SustainabilitySection() {
  const [activePillar, setActivePillar] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scroll reveal animations
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sustainability-fade-in",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
          },
        }
      );

      // Rotate orbital layout
      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          rotation: 360,
          duration: 25,
          repeat: -1,
          ease: "none",
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="sustainability"
      className="relative min-h-screen bg-[#F4FFF4] py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative organic blurred glowing blobs */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      {/* Floating Leaves Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] right-[15%] w-8 h-8 rounded-full border border-primary/10 flex items-center justify-center animate-float-slow">
          <Leaf className="h-4 w-4 text-primary/40" />
        </div>
        <div className="absolute bottom-[30%] left-[20%] w-10 h-10 rounded-full border border-accent/15 flex items-center justify-center animate-float-medium">
          <Sparkles className="h-4 w-4 text-accent/50" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Title */}
        <div className="max-w-3xl mb-20 sustainability-fade-in">
          <SectionLabel number="05" text="Ecosystem & Sustainability" />
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink tracking-tight mt-4">
            Protecting the Harvest, <br />
            <span className="font-editorial italic text-primary font-medium">
              Nurturing the Biosphere.
            </span>
          </h2>
          <p className="font-sans text-sm text-muted mt-6 max-w-xl leading-relaxed">
            Sustainability is not a supplementary feature of SAVAXA; it is our primary design constraint. We create chemistry that acts as a helper to natural biomes.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Rotating Interactive Orbital Ecosystem */}
          <div className="lg:col-span-5 flex justify-center sustainability-fade-in relative py-12">
            
            {/* Orbit container */}
            <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px]">
              
              {/* Central Glowing Shield */}
              <div className="absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white border border-primary/20 flex flex-col items-center justify-center shadow-xl z-20">
                <Leaf className="h-8 w-8 text-primary animate-pulse" />
                <span className="text-[7px] uppercase font-bold tracking-[0.2em] text-accent mt-2">
                  SAVAXA ECO
                </span>
              </div>

              {/* Orbital Path ring */}
              <div ref={orbitRef} className="absolute inset-0 rounded-full border border-dashed border-primary/10 z-10">
                {/* Node 1 */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white border border-primary/10 shadow-md flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  style={{ transform: "rotate(0deg)" }}
                  onClick={() => setActivePillar(0)}
                >
                  <Sprout className="h-5 w-5" />
                </div>
                {/* Node 2 */}
                <div
                  className="absolute bottom-[6.7%] right-[6.7%] h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white border border-primary/10 shadow-md flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  style={{ transform: "rotate(120deg)" }}
                  onClick={() => setActivePillar(1)}
                >
                  <Droplets className="h-5 w-5" />
                </div>
                {/* Node 3 */}
                <div
                  className="absolute bottom-[6.7%] left-[6.7%] h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white border border-primary/10 shadow-md flex items-center justify-center text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  style={{ transform: "rotate(240deg)" }}
                  onClick={() => setActivePillar(2)}
                >
                  <Leaf className="h-5 w-5" />
                </div>
              </div>

              {/* Pulse rings */}
              <div className="absolute inset-0 m-auto w-40 h-40 rounded-full border border-primary/5 animate-ping [animation-duration:4s]" />
              <div className="absolute inset-0 m-auto w-56 h-56 rounded-full border border-accent/5 animate-ping [animation-duration:6s]" />

            </div>
          </div>

          {/* Right Column: Key Pillars Details */}
          <div className="lg:col-span-7 space-y-6 sustainability-fade-in">
            {PILLARS.map((pil, index) => {
              const isActive = activePillar === index;
              return (
                <div
                  key={pil.id}
                  onClick={() => setActivePillar(index)}
                  className={`p-8 rounded-3xl border transition-all duration-500 cursor-pointer ${
                    isActive
                      ? "bg-white border-primary/25 shadow-xl scale-[1.02]"
                      : "bg-white/40 border-primary/5 hover:border-primary/15 hover:bg-white/70"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                          isActive ? "bg-primary text-white" : "bg-primary/5 text-primary"
                        }`}
                      >
                        {React.createElement(pil.icon, { className: "h-5 w-5" })}
                      </div>
                      <h3 className="font-display font-extrabold text-lg text-ink">
                        {pil.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20 max-w-fit">
                      {pil.metric}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-muted leading-relaxed pl-14">
                    {pil.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
