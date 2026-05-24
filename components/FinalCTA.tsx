"use client";

import React from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export default function FinalCTA() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-ink text-white overflow-hidden border-t border-white/5">
      {/* Decorative background light overlay */}
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 pt-24 pb-12">
        
        {/* Massive Editorial Header CTA */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-16 border-b border-white/5 gap-8">
          <div>
            <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] block mb-3">
              SAVAXA AGRI-BIOMES
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none">
              Grow Smarter, <br />
              <span className="font-editorial italic text-accent font-medium">
                Shield Sustainably.
              </span>
            </h2>
          </div>
          
          <button
            onClick={() => {
              const target = document.getElementById("contact");
              if (target) target.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-ink transition-all duration-300 hover:bg-accent hover:text-white max-w-fit shadow-[0_8px_32px_rgba(255,255,255,0.06)]"
          >
            <span className="relative z-10 flex items-center">
              Partner With Us
              <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>

        {/* Informational Footer Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-16 border-b border-white/5">
          
          {/* Logo Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2 select-none">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <span className="font-display font-bold text-xs text-accent">S</span>
              </div>
              <span className="font-display font-bold text-base tracking-[0.2em] text-white uppercase">
                SAVAXA
              </span>
            </div>
            <p className="font-sans text-xs text-white/50 leading-relaxed max-w-xs">
              Pioneering high-standard cognitive biochemistry and satellite agricultural diagnostics for the next generation of eco-farming.
            </p>
            {/* Social icons */}
            <div className="flex space-x-3.5 pt-4">
              <a href="#" className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors text-white/60 hover:text-white" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors text-white/60 hover:text-white" aria-label="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-colors text-white/60 hover:text-white" aria-label="GitHub">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Solutions links */}
          <div className="space-y-4">
            <h4 className="font-display text-[10px] font-bold uppercase tracking-widest text-accent">
              SOLUTIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-white/50">
              <li><a href="#solutions" className="hover:text-white transition-colors">Insecticides</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Herbicides</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Fungicides</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Bio-Nutrition</a></li>
            </ul>
          </div>

          {/* Technology links */}
          <div className="space-y-4">
            <h4 className="font-display text-[10px] font-bold uppercase tracking-widest text-accent">
              AI TECH
            </h4>
            <ul className="space-y-2.5 text-xs text-white/50">
              <li><a href="#smart-farming" className="hover:text-white transition-colors">Drone Patrols</a></li>
              <li><a href="#smart-farming" className="hover:text-white transition-colors">Micro-Climate IoT</a></li>
              <li><a href="#smart-farming" className="hover:text-white transition-colors">Satellite NDVI</a></li>
              <li><a href="#smart-farming" className="hover:text-white transition-colors">Agronomist Panel</a></li>
            </ul>
          </div>

          {/* Company links */}
          <div className="space-y-4">
            <h4 className="font-display text-[10px] font-bold uppercase tracking-widest text-accent">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-xs text-white/50">
              <li><a href="#manifesto" className="hover:text-white transition-colors">Our Manifesto</a></li>
              <li><a href="#sustainability" className="hover:text-white transition-colors">Ecosystem</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Research Blog</a></li>
              <li><a href="#dealers" className="hover:text-white transition-colors font-semibold text-accent">Join Dealer Network</a></li>
            </ul>
          </div>

        </div>

        {/* Legal copyright and Scroll-to-Top bar */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-8 gap-6 text-[10px] text-white/40">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} SAVAXA AGRO-SCIENCES LTD.</span>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-white transition-colors">TERMS OF USE</a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all rounded-full px-4 py-2 max-w-fit text-white group"
          >
            <span>BACK TO ALTITUDE</span>
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
