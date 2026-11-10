'use client';

import { useEffect, useRef } from 'react';

interface AmbientStar {
  x: number;
  y: number;
  r: number;
  base: number;
  phase: number;
  speed: number;
  drift: number;
  warm: boolean;
}

interface TrailPoint {
  pageY: number;
  x: number;
  r: number;
  phase: number;
  speed: number;
  base: number;
  color: string;
}

interface SwarmPoint {
  angle: number;
  radius: number;
  speed: number;
  r: number;
}

const TRAIL_FREQ = 0.0042;
const TRAIL_FREQ2 = 0.0113;

function pathXAt(pageY: number, centerX: number, amp: number) {
  return centerX + Math.sin(pageY * TRAIL_FREQ) * amp + Math.sin(pageY * TRAIL_FREQ2 + 1.3) * amp * 0.18;
}

/**
 * Recreates the reference portfolio's scrolling animations and visual effects:
 * - Ambient twinkling starfield drifting smoothly.
 * - Sinuous wavy stardust particle trail spanning all sections of the document.
 * - Glowing head cluster + orbiting swarm tracking scroll position down the trail.
 * - Dynamic golden bloom/glow activating on trail particles as user scrolls.
 * - High performance fixed-viewport canvas with automatic device-pixel ratio handling.
 */
export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let stars: AmbientStar[] = [];
    let trail: TrailPoint[] = [];
    let docHeight = 0;
    let trailStartY = 500;
    let trailEndY = 3000;
    let rafId = 0;

    let smoothHeadPageY = window.scrollY + window.innerHeight * 0.55;

    // Palette matching existing portfolio: warm pale gold, creamy yellow, gold highlight
    const palette = [
      '200, 169, 97',  // Primary Warm Gold (#c8a961)
      '240, 236, 207', // Light Pale Soft Yellow (#F0ECCF)
      '232, 228, 201', // Creamy Soft Yellow (#E8E4C9)
      '250, 244, 214', // Warm Bright Golden White
      '230, 225, 211', // Crisp Cream White (#e6e1d3)
    ];

    const swarm: SwarmPoint[] = Array.from({ length: 7 }, (_, i) => ({
      angle: (i / 7) * Math.PI * 2 + Math.random() * 0.5,
      radius: 10 + Math.random() * 24,
      speed: 0.55 + Math.random() * 0.55,
      r: 1 + Math.random() * 1.3,
    }));

    function makeStars() {
      const area = window.innerWidth * window.innerHeight;
      const count = Math.min(130, Math.max(50, Math.round(area / 15000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 0.6 + Math.random() * 1.4,
        base: 0.12 + Math.random() * 0.38,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
        drift: (Math.random() - 0.5) * 0.05,
        warm: Math.random() < 0.2,
      }));
    }

    function makeTrail() {
      docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight * 2
      );

      const hero = document.querySelector('#hero') || document.querySelector('[data-hero]');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        trailStartY = Math.max(380, rect.bottom + window.scrollY - 50);
      } else {
        trailStartY = 500;
      }

      trailEndY = docHeight - 100;

      const width = window.innerWidth;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      const centerX = width * 0.5;
      const amp = isMobile
        ? Math.min(75, width * 0.2)
        : isTablet
        ? Math.min(150, width * 0.25)
        : Math.min(240, width * 0.28);

      const spacing = isMobile ? 18 : 14;
      const bandWidth = isMobile ? 38 : 62;
      const starsPerRow = isMobile ? 3 : 5;

      const nextTrail: TrailPoint[] = [];

      for (let y = trailStartY; y < trailEndY; y += spacing) {
        const rowX = pathXAt(y, centerX, amp);
        for (let j = 0; j < starsPerRow; j++) {
          const perp = (Math.random() + Math.random() - 1) * bandWidth;
          const centerBias = 1 - Math.min(1, Math.abs(perp) / bandWidth);
          nextTrail.push({
            pageY: y + (Math.random() - 0.5) * 8,
            x: rowX + perp,
            r: 0.55 + Math.random() * 1.1 + centerBias * 0.55,
            phase: Math.random() * Math.PI * 2,
            speed: 0.5 + Math.random() * 0.6,
            base: (0.13 + Math.random() * 0.22) * (0.5 + centerBias * 0.7),
            color: palette[Math.floor(Math.random() * palette.length)],
          });
        }
      }

      trail = nextTrail;
    }

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);

      makeStars();
      makeTrail();
    }

    function drawFrame(ts: number, animated: boolean) {
      if (!canvas || !ctx) return;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      ctx.clearRect(0, 0, vw, vh);

      const t = ts * 0.001;
      const scrollY = window.scrollY;
      const isMobile = vw < 768;
      const isTablet = vw >= 768 && vw < 1024;

      const centerX = vw * 0.5;
      const amp = isMobile
        ? Math.min(75, vw * 0.2)
        : isTablet
        ? Math.min(150, vw * 0.25)
        : Math.min(240, vw * 0.28);

      const targetHeadPageY = Math.min(docHeight - 80, scrollY + vh * 0.55);
      if (animated) {
        smoothHeadPageY += (targetHeadPageY - smoothHeadPageY) * 0.15;
      } else {
        smoothHeadPageY = targetHeadPageY;
      }

      const headPageY = smoothHeadPageY;
      const headX = pathXAt(headPageY, centerX, amp);
      const headScreenY = headPageY - scrollY;

      // 1. Ambient Background Stars
      stars.forEach((s) => {
        if (animated) {
          s.y += s.drift;
          if (s.y < -4) s.y = vh + 4;
          if (s.y > vh + 4) s.y = -4;
        }
        const twinkle = animated ? 0.5 + 0.5 * Math.sin(t * s.speed + s.phase) : 0.7;
        const alpha = s.base * (0.35 + 0.65 * twinkle);
        const col = s.warm ? '200, 169, 97' : '230, 225, 211';
        ctx.beginPath();
        ctx.fillStyle = `rgba(${col},${alpha.toFixed(3)})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Wavy Stardust Particle Trail
      const margin = 140;
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i];
        const sy = p.pageY - scrollY;
        if (sy < -margin || sy > vh + margin) continue;

        const twinkle = animated ? 0.5 + 0.5 * Math.sin(t * p.speed + p.phase) : 0.7;
        const distToHead = Math.abs(p.pageY - headPageY);
        const glow = Math.max(0, 1 - distToHead / 175);
        const alpha = Math.min(1, p.base * (0.4 + 0.6 * twinkle) + glow * 0.65);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${alpha.toFixed(3)})`;
        if (glow > 0.2) {
          ctx.shadowColor = 'rgba(200, 169, 97, 0.85)';
          ctx.shadowBlur = (isMobile ? 5 : 7) * glow;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.arc(p.x, sy, p.r * (1 + glow * 0.65), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // 4. Glowing Cluster Head & Orbiting Swarm Stars
      if (headScreenY > -100 && headScreenY < vh + 100) {
        const glowRadius = isMobile ? 55 : 75;
        const grad = ctx.createRadialGradient(headX, headScreenY, 0, headX, headScreenY, glowRadius);
        grad.addColorStop(0, 'rgba(215, 185, 120, 0.35)');
        grad.addColorStop(0.5, 'rgba(200, 169, 97, 0.14)');
        grad.addColorStop(1, 'rgba(200, 169, 97, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(headX, headScreenY, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        swarm.forEach((sp) => {
          const ang = sp.angle + t * sp.speed;
          const sx = headX + Math.cos(ang) * sp.radius;
          const sy2 = headScreenY + Math.sin(ang) * sp.radius * 0.55;
          ctx.beginPath();
          ctx.fillStyle = 'rgba(245, 240, 225, 0.95)';
          ctx.shadowColor = 'rgba(200, 169, 97, 0.9)';
          ctx.shadowBlur = 6;
          ctx.arc(sx, sy2, sp.r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.shadowBlur = 0;
      }
    }

    resize();

    let resizeTimer: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    };
    window.addEventListener('resize', onResize);

    const onLoad = () => setTimeout(makeTrail, 300);
    window.addEventListener('load', onLoad);

    // Also observe document mutations or font loads to update docHeight
    if (document.fonts) {
      document.fonts.ready.then(() => setTimeout(makeTrail, 200));
    }

    const docObserver = new MutationObserver(() => {
      const newHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      if (Math.abs(newHeight - docHeight) > 100) {
        makeTrail();
      }
    });

    if (document.body) {
      docObserver.observe(document.body, { childList: true, subtree: true });
    }

    if (reduceMotion) {
      drawFrame(0, false);
      const onScroll = () => drawFrame(0, false);
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('load', onLoad);
        window.removeEventListener('scroll', onScroll);
        docObserver.disconnect();
      };
    }

    function tick(ts: number) {
      drawFrame(ts, true);
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onLoad);
      docObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full select-none"
      aria-hidden="true"
    />
  );
}
