"use client";

import React, { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import { Sparkles, ArrowUpRight, FlaskConical, Dna, Leaf, ShieldAlert } from "lucide-react";

const PRODUCTS = [
  {
    name: "SAVAXA Aventus",
    category: "Systemic Insecticide",
    tagline: "Molecular Pest Interceptor",
    description: "Highly targeted neural blocker that eliminates stem borers, aphids, and thrips without affecting beneficial agricultural fauna.",
    color: "from-green-500/10 to-emerald-500/10",
    glowColor: "rgba(34, 197, 94, 0.15)",
    icon: FlaskConical,
    specs: ["Dose: 150ml / Acre", "Half-life: 24 Hours", "Target: Piercing Pests"],
    molecularWeight: "328.4 g/mol",
  },
  {
    name: "SAVAXA Kronos",
    category: "Precision Herbicide",
    tagline: "Foliar Weed Neutralizer",
    description: "Stops photosynthesis selectively in invasive weed structures while grain stalks and crop roots are safely shielded.",
    color: "from-amber-500/10 to-yellow-600/10",
    glowColor: "rgba(217, 119, 6, 0.15)",
    icon: Dna,
    specs: ["Dose: 400ml / Acre", "Half-life: 5 Days", "Target: Broad-leaf Weeds"],
    molecularWeight: "412.8 g/mol",
  },
  {
    name: "SAVAXA Vesta",
    category: "Shield Fungicide",
    tagline: "Cellular Spore Barrier",
    description: "Constructs a moisture-resistant protective envelope preventing rust, powdery mildew, and leaf spot infestation.",
    color: "from-blue-500/10 to-cyan-500/10",
    glowColor: "rgba(59, 130, 246, 0.15)",
    icon: ShieldAlert,
    specs: ["Dose: 200ml / Acre", "Half-life: 72 Hours", "Target: Spore Fungus"],
    molecularWeight: "295.1 g/mol",
  },
  {
    name: "SAVAXA Solis",
    category: "Cellular Nutrition",
    tagline: "Bio-Nutrient Stimulant",
    description: "Formulated with ocean-derived algae extracts and chelated micro-minerals that trigger explosive leaf chlorophyll synthesis.",
    color: "from-lime-500/10 to-green-600/10",
    glowColor: "rgba(132, 204, 22, 0.15)",
    icon: Leaf,
    specs: ["Dose: 500ml / Acre", "Half-life: Immediate absorption", "Target: Leaf Stomata"],
    molecularWeight: "Complex Bio-Fluid",
  },
];

export default function ProductShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scroll trigger reveal for product cards
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".product-showcase-card",
        { opacity: 0, scale: 0.9, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="showcase"
      className="relative min-h-screen bg-[#F4FFF4]/30 py-24 md:py-32 overflow-hidden"
    >
      {/* Dynamic background light */}
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <SectionLabel number="03" text="Premium Product Catalog" />
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink tracking-tight mt-4 leading-tight">
            Bio-Tech Solutions for <br />
            <span className="font-editorial italic text-primary font-medium">
              Maximum Yield
            </span>{" "}
            Efficacy.
          </h2>
          <p className="font-sans text-sm text-muted mt-6 max-w-xl mx-auto leading-relaxed">
            Discover our high-precision product families, formulated in high-standard laboratories to guarantee crop protection without compromise.
          </p>
        </div>

        {/* Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {PRODUCTS.map((prod, idx) => {
            return (
              <div
                key={idx}
                className="product-showcase-card group relative rounded-3xl overflow-hidden glassmorphism p-8 md:p-10 border border-primary/10 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(46,125,50,0.06)] flex flex-col justify-between"
                style={{
                  willChange: "transform, opacity",
                }}
              >
                {/* Custom glowing backdrop overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${prod.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                />

                {/* Ambient particle bubble indicators */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Header */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-full">
                      {prod.category}
                    </span>
                    <div className="h-10 w-10 rounded-full border border-primary/10 flex items-center justify-center text-primary bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                      {React.createElement(prod.icon, { className: "h-5 w-5" })}
                    </div>
                  </div>

                  <h3 className="font-display text-3xl font-extrabold text-ink tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {prod.name}
                  </h3>
                  
                  <p className="font-editorial italic text-sm text-primary mb-6">
                    {prod.tagline}
                  </p>

                  <p className="font-sans text-xs text-muted leading-relaxed mb-8 max-w-md">
                    {prod.description}
                  </p>

                  {/* Specifications and Molecule detail */}
                  <div className="border-t border-primary/5 pt-6 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-muted block mb-2">
                        APPLICATION PROFILE
                      </span>
                      <ul className="space-y-1.5">
                        {prod.specs.map((spec, sIdx) => (
                          <li key={sIdx} className="font-sans text-[11px] text-ink flex items-center">
                            <span className="h-1 w-1 rounded-full bg-primary mr-2" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-muted block mb-2">
                        MOLECULAR SIG
                      </span>
                      <div className="space-y-1 bg-white/50 border border-primary/5 p-3 rounded-xl">
                        <span className="text-[10px] text-muted block font-semibold">
                          MW WEIGHT:
                        </span>
                        <span className="font-display text-[12px] font-bold text-ink">
                          {prod.molecularWeight}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer interactive link */}
                <div className="relative z-10 flex items-center justify-between mt-8 border-t border-primary/5 pt-6">
                  <span className="font-display text-[10px] font-bold uppercase tracking-widest text-primary">
                    View Lab Diagnostics
                  </span>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
