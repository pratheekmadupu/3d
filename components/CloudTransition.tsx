"use client";

import React, { useRef, useEffect } from "react";
import gsap from "@/lib/gsap";

interface CloudTransitionProps {
  type?: "top" | "bottom" | "both";
  className?: string;
}

export default function CloudTransition({ type = "both", className = "" }: CloudTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const layers = container.querySelectorAll(".fog-layer");
    if (!layers.length) return;

    // Slow drifting animations for each layer
    const ctx = gsap.context(() => {
      layers.forEach((layer, index) => {
        const speed = 10 + index * 8;
        const xOffset = index % 2 === 0 ? "50%" : "-50%";

        gsap.fromTo(
          layer,
          { x: index % 2 === 0 ? "-10%" : "10%" },
          {
            x: xOffset,
            duration: speed,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );
      });

      // Scroll-driven parallax opacity fade
      gsap.to(container, {
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{ height: "160px" }}
    >
      {/* Top Fog (Glow transition) */}
      {(type === "top" || type === "both") && (
        <div className="absolute top-0 left-0 w-full h-[80px] bg-gradient-to-b from-background to-transparent z-10" />
      )}

      {/* Drifting Layer 1 */}
      <div
        className="fog-layer absolute inset-0 w-[200%] h-full bg-cover opacity-[0.25] filter blur-xl"
        style={{
          backgroundImage: "radial-gradient(ellipse at center, rgba(129, 199, 132, 0.4) 0%, rgba(244, 255, 244, 0) 70%)",
          transform: "scale(1.2)",
        }}
      />

      {/* Drifting Layer 2 (Golden Sunlight Accent) */}
      <div
        className="fog-layer absolute inset-0 w-[250%] h-full bg-cover opacity-[0.18] filter blur-2xl"
        style={{
          backgroundImage: "radial-gradient(ellipse at center, rgba(212, 175, 55, 0.3) 0%, rgba(244, 255, 244, 0) 65%)",
          transform: "scale(1.4)",
        }}
      />

      {/* Drifting Layer 3 (Deep Forest Shadow Accent) */}
      <div
        className="fog-layer absolute inset-0 w-[220%] h-full bg-cover opacity-[0.12] filter blur-3xl"
        style={{
          backgroundImage: "radial-gradient(ellipse at center, rgba(46, 125, 50, 0.25) 0%, rgba(244, 255, 244, 0) 80%)",
          transform: "scale(1.5)",
        }}
      />

      {/* Bottom Fog (Glow transition) */}
      {(type === "bottom" || type === "both") && (
        <div className="absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-t from-background to-transparent z-10" />
      )}
    </div>
  );
}
