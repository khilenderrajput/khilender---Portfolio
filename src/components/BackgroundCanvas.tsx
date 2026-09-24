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
    let cutoffY = 610;

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
        startY = rect.top + window.scrollY + rect.height * 0.12;
        // Position startX at the side edge of the profile photo container
        startX = Math.min(width - 40, rect.left + rect.width * 0.85 + 15);
      } else {
        startY = 200;
        startX = width * 0.6;
      }

      const projectsBtn = document.querySelector('a[href="#projects"]');
      if (projectsBtn) {
        const rect = projectsBtn.getBoundingClientRect();
        cutoffY = Math.max(660, rect.top + window.scrollY + 400);
      } else {
        cutoffY = 660;
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

    // 2. Define strictly ONE single Special Orbital Cluster that travels along the yellow dots path
    const singleCluster: SpecialCluster = {
      id: 0,
      initialT: 0,
      spinDirection: 1,
      radius: isMobile ? 70 : 90,
    };

    const particles: Particle[] = [];
    let particleIdCounter = 0;

    // A. Generate Single Orbital Cluster Particles (matching visual reference)
    const clusterParticlesCount = isMobile ? 6 : 9;
    const clusterPalette = [
      '245, 236, 203', // Warm Pale Gold
      '239, 229, 190', // Soft Golden Cream
      '250, 244, 214', // Warm Bright Golden White
      '234, 221, 170', // Muted Soft Gold
    ];

    for (let j = 0; j < clusterParticlesCount; j++) {
      const ringType = Math.random();
      let dist = 12;

      if (ringType < 0.3) {
        dist = Math.random() * 15 + 8;
      } else if (ringType < 0.7) {
        dist = Math.random() * 25 + 20;
      } else {
        dist = Math.random() * 30 + 40;
      }

      dist += (Math.random() - 0.5) * 6;

      const baseAngle = Math.random() * Math.PI * 2;
      const color = clusterPalette[Math.floor(Math.random() * clusterPalette.length)];

      const sizeRand = Math.random();
      let radius = 2.4;

      if (sizeRand < 0.35) {
        radius = Math.random() * 1.5 + 2.2;
      } else if (sizeRand < 0.8) {
        radius = Math.random() * 1.8 + 3.2;
      } else {
        radius = Math.random() * 1.8 + 4.2;
      }

      const baseAlpha = Math.max(0.45, 1 - dist / (singleCluster.radius * 1.2)) * (Math.random() * 0.35 + 0.65);

      particles.push({
        id: particleIdCounter++,
        t: 0,
        dist,
        baseAngle,
        spinDirection: singleCluster.spinDirection,
        isCluster: true,
        clusterId: 0,
        radius,
        color,
        baseAlpha,
        hasGlow: true,
      });
    }

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

    let time = 0;
    let smoothProgress = 0;

    const render = () => {
      time += 0.015;

      const currentScrollY = window.scrollY;
      const vh = window.innerHeight;
      const maxScroll = Math.max(1, docHeight - vh);
      const targetProgress = Math.min(1.0, Math.max(0, currentScrollY / maxScroll));

      smoothProgress += (targetProgress - smoothProgress) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const pathT = Math.min(1.0, Math.max(0.0, smoothProgress));
      const clusterT = Math.min(1.0, Math.max(0.03, 0.03 + smoothProgress * 0.97));
      const rawClusterCenter = getPointOnPath(clusterT);
      const centerX = width < 1024 ? width * 0.5 : width * 0.52;
      const horizScale = 0.86 + 0.14 * smoothProgress;
      const clusterCenter = {
        x: centerX + (rawClusterCenter.x - centerX) * horizScale,
        y: rawClusterCenter.y,
      };

      // Draw single cluster radial background glow behind the dots (matching reference image)
      ctx.save();
      const glowRadius = isMobile ? 135 : 190;
      const grad = ctx.createRadialGradient(
        clusterCenter.x,
        clusterCenter.y,
        0,
        clusterCenter.x,
        clusterCenter.y,
        glowRadius
      );
      grad.addColorStop(0, 'rgba(245, 230, 185, 0.24)');
      grad.addColorStop(0.25, 'rgba(240, 222, 175, 0.14)');
      grad.addColorStop(0.55, 'rgba(235, 215, 168, 0.05)');
      grad.addColorStop(0.8, 'rgba(230, 210, 160, 0.015)');
      grad.addColorStop(1, 'rgba(240, 225, 180, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(clusterCenter.x, clusterCenter.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        let pX: number;
        let pY: number;

        if (p.isCluster) {
          // Circular orbital group centers directly on the yellow dots trajectory path
          const angle = p.baseAngle + time * 0.5 * p.spinDirection;

          pX = clusterCenter.x + Math.cos(angle) * p.dist;
          pY = clusterCenter.y + Math.sin(angle) * p.dist;
        } else {
          // Normal stream particles follow trajectory path
          const pathPt = getPointOnPath(p.t);
          const angle = p.baseAngle + time * 0.1 * p.spinDirection;
          pX = pathPt.x + Math.cos(angle) * p.dist;
          pY = pathPt.y + Math.sin(angle) * p.dist * 0.7;

          if (pY > endY || pY < cutoffY) continue;
        }

        if (pY > height + 200 || pY < -200) continue;

        const twinkle = p.hasGlow ? Math.sin(time * 2.2 + p.id) * 0.15 + 0.85 : 1.0;
        const finalAlpha = Math.min(1, Math.max(0, p.baseAlpha * twinkle));

        if (finalAlpha <= 0.02) continue;

        ctx.save();
        ctx.beginPath();
        ctx.arc(pX, pY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${finalAlpha.toFixed(2)})`;

        if (p.hasGlow) {
          ctx.shadowColor = `rgba(${p.color}, 0.85)`;
          ctx.shadowBlur = p.radius * 3.5;
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
