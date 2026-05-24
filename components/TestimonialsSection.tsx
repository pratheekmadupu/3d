"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import { Quote, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Gurdev Singh Dhillon",
    role: "Wheat Cultivator, 80 Acres",
    location: "Bathinda, Punjab",
    quote: "SAVAXA Aventus changed the game for our harvest. Stem borer used to wipe out up to 15% of our crop every single year. Deploying the Aventus formula cut the pest impact to absolute zero in less than 24 hours.",
    metric: "+18% Yield Growth",
    avatar: "G",
  },
  {
    name: "Rajendra Prasad",
    role: "Cotton Agriculturist, 45 Acres",
    location: "Guntur, Andhra Pradesh",
    quote: "Using the precision herbicides from SAVAXA freed us from laborious manual weed removal. Soil moisture has remained excellent, and our cotton canopy has never looked this thick or healthy before.",
    metric: "40% Labor Reduction",
    avatar: "R",
  },
  {
    name: "Meenakshi Kulkarni",
    role: "Horticulturist & Exporter",
    location: "Nashik, Maharashtra",
    quote: "The cellular crop nutrition and Vesta fungicide are staples of our grape vineyard. Mildew threat is completely blocked, and grape sugar levels have met prime European export limits seamlessly.",
    metric: "100% Export Grade",
    avatar: "M",
  },
];

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  const slideNext = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const slidePrev = () => {
    setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Animate text crossfade on slide change
  useEffect(() => {
    const textBlock = textBlockRef.current;
    if (!textBlock) return;

    gsap.fromTo(
      textBlock,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  }, [activeIdx]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#F4FFF4]/30 py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Label */}
        <div className="max-w-3xl mb-16">
          <SectionLabel number="07" text="Real Stories from Farmers" />
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink tracking-tight mt-4">
            Partnering With the <br />
            <span className="font-editorial italic text-primary font-medium">
              Guardians of the Soil.
            </span>
          </h2>
        </div>

        {/* Carousel core container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-center">
          
          {/* Left Column: Testimonial details */}
          <div className="lg:col-span-8 bg-white border border-primary/10 rounded-3xl p-8 sm:p-12 shadow-xl relative min-h-[380px] flex flex-col justify-between">
            <Quote className="absolute top-10 right-10 h-16 w-16 text-primary/5 pointer-events-none" />
            
            <div ref={textBlockRef} className="space-y-6">
              {/* Metric Tag */}
              <span className="inline-flex items-center space-x-2 bg-[#F4FFF4] text-primary border border-primary/20 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                <CheckCircle className="h-4 w-4" />
                <span>{TESTIMONIALS[activeIdx].metric}</span>
              </span>

              {/* Quote text */}
              <blockquote className="font-display text-lg sm:text-2xl font-bold text-ink leading-relaxed tracking-tight">
                "{TESTIMONIALS[activeIdx].quote}"
              </blockquote>

              {/* Profile Bio */}
              <div className="flex items-center space-x-4 pt-6 border-t border-primary/5">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center font-display font-extrabold text-white text-lg">
                  {TESTIMONIALS[activeIdx].avatar}
                </div>
                <div>
                  <cite className="font-display font-extrabold text-base text-ink not-italic block">
                    {TESTIMONIALS[activeIdx].name}
                  </cite>
                  <span className="font-sans text-xs text-muted block mt-0.5">
                    {TESTIMONIALS[activeIdx].role} —{" "}
                    <span className="font-semibold text-primary">
                      {TESTIMONIALS[activeIdx].location}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Slider Actions buttons */}
            <div className="flex items-center space-x-3 mt-10 pt-4 self-end sm:self-start">
              <button
                onClick={slidePrev}
                className="h-10 w-10 rounded-full border border-primary/10 flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-all duration-300 hover:bg-[#F4FFF4]/50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={slideNext}
                className="h-10 w-10 rounded-full border border-primary/10 flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-all duration-300 hover:bg-[#F4FFF4]/50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              
              {/* Pagination Dots indicator */}
              <div className="flex space-x-1.5 ml-6">
                {TESTIMONIALS.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeIdx === idx ? "w-6 bg-primary" : "w-1.5 bg-primary/15"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Visual Agro Statistics card */}
          <div className="lg:col-span-4 bg-ink text-white rounded-3xl p-8 border border-white/5 flex flex-col justify-between shadow-xl min-h-[380px]">
            <div>
              <span className="font-display text-[9px] uppercase tracking-[0.25em] text-accent block mb-2 font-bold">
                CUMULATIVE CROP DATA IMPACT
              </span>
              <h3 className="font-display text-xl font-extrabold text-white">
                Verifiable Farmland Efficacy.
              </h3>
              <p className="font-sans text-[11px] text-white/50 leading-relaxed mt-3">
                Our farm results are monitored by agricultural universities and independent research nodes, yielding solid, bulletproof field statistics.
              </p>
            </div>

            <div className="space-y-6 mt-8 border-t border-white/5 pt-6">
              <div>
                <span className="font-display text-2xl font-bold text-accent">1.2 Million +</span>
                <p className="font-sans text-[10px] text-white/50 uppercase tracking-widest font-semibold mt-1">
                  Acres Protected Nationwide
                </p>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-green-400">98.4%</span>
                <p className="font-sans text-[10px] text-white/50 uppercase tracking-widest font-semibold mt-1">
                  Farmer Satisfaction Index
                </p>
              </div>
              <div>
                <span className="font-display text-2xl font-bold text-white">25% Average</span>
                <p className="font-sans text-[10px] text-white/50 uppercase tracking-widest font-semibold mt-1">
                  Net Profit Yield Lift
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
