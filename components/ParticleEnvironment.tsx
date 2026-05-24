"use client";

import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  wobble: number;
  wobbleSpeed: number;
}

interface LeafParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

export default function ParticleEnvironment() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let leaves: LeafParticle[] = [];

    // Set canvas sizes
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initEnvironment();
    };

    const initEnvironment = () => {
      particles = [];
      leaves = [];
      const particleCount = Math.min(60, Math.floor((window.innerWidth * window.innerHeight) / 25000));
      const leafCount = Math.min(12, Math.floor((window.innerWidth * window.innerHeight) / 120000));

      // 1. Initialize Pollen/Dust Particles
      const particleColors = ["#81C784", "#66BB6A", "#D4AF37", "#FFFFFF", "#E8F5E9"];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.8 + 0.8,
          speedX: (Math.random() - 0.5) * 0.4 + 0.1, // Slight drift right
          speedY: -Math.random() * 0.5 - 0.2, // Drift upward
          opacity: Math.random() * 0.4 + 0.15,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.02 + 0.005,
        });
      }

      // 2. Initialize Drifting Leaf Particles
      const leafColors = ["#2E7D32", "#81C784", "#66BB6A", "#C8E6C9"];
      for (let i = 0; i < leafCount; i++) {
        leaves.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 12 + 6,
          speedX: Math.random() * 0.6 + 0.2, // Drift right
          speedY: Math.random() * 0.4 + 0.3, // Drift downward
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.015,
          opacity: Math.random() * 0.3 + 0.2,
          color: leafColors[Math.floor(Math.random() * leafColors.length)],
        });
      }
    };

    // Track mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      // 1. Draw Pollen Particles
      particles.forEach((p) => {
        // Apply wind/drift
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.15;
        p.y += p.speedY;

        // Mouse repelling interaction
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const forceRadius = 150;
          
          if (dist < forceRadius) {
            const force = (forceRadius - dist) / forceRadius;
            const angle = Math.atan2(dy, dx);
            p.x += Math.cos(angle) * force * 1.5;
            p.y += Math.sin(angle) * force * 1.5;
          }
        }

        // Loop screen edges
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        // Draw particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Add soft glow to gold particles
        if (p.color === "#D4AF37") {
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#D4AF37";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.restore();
      });

      // 2. Draw Leaf Particles (Organic shapes)
      leaves.forEach((leaf) => {
        leaf.x += leaf.speedX + Math.sin(leaf.x * 0.005) * 0.3;
        leaf.y += leaf.speedY;
        leaf.rotation += leaf.rotationSpeed;

        // Mouse displacement
        if (mouse.active) {
          const dx = leaf.x - mouse.x;
          const dy = leaf.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200;
            const angle = Math.atan2(dy, dx);
            leaf.x += Math.cos(angle) * force * 3;
            leaf.y += Math.sin(angle) * force * 3;
          }
        }

        // Loop leaf edges
        if (leaf.y > canvas.height + 20 || leaf.x > canvas.width + 20) {
          leaf.y = -20;
          leaf.x = Math.random() * canvas.width - 200;
          leaf.size = Math.random() * 12 + 6;
        }

        // Draw simplified organic leaf shape
        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        ctx.globalAlpha = leaf.opacity;
        ctx.fillStyle = leaf.color;

        ctx.beginPath();
        // Leaf bezier curves
        ctx.moveTo(0, -leaf.size / 2);
        ctx.quadraticCurveTo(leaf.size / 2, -leaf.size / 4, 0, leaf.size / 2);
        ctx.quadraticCurveTo(-leaf.size / 2, -leaf.size / 4, 0, -leaf.size / 2);
        ctx.fill();

        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Run initial sizing
    handleResize();
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
