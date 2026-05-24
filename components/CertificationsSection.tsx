"use client";

import React, { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import { Award, ShieldCheck, FileCheck, CheckCircle } from "lucide-react";

const CERTIFICATIONS = [
  {
    title: "ISO 14001:2015",
    subtitle: "Environmental Management",
    description: "International standard verification validating that SAVAXA chemical synthesis operations achieve absolute ecological protection safety.",
    icon: ShieldCheck,
  },
  {
    title: "Eco-Safety Seal",
    subtitle: "Pollinator Protection Certificate",
    description: "Certified safety rating from national agricultural laboratories verifying that our crop protection products preserve honeybees and ladybugs.",
    icon: Award,
  },
  {
    title: "ICAR Formulation Approval",
    subtitle: "Government Advisory Registration",
    description: "Officially registered and approved crop formulations satisfying government advisory limits for healthy human crop consumption.",
    icon: FileCheck,
  },
];

export default function CertificationsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Stagger reveal certifications cards
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cert-item-card",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 75%",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="certifications"
      className="relative bg-[#F4FFF4]/30 py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Label Title */}
        <div className="max-w-3xl mb-16">
          <SectionLabel number="09" text="Certifications & Safety" />
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink tracking-tight mt-4">
            Scientifically Certified, <br />
            <span className="font-editorial italic text-primary font-medium">
              Ecosystem Approved.
            </span>
          </h2>
          <p className="font-sans text-sm text-muted mt-6 max-w-xl leading-relaxed">
            SAVAXA products satisfy high global environmental standards. We submit our biochemistry to regular checks by university councils and biosafety boards.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {CERTIFICATIONS.map((cert, idx) => (
            <div
              key={idx}
              className="cert-item-card glassmorphism p-8 rounded-3xl border border-primary/10 hover:border-primary/20 hover:shadow-[0_12px_24px_rgba(46,125,50,0.04)] transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                {/* Icon wrapper */}
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110">
                  {React.createElement(cert.icon, { className: "h-6 w-6" })}
                </div>
                
                <h3 className="font-display font-extrabold text-lg text-ink">
                  {cert.title}
                </h3>
                <span className="font-display text-[9px] uppercase tracking-widest text-accent font-semibold block mt-1">
                  {cert.subtitle}
                </span>

                <p className="font-sans text-xs text-muted leading-relaxed mt-4">
                  {cert.description}
                </p>
              </div>

              {/* Verified badge */}
              <div className="flex items-center space-x-2 mt-8 pt-4 border-t border-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest">
                <CheckCircle className="h-4 w-4" />
                <span>Verified Clean</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
