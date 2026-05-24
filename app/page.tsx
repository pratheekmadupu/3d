"use client";

import React, { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import FloatingNav from "@/components/FloatingNav";
import ParticleEnvironment from "@/components/ParticleEnvironment";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import CloudTransition from "@/components/CloudTransition";
import CropSolutionsSection from "@/components/CropSolutionsSection";
import ProductShowcase from "@/components/ProductShowcase";
import SmartFarmingSection from "@/components/SmartFarmingSection";
import SustainabilitySection from "@/components/SustainabilitySection";
import DealersSection from "@/components/DealersSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Immersive Preloader */}
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <SmoothScroll>
          <div className="relative min-h-screen selection:bg-primary/20 selection:text-primary">
            
            {/* Custom Mouse Cursor */}
            <CustomCursor />
            
            {/* Ambient Background Canvas Particles */}
            <ParticleEnvironment />
            
            {/* Floating Navigation */}
            <FloatingNav />

            {/* Core Section Blocks */}
            <main>
              {/* 01. Hero Sequence Panel */}
              <HeroSection />

              {/* 02. Pinned Manifesto Storytelling */}
              <ManifestoSection />

              {/* Parallax Altitude Separation */}
              <CloudTransition type="both" className="bg-[#F4FFF4]" />

              {/* 03. Protection Solutions Categories */}
              <CropSolutionsSection />

              {/* 04. Detailed Product Showcase Card Grid */}
              <ProductShowcase />

              {/* 05. ThreeJS Farmland & AI Telemetry Dashboard */}
              <SmartFarmingSection />

              {/* 06. Ecosystem Water & Soil Sustainability */}
              <SustainabilitySection />

              {/* 07. Interactive Nationwide Dealer Network Map */}
              <DealersSection />

              {/* 08. Farmer Stories & Yield Gain Telemetry */}
              <TestimonialsSection />

              {/* 09. Advanced Agri-Research Journal & Blog */}
              <BlogSection />

              {/* 10. Governmental Eco & ISO Safety Badges */}
              <CertificationsSection />

              {/* 11. Custom Contact Inquiry Sheet */}
              <ContactSection />
            </main>

            {/* 12. Pinned Footer & Altitude Action */}
            <FinalCTA />

          </div>
        </SmoothScroll>
      )}
    </>
  );
}
