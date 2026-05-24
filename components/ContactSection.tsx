"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import SectionLabel from "./ui/SectionLabel";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    crop: "grains",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Background glow mouse follower
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const glow = glowRef.current;
      if (!glow) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glow, {
        x: x - 150,
        y: y - 150,
        duration: 1.5,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", crop: "grains", message: "" });
    }, 4000);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative min-h-screen bg-white py-24 md:py-32 overflow-hidden"
    >
      {/* Background organic light follower */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-[90px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Inquiry details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <SectionLabel number="10" text="Grow Smarter with SAVAXA" />
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink tracking-tight mt-4 leading-tight">
                Let's Shield <br />
                <span className="font-editorial italic text-primary font-medium">
                  Your Future
                </span>{" "}
                Harvests.
              </h2>
              <p className="font-sans text-xs sm:text-sm text-muted mt-6 max-w-md leading-relaxed">
                Connect with our agronomy division for personalized crop solutions, custom drone spraying services, or wholesale dealership distribution inquiries.
              </p>
            </div>

            {/* Direct info cards */}
            <div className="space-y-6 mt-12 lg:mt-0">
              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-xl bg-[#F4FFF4] border border-primary/10 flex items-center justify-center text-primary mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted block mb-0.5">HEADQUARTERS</span>
                  <span className="font-display font-extrabold text-sm text-ink block">SAVAXA Agro-Tech Tower</span>
                  <span className="font-sans text-xs text-muted">Aero Plaza, Phase 8, Industrial Area, Sector 74, SAS Nagar, Punjab</span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-xl bg-[#F4FFF4] border border-primary/10 flex items-center justify-center text-primary mt-0.5">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted block mb-0.5">EMAIL ADVISORY</span>
                  <span className="font-display font-extrabold text-sm text-ink block">advisory@savaxa.com</span>
                  <span className="font-sans text-xs text-muted">Response within 2 hours</span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-xl bg-[#F4FFF4] border border-primary/10 flex items-center justify-center text-primary mt-0.5">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-muted block mb-0.5">DIRECT HELP DESK</span>
                  <span className="font-display font-extrabold text-sm text-primary block">+91 1800 233 4600</span>
                  <span className="font-sans text-xs text-muted">Toll-free advisory line, 8 AM - 8 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Premium glassmorphism form */}
          <div className="lg:col-span-7 bg-[#F4FFF4]/50 border border-primary/10 rounded-3xl p-8 sm:p-10 shadow-xl backdrop-blur-sm relative">
            
            {submitted ? (
              <div className="absolute inset-0 bg-white/95 rounded-3xl z-25 flex flex-col items-center justify-center text-center p-6 transition-opacity duration-300">
                <div className="h-14 w-14 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center text-primary mb-4 animate-bounce">
                  <Send className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-ink mb-2">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="font-sans text-xs text-muted max-w-sm leading-relaxed">
                  Our regional agronomy expert has been pinged. We will touch base via email or coordinate a direct advisory call shortly.
                </p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <span className="font-display text-[9px] uppercase tracking-[0.25em] text-accent block font-bold mb-4">
                DIRECT INQUIRY FIELD SHEET
              </span>

              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] uppercase font-bold tracking-widest text-muted block">
                  Farmer / Business Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Gurdev Singh Dhillon"
                  className="w-full bg-white border border-primary/10 rounded-xl px-4 py-3.5 text-xs font-semibold text-ink placeholder:text-muted/40 focus:outline-none focus:border-primary/40 focus:shadow-[0_0_12px_rgba(46,125,50,0.06)] transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-muted block">
                  Digital Correspondence Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. contact@dhillonfarms.com"
                  className="w-full bg-white border border-primary/10 rounded-xl px-4 py-3.5 text-xs font-semibold text-ink placeholder:text-muted/40 focus:outline-none focus:border-primary/40 focus:shadow-[0_0_12px_rgba(46,125,50,0.06)] transition-all"
                />
              </div>

              {/* Crop Interest */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-muted block">
                  Select Primary Crop Biome Interest
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "grains", label: "Wheat & Rice" },
                    { id: "fruits", label: "Horticulture" },
                    { id: "cotton", label: "Cash Crops" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, crop: item.id })}
                      className={`py-3 text-[10px] uppercase tracking-wider font-bold rounded-xl border transition-all ${
                        formData.crop === item.id
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-primary/10 text-muted hover:border-primary/25"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] uppercase font-bold tracking-widest text-muted block">
                  Harvest Details / Technical Requirement
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your pest problems or soil concerns..."
                  className="w-full bg-white border border-primary/10 rounded-xl px-4 py-3.5 text-xs font-semibold text-ink placeholder:text-muted/40 focus:outline-none focus:border-primary/40 focus:shadow-[0_0_12px_rgba(46,125,50,0.06)] transition-all resize-none"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-ink py-4 rounded-xl text-center text-xs font-bold uppercase tracking-widest text-white transition-all shadow-[0_4px_16px_rgba(46,125,50,0.2)] hover:shadow-none flex items-center justify-center space-x-2"
              >
                <span>Dispatch Inquiry</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
