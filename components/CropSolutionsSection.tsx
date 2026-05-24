"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import { ShieldCheck, Bug, Droplet, Wind, ArrowRight } from "lucide-react";

const SOLUTIONS = [
  {
    id: "insecticides",
    number: "01",
    title: "Eco-Active Insecticides",
    description: "Selective molecular targeting designed to neutralize devastating agricultural pests while maintaining absolute safety for bees, ladybugs, and local pollinators.",
    icon: Bug,
    efficacy: "98.7%",
    biodegradation: "48 Hours",
    formulaType: "Liquid Suspension Concentrate",
  },
  {
    id: "herbicides",
    number: "02",
    title: "Precision Herbicides",
    description: "Intelligent foliage absorption that selectively targets weed structures at the root level, preserving vital crop nutrients and maintaining organic soil balance.",
    icon: Wind,
    efficacy: "99.2%",
    biodegradation: "5 Days",
    formulaType: "Water Soluble Granules",
  },
  {
    id: "fungicides",
    number: "03",
    title: "Bio-Shield Fungicides",
    description: "Proactive fungal spore defense that constructs a physical micro-barrier over leaf cells, preventing blight, rot, and mildew propagation.",
    icon: ShieldCheck,
    efficacy: "97.5%",
    biodegradation: "72 Hours",
    formulaType: "Emulsifiable Concentrate",
  },
  {
    id: "nutrition",
    number: "04",
    title: "Cellular Crop Nutrition",
    description: "Advanced bio-stimulants and trace mineral compounds that accelerate photosynthesis, maximize root extension, and increase extreme weather resilience.",
    icon: Droplet,
    efficacy: "85.0% Yield Lift",
    biodegradation: "Organic Absorption",
    formulaType: "Chelated Micro-Nutrient Fluid",
  },
];

export default function CropSolutionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    // Stagger reveal the accordion headers
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".solution-accordion-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
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
      ref={sectionRef}
      id="solutions"
      className="relative min-h-screen bg-white py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Editorial Title */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <SectionLabel number="02" text="Protection Solutions" />
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink tracking-tight leading-tight mt-4">
              Intelligent Biochemistry for{" "}
              <span className="font-editorial italic text-primary font-medium">
                Regenerative
              </span>{" "}
              Farms.
            </h2>
          </div>
          <p className="font-sans text-sm text-muted max-w-sm leading-relaxed">
            SAVAXA protection agents are engineered at the molecular level, deploying bio-friendly molecules that defend harvests without disrupting local biomes.
          </p>
        </div>

        {/* Dynamic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          
          {/* Left Side: Sticky Visual Dashboard */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 transition-all duration-500">
            <div className="glassmorphism p-8 rounded-3xl border border-primary/10 bg-gradient-to-br from-white to-[#F4FFF4]/50 shadow-xl overflow-hidden relative group">
              {/* Decorative light gradient */}
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/5 blur-[50px] pointer-events-none group-hover:bg-primary/10 transition-colors" />
              
              {/* Category Indicator */}
              <span className="font-display text-[10px] font-bold tracking-[0.25em] text-accent uppercase block mb-2">
                ACTIVE SOLUTION METRICS
              </span>
              
              {/* Dynamic Icon */}
              {React.createElement(SOLUTIONS[activeIndex].icon, {
                className: "h-14 w-14 text-primary mb-6 transition-transform duration-500 group-hover:scale-110",
              })}

              <h3 className="font-display text-2xl font-extrabold text-ink mb-4">
                {SOLUTIONS[activeIndex].title}
              </h3>
              
              <p className="font-sans text-xs text-muted leading-relaxed mb-8">
                {SOLUTIONS[activeIndex].description}
              </p>

              {/* Lab Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 border-t border-primary/5 pt-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted block mb-1">
                    LAB EFFICACY
                  </span>
                  <span className="font-display text-lg font-bold text-primary">
                    {SOLUTIONS[activeIndex].efficacy}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted block mb-1">
                    SOIL HALF-LIFE
                  </span>
                  <span className="font-display text-lg font-bold text-accent">
                    {SOLUTIONS[activeIndex].biodegradation}
                  </span>
                </div>
                <div className="col-span-2 mt-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted block mb-1">
                    FORMULATION STRUCTURE
                  </span>
                  <span className="font-display text-xs font-semibold text-ink">
                    {SOLUTIONS[activeIndex].formulaType}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Accordion list */}
          <div className="lg:col-span-7 space-y-4">
            {SOLUTIONS.map((sol, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={sol.id}
                  onClick={() => setActiveIndex(index)}
                  className={`solution-accordion-item group cursor-pointer p-8 rounded-2xl border transition-all duration-500 ${
                    isActive
                      ? "bg-[#F4FFF4] border-primary/20 shadow-md"
                      : "bg-white border-primary/5 hover:border-primary/15 hover:bg-[#F4FFF4]/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <span className="font-display font-bold text-xs text-accent">
                        {sol.number}
                      </span>
                      <h3
                        className={`font-display text-lg sm:text-xl font-bold transition-colors ${
                          isActive ? "text-primary" : "text-ink group-hover:text-primary"
                        }`}
                      >
                        {sol.title}
                      </h3>
                    </div>
                    <div
                      className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-primary border-primary text-white"
                          : "border-primary/10 text-muted group-hover:border-primary/30 group-hover:text-primary"
                      }`}
                    >
                      <ArrowRight
                        className={`h-4 w-4 transition-transform duration-300 ${
                          isActive ? "rotate-90" : "group-hover:translate-x-0.5"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Accordion Content Collapse */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isActive ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="font-sans text-xs text-muted leading-relaxed max-w-2xl pr-4 border-l border-primary/10 pl-4">
                        {sol.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
