"use client";

import React, { useRef, useEffect, useState } from "react";
import { getLenis } from "@/lib/lenis";

const TOTAL_FRAMES = 40;
const LERP = 0.1;
const VIRTUAL_SCROLL = 3500; // total wheel delta to scrub all 40 frames

const FRAME_URLS = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
  `/hero-frames/ezgif-frame-${String(i + 1).padStart(3, "0")}.jpg`
);

const SCENES = [
  { from: 0.00, to: 0.20, label: "INTELLIGENT AGRI-BIOME",  title: "SAVAXA",                   sub: "Smart Crop Protection & Sustainable Agriculture" },
  { from: 0.20, to: 0.40, label: "PRECISION ECOSYSTEM",     title: "Protecting Every Harvest.", sub: "Formulated for Nature. Engineered for Performance." },
  { from: 0.40, to: 0.60, label: "ECOLOGICAL SYNERGY",      title: "Technology Meets Nature.",  sub: "AI-driven diagnostics. Bio-safe chemistry." },
  { from: 0.60, to: 0.80, label: "REGENERATIVE DESIGN",     title: "Sustainable Crop Care.",    sub: "Zero-residue. Soil-first. Carbon-conscious." },
  { from: 0.80, to: 1.00, label: "COGNITIVE BIOSPHERE",     title: "Future-Ready Agriculture.", sub: "Grow Smarter. Harvest More. Protect Always." },
];

export default function HeroSection() {
  const canvasRef        = useRef<HTMLCanvasElement>(null);
  const imagesRef        = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const targetRef        = useRef(0);   // desired frame (float)
  const currentRef       = useRef(0);   // lerped frame (float)
  const lastPaintedRef   = useRef(-1);
  const rafIdRef         = useRef(0);
  const accDeltaRef      = useRef(0);   // accumulated wheel delta
  const progressRef      = useRef(0);   // 0 → 1

  const [loadedCount,     setLoadedCount]     = useState(0);
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [allLoaded,       setAllLoaded]       = useState(false);
  const [done,            setDone]            = useState(false); // sequence finished
  const [scene,           setScene]           = useState(SCENES[0]);
  const [sceneVisible,    setSceneVisible]    = useState(true);

  // ── Draw helper ────────────────────────────────────────────────────────────
  const paint = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete || !img.naturalWidth) return;

    const cw = canvas.width, ch = canvas.height;
    const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * scale, dh = img.naturalHeight * scale;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);

    // Vignette
    const v = ctx.createRadialGradient(cw/2,ch/2,ch*0.1, cw/2,ch/2,ch*0.9);
    v.addColorStop(0,   "rgba(0,0,0,0)");
    v.addColorStop(0.6, "rgba(0,0,0,0.15)");
    v.addColorStop(1,   "rgba(0,0,0,0.65)");
    ctx.fillStyle = v; ctx.fillRect(0, 0, cw, ch);

    // Bottom fog into next section
    const f = ctx.createLinearGradient(0, ch * 0.6, 0, ch);
    f.addColorStop(0, "rgba(244,255,244,0)");
    f.addColorStop(1, "rgba(244,255,244,0.9)");
    ctx.fillStyle = f; ctx.fillRect(0, 0, cw, ch);

    lastPaintedRef.current = index;
  };

  // ── Canvas sizing ──────────────────────────────────────────────────────────
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current; if (!c) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width  = window.innerWidth  * dpr;
      c.height = window.innerHeight * dpr;
      const ctx = c.getContext("2d", { alpha: false });
      if (ctx) { ctx.scale(dpr, dpr); }
      c.style.width  = `${window.innerWidth}px`;
      c.style.height = `${window.innerHeight}px`;
      paint(Math.round(currentRef.current));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Preload images ─────────────────────────────────────────────────────────
  useEffect(() => {
    let settled = 0;
    const load = (indices: number[]) => {
      indices.forEach(i => {
        const img = new Image();
        img.decoding = "async";
        img.src = FRAME_URLS[i];
        imagesRef.current[i] = img;
        const onDone = () => {
          settled++;
          setLoadedCount(settled);
          if (i === 0 && img.naturalWidth > 0) { paint(0); setFirstFrameReady(true); }
          if (settled === TOTAL_FRAMES) setAllLoaded(true);
        };
        img.complete && img.naturalWidth ? onDone() : (img.onload = onDone, img.onerror = onDone);
      });
    };
    load(Array.from({ length: 5 }, (_, i) => i)); // priority: first 5
    const t = setTimeout(() => load(Array.from({ length: TOTAL_FRAMES - 5 }, (_, i) => i + 5)), 300);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── RAF lerp loop ──────────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      rafIdRef.current = requestAnimationFrame(tick);
      const diff = targetRef.current - currentRef.current;
      currentRef.current += Math.abs(diff) < 0.01 ? diff : diff * LERP;
      const idx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentRef.current)));
      if (Math.abs(idx - lastPaintedRef.current) >= 0.1) paint(idx);
    };
    rafIdRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafIdRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Scroll lock + wheel handler ────────────────────────────────────────────
  useEffect(() => {
    if (done) return;

    // Lock the page scroll immediately
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // Also stop Lenis (poll until available)
    const stopLenis = () => { const l = getLenis(); if (l) l.stop(); };
    stopLenis();
    const pollId = setInterval(stopLenis, 100);
    setTimeout(() => clearInterval(pollId), 3000);

    const updateScene = (p: number) => {
      const next = SCENES.find(s => p >= s.from && p < s.to) ?? SCENES[SCENES.length - 1];
      setScene(prev => {
        if (prev.title === next.title) return prev;
        setSceneVisible(false);
        setTimeout(() => { setScene(next); setSceneVisible(true); }, 250);
        return prev;
      });
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY <= 0) return; // only forward
      accDeltaRef.current = Math.min(VIRTUAL_SCROLL, accDeltaRef.current + e.deltaY);
      const p = accDeltaRef.current / VIRTUAL_SCROLL;
      progressRef.current = p;
      targetRef.current   = p * (TOTAL_FRAMES - 1);
      updateScene(p);
      if (p >= 1) setDone(true);
    };

    // Touch support
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      e.preventDefault();
      const dy = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      if (dy <= 0) return;
      accDeltaRef.current = Math.min(VIRTUAL_SCROLL, accDeltaRef.current + dy * 4);
      const p = accDeltaRef.current / VIRTUAL_SCROLL;
      progressRef.current = p;
      targetRef.current   = p * (TOTAL_FRAMES - 1);
      updateScene(p);
      if (p >= 1) setDone(true);
    };

    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: false });

    return () => {
      clearInterval(pollId);
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
    };
  }, [done]);

  // ── Unlock scroll when sequence finishes ───────────────────────────────────
  useEffect(() => {
    if (!done) return;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    const l = getLenis(); if (l) l.start();
  }, [done]);

  const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    // Just one viewport height — no extra scroll distance needed
    <div id="hero" className="relative w-full h-screen">
      <canvas ref={canvasRef} className="absolute inset-0" style={{ display: "block" }} />

      {/* ── Story text ──────────────────────────────────────────────────────── */}
      {firstFrameReady && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none select-none z-10"
          style={{ opacity: sceneVisible ? 1 : 0, transition: "opacity 0.28s ease" }}
        >
          <div className="flex items-center gap-2 mb-5 bg-black/25 border border-white/15 backdrop-blur-sm rounded-full px-5 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent">{scene.label}</span>
          </div>
          <h1 className="font-display font-extrabold text-white tracking-tight leading-none drop-shadow-2xl"
              style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}>
            {scene.title}
          </h1>
          <p className="font-editorial italic text-white/70 mt-4 max-w-xl"
             style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)" }}>
            {scene.sub}
          </p>
        </div>
      )}

      {/* ── Scroll progress bar + cue ────────────────────────────────────────── */}
      {firstFrameReady && !done && (
        <>
          {/* Bottom progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/10 z-20 pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-primary via-accent to-primary"
              style={{ width: `${(progressRef.current ?? 0) * 100}%`, transition: "width 0.1s linear" }}
            />
          </div>
          {/* Scroll cue */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20 animate-bounce">
            <span className="text-[9px] uppercase font-bold tracking-[0.35em] text-white/60 mb-1">Scroll to Explore</span>
            <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </>
      )}

      {/* ── "Sequence complete" unlock cue ───────────────────────────────────── */}
      {done && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20 animate-bounce">
          <span className="text-[9px] uppercase font-bold tracking-[0.35em] text-white/60 mb-1">Continue Scrolling</span>
          <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}

      {/* ── Frame counter ─────────────────────────────────────────────────────── */}
      {firstFrameReady && (
        <div className="absolute top-6 right-6 bg-black/30 border border-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 pointer-events-none z-20">
          <span className="font-display text-[9px] uppercase tracking-widest text-accent font-semibold">
            {String(Math.min(TOTAL_FRAMES, Math.round(currentRef.current) + 1)).padStart(2, "0")} / {TOTAL_FRAMES}
          </span>
        </div>
      )}

      {/* ── Loading overlay ───────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-[#061006] flex flex-col items-center justify-center z-50"
        style={{ opacity: firstFrameReady ? 0 : 1, pointerEvents: firstFrameReady ? "none" : "all", transition: "opacity 0.8s ease-out" }}
      >
        <div className="relative mb-8 flex items-center justify-center">
          <div className="h-24 w-24 rounded-full border border-primary/20 animate-spin [animation-duration:12s] flex items-center justify-center">
            <div className="h-14 w-14 rounded-full border border-dashed border-accent/30" />
          </div>
          <div className="absolute h-8 w-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <span className="text-accent font-display text-sm font-bold">S</span>
          </div>
        </div>
        <div className="font-display font-bold text-white leading-none mb-3" style={{ fontSize: "clamp(4rem,12vw,7rem)" }}>
          {pct}<span className="text-accent font-light ml-2" style={{ fontSize: "clamp(1.5rem,3vw,2.5rem)" }}>%</span>
        </div>
        <p className="font-display text-[10px] uppercase tracking-[0.35em] text-white/30 mb-2">Loading Cinematic Sequence</p>
        <p className="font-sans text-[11px] text-white/20 mb-8">{loadedCount} / {TOTAL_FRAMES} frames</p>
        <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#2E7D32,#D4AF37,#2E7D32)", transition: "width 0.2s ease-out" }} />
        </div>
      </div>
    </div>
  );
}
