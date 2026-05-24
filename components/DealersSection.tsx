"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import { MapPin, Phone, Mail, Globe, ArrowRight } from "lucide-react";

const DEALERS = [
  {
    id: "north",
    region: "North India Hub",
    city: "Chandigarh, Punjab",
    address: "SCO 142-144, Sector 17-C, Chandigarh - 160017",
    phone: "+91 172 460 9100",
    email: "north.hub@savaxa.com",
    coordinates: { x: "42%", y: "25%" },
  },
  {
    id: "west",
    region: "West India Hub",
    city: "Pune, Maharashtra",
    address: "Agro-Tech Techpark, Level 4, Hinjewadi Phase 3, Pune - 411057",
    phone: "+91 20 6790 3200",
    email: "west.hub@savaxa.com",
    coordinates: { x: "32%", y: "60%" },
  },
  {
    id: "south",
    region: "South India Hub",
    city: "Guntur, Andhra Pradesh",
    address: "Savaxa Tower, Seed Street, Guntur - 522002",
    phone: "+91 863 234 5600",
    email: "south.hub@savaxa.com",
    coordinates: { x: "48%", y: "75%" },
  },
  {
    id: "central",
    region: "Central India Hub",
    city: "Indore, Madhya Pradesh",
    address: "405, Scheme No. 78, Vijay Nagar, Indore - 452010",
    phone: "+91 731 426 7800",
    email: "central.hub@savaxa.com",
    coordinates: { x: "50%", y: "45%" },
  },
];

export default function DealersSection() {
  const [activeDealerIdx, setActiveDealerIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Stagger reveal of dealer items
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".dealer-item-card",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
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
      id="dealers"
      className="relative min-h-screen bg-white py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Title Heading */}
        <div className="max-w-3xl mb-20">
          <SectionLabel number="06" text="Authorized Dealer Network" />
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink tracking-tight mt-4">
            Securing Crops, <br />
            <span className="font-editorial italic text-primary font-medium">
              Nationwide Delivery
            </span>{" "}
            Capability.
          </h2>
          <p className="font-sans text-sm text-muted mt-6 max-w-xl leading-relaxed">
            SAVAXA connects with farmers through an exclusive network of high-tech agro-dealers, offering cold-chain delivery guarantees and direct scientific field support.
          </p>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-stretch">
          
          {/* Left Column: Interactive Dealer Hub Selector */}
          <div className="lg:col-span-6 space-y-4">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-accent block mb-2">
              SELECT AUTHORIZED HUB REGION
            </span>
            {DEALERS.map((dealer, idx) => {
              const isActive = activeDealerIdx === idx;
              return (
                <div
                  key={dealer.id}
                  onClick={() => setActiveDealerIdx(idx)}
                  className={`dealer-item-card group cursor-pointer p-6 rounded-2xl border transition-all duration-500 ${
                    isActive
                      ? "bg-[#F4FFF4] border-primary/20 shadow-md translate-x-2"
                      : "bg-white border-primary/5 hover:border-primary/15 hover:bg-[#F4FFF4]/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <MapPin
                        className={`h-5 w-5 transition-transform duration-300 ${
                          isActive ? "text-primary scale-110" : "text-muted"
                        }`}
                      />
                      <div>
                        <h3 className="font-display font-extrabold text-sm sm:text-base text-ink">
                          {dealer.region}
                        </h3>
                        <span className="font-sans text-[11px] text-muted">{dealer.city}</span>
                      </div>
                    </div>
                    <ArrowRight
                      className={`h-4 w-4 text-primary transition-transform duration-300 ${
                        isActive ? "translate-x-1" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                      }`}
                    />
                  </div>

                  {/* expanded data info */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isActive ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden border-t border-primary/5 pt-4 space-y-3">
                      <p className="font-sans text-xs text-muted leading-relaxed">
                        {dealer.address}
                      </p>
                      <div className="flex flex-wrap gap-4 text-[10px] text-ink font-semibold">
                        <span className="flex items-center">
                          <Phone className="h-3.5 w-3.5 text-primary mr-1.5" />
                          {dealer.phone}
                        </span>
                        <span className="flex items-center">
                          <Mail className="h-3.5 w-3.5 text-primary mr-1.5" />
                          {dealer.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic glowing map simulator */}
          <div className="lg:col-span-6 bg-ink rounded-3xl relative overflow-hidden flex flex-col justify-end min-h-[400px] shadow-xl border border-white/5 p-8">
            
            {/* Dark Abstract Map SVG grid placeholder */}
            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-25">
              <svg className="w-[85%] h-[85%] fill-none stroke-white/10" viewBox="0 0 100 100">
                <path d="M10,20 Q30,5 50,20 T90,20" strokeWidth="0.5" strokeDasharray="2,2" />
                <path d="M15,40 Q40,30 55,50 T85,45" strokeWidth="0.5" strokeDasharray="2,2" />
                <path d="M20,60 Q35,55 50,70 T80,65" strokeWidth="0.5" strokeDasharray="2,2" />
                <path d="M10,10 L90,90" strokeWidth="0.2" strokeDasharray="1,4" />
                <path d="M90,10 L10,90" strokeWidth="0.2" strokeDasharray="1,4" />
              </svg>
            </div>

            {/* Glowing Map overlay dots (Pulsing Radar nodes) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {DEALERS.map((dl, idx) => {
                const isActive = activeDealerIdx === idx;
                return (
                  <div
                    key={dl.id}
                    className="absolute"
                    style={{ left: dl.coordinates.x, top: dl.coordinates.y }}
                  >
                    {/* Glowing outer aura */}
                    <div
                      className={`absolute -left-4 -top-4 w-8 h-8 rounded-full border transition-all duration-700 ${
                        isActive
                          ? "border-accent/40 bg-accent/10 animate-ping"
                          : "border-primary/20 bg-primary/5 opacity-50"
                      }`}
                    />
                    
                    {/* Inner glowing core */}
                    <div
                      className={`absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full border border-white transition-colors duration-500 shadow-[0_0_12px_rgba(255,255,255,0.4)] ${
                        isActive ? "bg-accent" : "bg-primary"
                      }`}
                    />

                    {/* Floating label */}
                    {isActive && (
                      <div className="absolute left-4 -top-3.5 bg-black/80 border border-white/10 px-2.5 py-1 rounded-md text-[8px] font-bold text-white uppercase whitespace-nowrap tracking-wider shadow-lg animate-float-medium">
                        {dl.region}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Map info overlay bottom */}
            <div className="relative z-30 bg-black/60 border border-white/5 p-5 rounded-2xl backdrop-blur-md">
              <div className="flex items-center space-x-2 text-accent mb-2">
                <Globe className="h-4 w-4 animate-spin [animation-duration:8s]" />
                <span className="font-display text-[9px] uppercase tracking-widest font-semibold">
                  LIVE HUB DESPATCH ACTIVE
                </span>
              </div>
              <h4 className="font-display font-extrabold text-sm text-white">
                {DEALERS[activeDealerIdx].city}
              </h4>
              <p className="font-sans text-[10px] text-white/50 leading-relaxed mt-1">
                This regional hub operates with automated shipping lines and direct GPS tracking. Maximum delivery wait time is 24 hours inside the operational boundary.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
