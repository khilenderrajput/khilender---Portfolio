'use client';

import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Types for stardust dots
interface StardustDot {
  id: number;
  x: number;
  y: number;
  r: number;
  color: string;
  glow: boolean;
  opacity: number;
  twinkleDuration: number;
  twinkleDelay: number;
}

// Cubic Bezier helper evaluation
function cubicBezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const oneMinusT = 1 - t;
  return (
    oneMinusT * oneMinusT * oneMinusT * p0 +
    3 * oneMinusT * oneMinusT * t * p1 +
    3 * oneMinusT * t * t * p2 +
    t * t * t * p3
  );
}

// Define segments of the vertical zig-zag path in SVG viewBox space (1000 x 4000)
const SEGMENTS = [
  // Segment 0: Top center to left curve
  { p0: { x: 500, y: 50 }, p1: { x: 320, y: 200 }, p2: { x: 180, y: 400 }, p3: { x: 180, y: 600 } },
  // Segment 1: Left curve to right curve
  { p0: { x: 180, y: 600 }, p1: { x: 180, y: 880 }, p2: { x: 820, y: 920 }, p3: { x: 820, y: 1200 } },
  // Segment 2: Right curve to left curve
  { p0: { x: 820, y: 1200 }, p1: { x: 820, y: 1480 }, p2: { x: 180, y: 1520 }, p3: { x: 180, y: 1800 } },
  // Segment 3: Left curve to right curve
  { p0: { x: 180, y: 1800 }, p1: { x: 180, y: 2080 }, p2: { x: 820, y: 2120 }, p3: { x: 820, y: 2400 } },
  // Segment 4: Right curve to left curve
  { p0: { x: 820, y: 2400 }, p1: { x: 820, y: 2680 }, p2: { x: 220, y: 2720 }, p3: { x: 220, y: 3000 } },
  // Segment 5: Left curve to right curve
  { p0: { x: 220, y: 3000 }, p1: { x: 220, y: 3280 }, p2: { x: 780, y: 3320 }, p3: { x: 780, y: 3600 } },
  // Segment 6: Right curve to bottom center
  { p0: { x: 780, y: 3600 }, p1: { x: 780, y: 3800 }, p2: { x: 500, y: 3880 }, p3: { x: 500, y: 3960 } },
];

// Generate path 'd' string from segments
const PATH_D = SEGMENTS.reduce((acc, seg, idx) => {
  if (idx === 0) {
    return `M ${seg.p0.x},${seg.p0.y} C ${seg.p1.x},${seg.p1.y} ${seg.p2.x},${seg.p2.y} ${seg.p3.x},${seg.p3.y}`;
  }
  return `${acc} C ${seg.p1.x},${seg.p1.y} ${seg.p2.x},${seg.p2.y} ${seg.p3.x},${seg.p3.y}`;
}, '');

// Golden stardust color palette
const GOLDEN_PALETTE = [
  '#FFD700', // Gold
  '#F5D061', // Warm Yellow-Gold
  '#FFF59D', // Light Champagne Gold
  '#FFC107', // Amber Gold
  '#FFFDE7', // Bright Core White-Gold
  '#E6C200', // Soft Golden Yellow
];

// Helper to evaluate point on zig-zag curve given global parameter u in [0, 1]
function getCurvePoint(u: number): { x: number; y: number } {
  const clamped = Math.max(0, Math.min(1, u));
  const segIndex = Math.min(SEGMENTS.length - 1, Math.floor(clamped * SEGMENTS.length));
  const segT = clamped * SEGMENTS.length - segIndex;
  const seg = SEGMENTS[segIndex];

  const x = cubicBezier(seg.p0.x, seg.p1.x, seg.p2.x, seg.p3.x, segT);
  const y = cubicBezier(seg.p0.y, seg.p1.y, seg.p2.y, seg.p3.y, segT);
  return { x, y };
}

// Pseudo-random generator for consistent server/client hydration
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export default function CosmicBackground() {
  const { scrollYProgress } = useScroll();

  // Vertical parallax movement for the path and stardust dots
  const pathParallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const dotsParallaxY = useTransform(scrollYProgress, [0, 1], [0, -220]);

  // Dynamic path length drawing along with scroll (starts at 15% ~630px beside SEE THE PROJECTS button area)
  const pathLength = useTransform(scrollYProgress, [0, 0.95], [0.15, 1]);

  // Overall path fade-in/out on scroll
  const pathOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0.5, 1, 1, 0.4]);

  // Generate spread-out yellow and golden glowing stardust dots along the zig-zag curves
  const stardustDots: StardustDot[] = useMemo(() => {
    const dots: StardustDot[] = [];
    const totalDots = 240;
    let seed = 12345;

    for (let i = 0; i < totalDots; i++) {
      const u = i / totalDots;
      const { x: baseX, y: baseY } = getCurvePoint(u);

      // Organic radial spread around the curve (denser close to curve, spread out at curves)
      const spread = (pseudoRandom(seed++) - 0.5) * 85;
      const spreadY = (pseudoRandom(seed++) - 0.5) * 45;
      const posX = Math.max(40, Math.min(960, baseX + spread));
      const posY = Math.max(30, Math.min(3970, baseY + spreadY));

      // Omit upper dots above the SEE THE PROJECTS button area (y < 630)
      if (posY < 630) continue;

      const sizeRand = pseudoRandom(seed++);
      let r = 1.8;
      let glow = false;

      if (sizeRand < 0.6) {
        r = 1.2 + pseudoRandom(seed++) * 1.0; // Small stardust dot
      } else if (sizeRand < 0.88) {
        r = 2.2 + pseudoRandom(seed++) * 1.2; // Medium glowing dot
        glow = true;
      } else {
        r = 3.6 + pseudoRandom(seed++) * 2.0; // Large glowing star core
        glow = true;
      }

      const color = GOLDEN_PALETTE[Math.floor(pseudoRandom(seed++) * GOLDEN_PALETTE.length)];
      const opacity = 0.35 + pseudoRandom(seed++) * 0.65;
      const twinkleDuration = 1.8 + pseudoRandom(seed++) * 3.2;
      const twinkleDelay = pseudoRandom(seed++) * 4;

      dots.push({
        id: i,
        x: posX,
        y: posY,
        r,
        color,
        glow,
        opacity,
        twinkleDuration,
        twinkleDelay,
      });
    }

    return dots;
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none w-full min-h-screen bg-[#0A0A0A]"
      aria-hidden="true"
    >
      {/* Ambient background glowing nebula spots along zig-zag inflection zones */}
      <motion.div
        style={{ y: pathParallaxY }}
        className="absolute inset-0 pointer-events-none w-full h-full"
      >
        <div className="absolute top-[12%] left-[12%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,_rgba(255,215,0,0.08)_0%,_rgba(245,208,97,0.02)_50%,_transparent_70%)] blur-3xl" />
        <div className="absolute top-[32%] right-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(255,193,7,0.07)_0%,_rgba(230,194,0,0.02)_50%,_transparent_70%)] blur-3xl" />
        <div className="absolute top-[55%] left-[8%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,_rgba(255,215,0,0.07)_0%,_rgba(252,231,134,0.02)_50%,_transparent_70%)] blur-3xl" />
        <div className="absolute top-[78%] right-[12%] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,_rgba(255,193,7,0.08)_0%,_rgba(245,208,97,0.02)_50%,_transparent_70%)] blur-3xl" />
      </motion.div>

      {/* Main Cosmic SVG Container */}
      <svg
        className="w-full h-full block pointer-events-none"
        viewBox="0 0 1000 4000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Soft Golden Glow Filter for stardust dots */}
          <filter id="cosmic-gold-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft Path Glow Filter */}
          <filter id="cosmic-path-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Golden Gradient for the continuous zig-zag line */}
          <linearGradient id="cosmic-gold-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.75" />
            <stop offset="25%" stopColor="#FFF59D" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#F5D061" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#FFC107" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.65" />
          </linearGradient>

          {/* Secondary background path subtle halo */}
          <linearGradient id="cosmic-halo-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#F5D061" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFC107" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* 1. Continuous Vertical Zig-Zag Path with Soft Glow and Parallax */}
        <motion.g style={{ y: pathParallaxY, opacity: pathOpacity }}>
          {/* Outer glowing halo path */}
          <motion.path
            d={PATH_D}
            fill="none"
            stroke="url(#cosmic-halo-gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#cosmic-path-glow)"
            style={{ pathLength }}
          />

          {/* Core crisp golden zig-zag line */}
          <motion.path
            d={PATH_D}
            fill="none"
            stroke="url(#cosmic-gold-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#cosmic-path-glow)"
            style={{ pathLength }}
          />
        </motion.g>

        {/* 2. Spread-out Yellow & Golden Glowing Dots (Stardust style) along the curves */}
        <motion.g style={{ y: dotsParallaxY }}>
          {stardustDots.map((dot) => (
            <motion.circle
              key={dot.id}
              cx={dot.x}
              cy={dot.y}
              r={dot.r}
              fill={dot.color}
              filter={dot.glow ? 'url(#cosmic-gold-glow)' : undefined}
              initial={{ opacity: dot.opacity, scale: 1 }}
              animate={{
                opacity: [dot.opacity * 0.35, dot.opacity, dot.opacity * 0.35],
                scale: dot.glow ? [0.85, 1.25, 0.85] : [0.95, 1.08, 0.95],
              }}
              transition={{
                duration: dot.twinkleDuration,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: dot.twinkleDelay,
              }}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
}
