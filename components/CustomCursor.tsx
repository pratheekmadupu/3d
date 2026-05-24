"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "@/lib/gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Hide cursor on touch devices
    const checkDevice = () => {
      const mobile = window.matchMedia("(max-width: 1024px)").matches || "ontouchstart" in window;
      setIsMobile(mobile);
      if (!mobile) {
        document.body.classList.add("custom-cursor-active");
      } else {
        document.body.classList.remove("custom-cursor-active");
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Track mouse position
    const mouse = { x: -100, y: -100 };
    
    // Quick setters for performance
    const xDotSetter = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yDotSetter = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const xRingSetter = gsap.quickTo(ring, "x", { duration: 0.28, ease: "power2.out" });
    const yRingSetter = gsap.quickTo(ring, "y", { duration: 0.28, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Center the dot and ring on the cursor
      xDotSetter(mouse.x - 4);
      yDotSetter(mouse.y - 4);
      xRingSetter(mouse.x - 20);
      yRingSetter(mouse.y - 20);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Hover detection for interactive items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find nearest interactive element
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, .interactive-card, .canvas-interactive");
      
      if (interactive) {
        setHovered(true);
        
        // Show text label depending on context
        if (interactive.classList.contains("interactive-card")) {
          setCursorText("EXPLORE");
        } else if (interactive.classList.contains("canvas-interactive")) {
          setCursorText("DRAG 3D");
        } else {
          setCursorText("");
        }

        gsap.to(ring, {
          width: 56,
          height: 56,
          x: mouse.x - 28,
          y: mouse.y - 28,
          backgroundColor: "rgba(46, 125, 50, 0.08)",
          borderColor: "var(--accent)",
          borderWidth: 1.5,
          duration: 0.3,
          ease: "power2.out",
        });
        
        gsap.to(dot, {
          scale: 1.8,
          backgroundColor: "var(--accent)",
          duration: 0.2,
        });
      } else {
        setHovered(false);
        setCursorText("");
        
        gsap.to(ring, {
          width: 40,
          height: 40,
          x: mouse.x - 20,
          y: mouse.y - 20,
          backgroundColor: "transparent",
          borderColor: "var(--primary)",
          borderWidth: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(dot, {
          scale: 1,
          backgroundColor: "var(--primary)",
          duration: 0.2,
        });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    // Hide cursor when it leaves the window
    const handleMouseLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };
    const handleMouseEnterWindow = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
    };

    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRingRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-10 w-10 rounded-full border border-primary bg-transparent"
        style={{ willChange: "transform, width, height, border-color, background-color" }}
      >
        {cursorText && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[7px] font-bold uppercase tracking-widest text-accent whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-primary"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
