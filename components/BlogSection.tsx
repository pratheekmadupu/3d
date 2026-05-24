"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import { ArrowUpRight, Calendar, Clock, BookOpen } from "lucide-react";

const CATEGORIES = ["All", "Biochemistry", "Technology", "Yield Efficacy"];

const ARTICLES = [
  {
    id: "art-1",
    title: "The Molecular Future of Crop Protection: Targeted Bio-friendly Pest Elimination",
    excerpt: "Discover how molecular biochemists are synthesizing targeted suspension concentrates that isolate devastation vectors while preserving native biomes.",
    category: "Biochemistry",
    date: "May 20, 2026",
    readTime: "6 Min Read",
    featured: true,
  },
  {
    id: "art-2",
    title: "Drone patrolled biospheres and real-time smart diagnostics",
    excerpt: "Integrating multispectral satellite data with automated drone delivery loops to formulate responsive agricultural biomes.",
    category: "Technology",
    date: "May 18, 2026",
    readTime: "4 Min Read",
    featured: false,
  },
  {
    id: "art-3",
    title: "Soil carbon levels and the impact of clean chemical half-lives",
    excerpt: "How selecting formulations that degrade rapidly within days benefits microbial density grids and long-term soil carbon capture indices.",
    category: "Biochemistry",
    date: "May 15, 2026",
    readTime: "5 Min Read",
    featured: false,
  },
  {
    id: "art-4",
    title: "Photosynthetic optimization: Chelated nutrition yield increases",
    excerpt: "A deep research analysis into molecular bio-stimulants and plant stomata absorption coefficients for increased heatwaves resilience.",
    category: "Yield Efficacy",
    date: "May 10, 2026",
    readTime: "7 Min Read",
    featured: false,
  },
];

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Stagger reveal on grid render/filter change
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll(".blog-card-item");
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }
    );
  }, [activeCategory]);

  const filteredArticles = ARTICLES.filter((art) => {
    if (activeCategory === "All") return true;
    return art.category === activeCategory;
  });

  const featuredArticle = ARTICLES.find((art) => art.featured);
  const regularArticles = filteredArticles.filter((art) => !art.featured || activeCategory !== "All");

  return (
    <section
      ref={containerRef}
      id="blog"
      className="relative min-h-screen bg-white py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Title */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <SectionLabel number="08" text="SAVAXA Editorial Blog" />
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink tracking-tight mt-4 leading-tight">
              Harvesting Knowledge, <br />
              <span className="font-editorial italic text-primary font-medium">
                Pioneering Research
              </span>{" "}
              Journals.
            </h2>
          </div>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-[#F4FFF4] text-primary border border-primary/10 hover:border-primary/25"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article (Shown only on 'All' category) */}
        {activeCategory === "All" && featuredArticle && (
          <div className="mb-12 glassmorphism rounded-3xl border border-primary/10 overflow-hidden hover:border-primary/25 transition-all duration-500 shadow-lg group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between min-h-[300px]">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-[10px] text-accent font-bold uppercase tracking-widest">
                    <span>{featuredArticle.category}</span>
                    <span className="h-1 w-1 bg-accent rounded-full" />
                    <span>FEATURED EDITORIAL</span>
                  </div>
                  
                  <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-ink leading-tight tracking-tight group-hover:text-primary transition-colors">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed max-w-2xl">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between mt-8 pt-6 border-t border-primary/5 gap-4">
                  <div className="flex items-center space-x-4 text-[10px] text-muted font-bold">
                    <span className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" />
                      {featuredArticle.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                      {featuredArticle.readTime}
                    </span>
                  </div>
                  <button className="flex items-center space-x-1.5 text-xs font-bold text-primary uppercase tracking-widest hover:text-ink transition-colors">
                    <span>Read Analysis</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Graphic background placeholder */}
              <div className="lg:col-span-5 bg-ink p-8 flex flex-col justify-between relative overflow-hidden border-t lg:border-t-0 lg:border-l border-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-40 pointer-events-none" />
                <BookOpen className="h-12 w-12 text-accent relative z-10" />
                
                <div className="relative z-10 space-y-2 mt-20">
                  <span className="text-[9px] uppercase tracking-widest text-white/50 block font-bold">
                    SAVAXA RESEARCH UNIT
                  </span>
                  <p className="text-white font-editorial italic text-lg leading-relaxed">
                    "Intelligent agro-chemistry requires cross-disciplinary integration between plant genetics and molecular physics."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regularArticles.map((art) => (
            <article
              key={art.id}
              className="blog-card-item glassmorphism rounded-3xl p-6 sm:p-8 border border-primary/10 hover:border-primary/20 hover:shadow-[0_12px_24px_rgba(46,125,50,0.04)] transition-all duration-500 flex flex-col justify-between min-h-[340px] group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/25">
                    {art.category}
                  </span>
                  <div className="flex items-center space-x-1.5 text-[9px] text-muted font-bold">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="font-display text-lg font-bold text-ink leading-snug group-hover:text-primary transition-colors">
                  {art.title}
                </h3>

                <p className="font-sans text-xs text-muted leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-primary/5 pt-4 mt-6">
                <span className="font-sans text-[10px] text-muted font-semibold">{art.date}</span>
                <div className="h-8 w-8 rounded-full border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
