"use client";

import React, { useRef, useEffect } from "react";
import gsap from "@/lib/gsap";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  range?: number; // Distance in px to trigger attraction
  speed?: number; // Acceleration speed
  className?: string;
}

export default function MagneticButton({
  children,
  range = 45,
  speed = 0.35,
  className = "",
  ...props
}: MagneticButtonProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const text = textRef.current;
    if (!trigger || !text) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = trigger.getBoundingClientRect();
      
      // Calculate cursor position relative to the center of the button
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      
      // Calculate distance between cursor and center of the button
      const distance = Math.sqrt(relX * relX + relY * relY);

      if (distance < range) {
        // Move button body towards mouse (fraction of the total offset)
        gsap.to(trigger, {
          x: relX * 0.35,
          y: relY * 0.35,
          duration: speed,
          ease: "power2.out",
        });
        
        // Move text body slightly further (parallax effect inside the button)
        gsap.to(text, {
          x: relX * 0.18,
          y: relY * 0.18,
          duration: speed,
          ease: "power2.out",
        });
      } else {
        // Return to original position
        resetAnimation();
      }
    };

    const handleMouseLeave = () => {
      resetAnimation();
    };

    const resetAnimation = () => {
      gsap.to(trigger, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1.1, 0.4)",
      });
      gsap.to(text, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1.1, 0.4)",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    trigger.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      trigger.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range, speed]);

  return (
    <button
      ref={triggerRef}
      className={`relative inline-flex items-center justify-center rounded-full border border-primary px-8 py-3.5 text-sm font-semibold text-primary transition-colors duration-300 hover:bg-primary hover:text-white focus:outline-none ${className}`}
      {...props}
    >
      <span ref={textRef} className="relative z-10 block pointer-events-none">
        {children}
      </span>
    </button>
  );
}
