"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { id: "hero", label: "Harvest" },
  { id: "manifesto", label: "Manifesto" },
  { id: "solutions", label: "Solutions" },
  { id: "showcase", label: "Products" },
  { id: "smart-farming", label: "Smart Ag" },
  { id: "sustainability", label: "Ecosystem" },
  { id: "dealers", label: "Network" },
  { id: "contact", label: "Inquire" },
];

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Track active section and scroll state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Update background opacity on scroll
      setIsScrolled(scrollPosition > 50);

      // Section tracking
      for (const link of NAV_LINKS) {
        const el = document.getElementById(link.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section is in viewport
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(link.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update slider indicator position
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const activeEl = document.querySelector(`[data-nav-id="${activeSection}"]`) as HTMLElement;
    const indicator = indicatorRef.current;
    if (!activeEl || !indicator) return;

    gsap.to(indicator, {
      x: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (!target) return;

    const headerOffset = 80;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header
        ref={navContainerRef}
        className={`fixed top-0 left-0 w-full z-[999] px-6 py-4 transition-all duration-500 ${
          isScrolled ? "pt-3.5 pb-3.5" : "pt-6 pb-6"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
            isScrolled
              ? "glassmorphism shadow-[0_8px_32px_rgba(46,125,50,0.06)] border-primary/10"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Brand Logo */}
          <div
            className="flex items-center space-x-2 select-none cursor-pointer group"
            onClick={() => scrollToSection("hero")}
          >
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 relative overflow-hidden transition-all duration-500 group-hover:bg-primary/20">
              <span className="font-display font-bold text-sm text-primary group-hover:scale-110 transition-transform duration-300">
                S
              </span>
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <span className="font-display font-bold text-lg tracking-[0.2em] text-ink uppercase">
              SAVAXA
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 relative">
            {/* Sliding highlight indicator */}
            <div
              ref={indicatorRef}
              className="absolute h-8 bg-primary/8 rounded-full border border-primary/10 pointer-events-none"
              style={{ top: "4px" }}
            />
            
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                data-nav-id={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  activeSection === link.id
                    ? "text-primary font-bold"
                    : "text-muted hover:text-primary"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Premium Inquiry Button */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => scrollToSection("contact")}
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-ink group shadow-[0_4px_16px_rgba(46,125,50,0.2)] hover:shadow-none"
            >
              <span className="relative z-10 flex items-center">
                Get In Touch
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-ink p-1.5 rounded-full hover:bg-primary/5 transition-colors border border-primary/10"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 z-[998] bg-ink/30 backdrop-blur-md transition-all duration-500 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-[280px] h-full bg-white shadow-2xl p-8 flex flex-col justify-between transition-transform duration-500 ease-out border-l border-primary/10 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-6 pt-16">
            <span className="font-display font-bold text-xs tracking-widest text-primary uppercase mb-4">
              Navigation
            </span>
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left text-sm font-semibold uppercase tracking-wider transition-colors duration-200 pb-2 border-b border-primary/5 ${
                  activeSection === link.id ? "text-primary" : "text-muted"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToSection("contact")}
            className="w-full bg-primary py-3 rounded-xl text-center text-xs font-bold uppercase tracking-widest text-white hover:bg-ink transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <span>Grow Smarter</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
