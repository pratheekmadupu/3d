"use client";

import React, { useRef, useEffect } from "react";
import gsap, { ScrollTrigger } from "@/lib/gsap";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  duration?: number;
  stagger?: number;
}

export default function SplitTextReveal({
  text,
  className = "",
  tag: Tag = "h2",
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select all the split word elements
    const words = container.querySelectorAll(".reveal-word-inner");
    if (!words.length) return;

    // GSAP ScrollTrigger animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: "100%" },
        {
          y: "0%",
          duration: duration,
          delay: delay,
          stagger: stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [text, delay, duration, stagger]);

  // Split text into words
  const words = text.split(" ");

  return (
    <Tag ref={containerRef as any} className={`reveal-container flex flex-wrap ${className}`}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className="relative inline-block overflow-hidden mr-[0.25em] pb-[0.05em]"
        >
          <span className="reveal-word-inner relative inline-block translate-y-[100%]">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
