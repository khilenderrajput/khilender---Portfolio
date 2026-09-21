'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Particle {
  id: number;
  t: number;             // Trajectory parameter along zig-zag path (0 to 1)
  dist: number;          // Distance/radius from cluster or path center
  baseAngle: number;     // Base angle for orbital calculation
  spinDirection: number; // +1 or -1 direction for orbital spin
  isCluster: boolean;    // Flag indicating if particle belongs to a special orbital cluster
  clusterId?: number;    // ID of the parent cluster
  radius: number;        // Particle dot radius (px)
  color: string;         // RGB string for pale yellow/cream color
  baseAlpha: number;     // Base opacity (0.15 to 0.9)
  hasGlow: boolean;      // Flag for soft radial core glow
}

interface SpecialCluster {
  id: number;
  initialT: number;      // Trajectory base position on existing zig-zag path (0 to 1)
  spinDirection: number; // Clockwise or counter-clockwise spin
  radius: number;        // Outer boundary radius (px)
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let docHeight = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight * 3
    );
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = docHeight);

    // Box-Muller transform for natural Gaussian distribution
    const gaussianRandom = () => {
      let u = 0,
        v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    };

    // Light Pale Soft Yellowish / Creamy Yellow-White palette
    const palette = [
      '240, 236, 207', // Light Soft Pale Yellow Highlight (#F0ECCF)
      '232, 228, 201', // Primary Pale Soft Yellow (#E8E4C9)
      '243, 239, 207', // Bright Pale Yellow Particle (#F3EFCF)
      '237, 232, 190', // Creamy Soft Yellow (#EDE8BE)
      '255, 252, 225', // Crisp Cream White-Yellow (#FFFCE1)
    ];

    // Measure bounds and calculate start (hero area) and end (footer)
    let startY = 200;
    let startX = width * 0.55;
    let endY = docHeight - 380;

    let isMobile = width < 768;

    const trajPoints: { x: number; y: number }[] = [];

    const buildTrajPoints = () => {
      const totalSpan = Math.max(600, endY - startY);
      const segments = 18;
      const segHeight = totalSpan / segments;
      isMobile = width < 768;
      const amplitude = isMobile ? Math.min(width * 0.22, 85) : Math.min(width * 0.15, 175);
      const centerX = width < 1024 ? width * 0.5 : width * 0.52;

      trajPoints.length = 0;
      for (let i = 0; i <= segments; i++) {
        const y = startY + i * segHeight;
        let x = centerX;
        if (i === 0) x = startX;
        else if (i === segments) x = width * 0.5;
        else x = centerX + (i % 2 === 1 ? -1 : 1) * amplitude;
        trajPoints.push({ x, y });
      }
    };

    const updateBounds = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight * 3
      );
      width = canvas.width = window.innerWidth;
      height = canvas.height = docHeight;

      const heroPhoto =
        document.querySelector('img[alt*="Profile"]') || document.querySelector('#hero');
      if (heroPhoto) {
        const rect = heroPhoto.getBoundingClientRect();
        startY = rect.top + window.scrollY + rect.height * 0.2;
        startX = rect.left + rect.width * 0.5;
      } else {
        startY = 200;
        startX = width * 0.55;
      }

      const contactSection = document.querySelector('#contact');
      const footerText =
        contactSection?.querySelector('p.font-mono') ||
        contactSection?.querySelector('p') ||
        document.querySelector('footer');

      if (footerText) {
        const rect = footerText.getBoundingClientRect();
        endY = rect.top + window.scrollY + rect.height * 0.5;
      } else if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        endY = rect.bottom + window.scrollY - 30;
      } else {
        endY = docHeight - 80;
      }

      buildTrajPoints();
    };

    updateBounds();
    const layoutTimer = setTimeout(updateBounds, 350);

    // Bezier interpolation helper along existing trajectory
    const getPointOnPath = (t: number): { x: number; y: number } => {
      const clampedT = Math.max(0, Math.min(1, t));
      const totalSegs = trajPoints.length - 1;
      const segIdx = Math.min(totalSegs - 1, Math.floor(clampedT * totalSegs));
      const localT = clampedT * totalSegs - segIdx;

      const p1 = trajPoints[segIdx];
      const p2 = trajPoints[segIdx + 1];

      // Smooth Hermite/Bezier interpolation
      const smoothT = localT * localT * (3 - 2 * localT);
      const x = p1.x + (p2.x - p1.x) * smoothT;
      const y = p1.y + (p2.y - p1.y) * smoothT;

      return { x, y };
    };

    // 2. Define Special Orbital Clusters positioned directly ON the existing zig-zag path
    const clusters: SpecialCluster[] = [
      { id: 0, initialT: 0.18, spinDirection: 1, radius: isMobile ? 65 : 85 },  // Hero / intro zone
      { id: 1, initialT: 0.42, spinDirection: -1, radius: isMobile ? 75 : 95 }, // Main middle portfolio zone (Projects)
      { id: 2, initialT: 0.65, spinDirection: 1, radius: isMobile ? 70 : 90 },  // Certificates / Skills zone
      { id: 3, initialT: 0.82, spinDirection: -1, radius: isMobile ? 65 : 85 }, // Contact / Bottom zone
    ];

    const particles: Particle[] = [];
    let particleIdCounter = 0;

    // A. Generate Special Orbital Cluster Particles
    clusters.forEach((c) => {
      const clusterParticlesCount = isMobile ? 90 : 140;
      for (let j = 0; j < clusterParticlesCount; j++) {
        const ringType = Math.random();
        let dist = 12;

        if (ringType < 0.22) {
          dist = Math.random() * 15 + 10;
        } else if (ringType < 0.65) {
          dist = Math.random() * 30 + 25;
        } else {
          dist = Math.random() * 35 + 55;
        }

        dist += (Math.random() - 0.5) * 8;

        const baseAngle = Math.random() * Math.PI * 2;
        const color = palette[Math.floor(Math.random() * palette.length)];

        const sizeRand = Math.random();
        let radius = 1.6;
        let hasGlow = false;

        if (dist < 22 && sizeRand < 0.3) {
          radius = Math.random() * 2.5 + 4.5;
          hasGlow = true;
        } else if (sizeRand < 0.75) {
          radius = Math.random() * 1.4 + 1.5;
        } else {
          radius = Math.random() * 1.8 + 3.0;
          if (Math.random() < 0.4) hasGlow = true;
        }

        const baseAlpha = Math.max(0.2, (1 - dist / (c.radius * 1.15))) * (Math.random() * 0.45 + 0.55);

        particles.push({
          id: particleIdCounter++,
          t: c.initialT,
          dist,
          baseAngle,
          spinDirection: c.spinDirection,
          isCluster: true,
          clusterId: c.id,
          radius,
          color,
          baseAlpha,
          hasGlow,
        });
      }
    });

    // B. Generate Normal Zig-Zag Stream Particles
    const streamParticlesCount = isMobile ? 700 : 1400;
    const spreadSigma = isMobile ? 24 : 44;
    for (let i = 0; i < streamParticlesCount; i++) {
      const t = i / streamParticlesCount;
      const dist = Math.abs(gaussianRandom()) * spreadSigma;
      const baseAngle = Math.random() * Math.PI * 2;

      const sizeRand = Math.random();
      let radius = 1.4;
      let hasGlow = false;
      if (sizeRand < 0.8) radius = Math.random() * 1.2 + 1.0;
      else if (sizeRand < 0.96) radius = Math.random() * 1.4 + 2.2;
      else {
        radius = Math.random() * 1.4 + 3.6;
        hasGlow = true;
      }

      const baseAlpha = Math.max(0.18, 1 - dist / (spreadSigma * 2.2)) * (Math.random() * 0.45 + 0.5);
      const color = palette[Math.floor(Math.random() * palette.length)];

      particles.push({
        id: particleIdCounter++,
        t,
        dist,
        baseAngle,
        spinDirection: i % 2 === 0 ? 1 : -1,
        isCluster: false,
        radius,
        color,
        baseAlpha,
        hasGlow,
      });
    }

    const handleResize = () => {
      updateBounds();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const initialScrollY = typeof window !== 'undefined' ? window.scrollY : 0;

    let time = 0;
    const render = () => {
      time += 0.015;

      const currentScrollY = window.scrollY;
      const scrollOffset = (currentScrollY - initialScrollY) * 2.0;

      ctx.clearRect(0, 0, width, height);

      const visibleRevealY = currentScrollY + window.innerHeight * 2.0;

      // Calculate cluster center positions directly at the final draw coordinates
      const clusterCenters = clusters.map((c) => {
        const baseCenter = getPointOnPath(c.initialT);
        return {
          id: c.id,
          center: {
            x: baseCenter.x,
            y: baseCenter.y + scrollOffset,
          },
          radius: c.radius,
        };
      });

      // Draw cluster radial gradients at the scroll-linked center positions
      clusters.forEach((c, idx) => {
        const cPt = clusterCenters[idx].center;
        if (cPt.y <= visibleRevealY + 800 && cPt.y >= currentScrollY - 800) {
          ctx.save();
          const grad = ctx.createRadialGradient(cPt.x, cPt.y, 0, cPt.x, cPt.y, c.radius * 0.9);
          grad.addColorStop(0, 'rgba(240, 236, 207, 0.28)');
          grad.addColorStop(0.35, 'rgba(232, 228, 201, 0.12)');
          grad.addColorStop(1, 'rgba(240, 236, 207, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cPt.x, cPt.y, c.radius * 0.9, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        let pX: number;
        let pY: number;

        if (p.isCluster && p.clusterId !== undefined) {
          // 1. Existing orbital position calculation
          const baseCenter = getPointOnPath(p.t);
          const angle = p.baseAngle + time * 0.5 * p.spinDirection;

          const particleX = baseCenter.x + Math.cos(angle) * p.dist;
          const particleY = baseCenter.y + Math.sin(angle) * p.dist;

          // 2. Final particle position receives 1:1 viewport scrollOffset directly at draw target
          const finalParticleX = particleX;
          const finalParticleY = particleY + scrollOffset;

          pX = finalParticleX;
          pY = finalParticleY;
        } else {
          // Normal stream particles follow trajectory
          const pathPt = getPointOnPath(p.t);
          const angle = p.baseAngle + time * 0.1 * p.spinDirection;
          pX = pathPt.x + Math.cos(angle) * p.dist;
          pY = pathPt.y + Math.sin(angle) * p.dist * 0.7;

          if (pY > endY || pY > visibleRevealY) continue;
        }

        if (pY > height + 1000 || pY < -1000) continue;

        const revealFactor = p.isCluster ? 1.0 : Math.min(1, Math.max(0, (visibleRevealY - pY) / 140));
        const twinkle = p.hasGlow ? Math.sin(time * 2.2 + p.id) * 0.15 + 0.85 : 1.0;
        const finalAlpha = Math.min(1, Math.max(0, p.baseAlpha * revealFactor * twinkle));

        if (finalAlpha <= 0.02) continue;

        ctx.save();
        ctx.beginPath();
        ctx.arc(pX, pY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${finalAlpha.toFixed(2)})`;

        if (p.hasGlow) {
          ctx.shadowColor = 'rgba(240, 236, 207, 0.85)';
          ctx.shadowBlur = p.radius * 4;
        }

        ctx.fill();
        ctx.restore();
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearTimeout(layoutTimer);
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none w-full min-h-screen bg-[#0A0A0A]">
      <motion.div
        style={{ y: parallaxY }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(240,236,207,0.14)] via-[rgba(232,228,201,0.04)] to-transparent blur-3xl pointer-events-none"
      />
      <canvas ref={canvasRef} className="w-full block pointer-events-none" />
    </div>
  );
}
