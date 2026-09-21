'use client';

import { useEffect, useRef, useState } from 'react';

interface ParticleNameProps {
  text?: string;
  className?: string;
  align?: 'left' | 'center';
}

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  color: string;
  opacity: number;
  settled: boolean;
}

export default function ParticleName({ text = 'KHILENDER RAJPUT', className = '', align = 'left' }: ParticleNameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;

    const init = () => {
      // 5% larger scale from current baseline
      const rawWidth = container.clientWidth || container.parentElement?.clientWidth || window.innerWidth * 0.60;
      width = Math.max(545, Math.min(2400, Math.floor(rawWidth * 1.55)));
      height = Math.max(290, Math.min(670, Math.floor(width * 0.37)));

      canvas.width = width;
      canvas.height = height;

      // Offscreen canvas for pixel sampling (created once per init/resize)
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      // 5% larger font size calculation
      let fontSize = Math.floor(width / (text.length * 0.135));
      fontSize = Math.max(95, Math.min(325, fontSize));

      const fontStack = `800 ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`;
      offCtx.font = fontStack;
      offCtx.fillStyle = '#ffffff';
      offCtx.textAlign = align === 'left' ? 'left' : 'center';
      offCtx.textBaseline = 'middle';

      // Fine-tune font size if text width exceeds container bounds
      let metrics = offCtx.measureText(text);
      if (metrics.width > 0 && metrics.width > width * 0.99) {
        fontSize = Math.floor(fontSize * ((width * 0.98) / metrics.width));
        offCtx.font = `800 ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif`;
      }

      const centerY = height * 0.36;
      // Fixed left anchor point at x = 2
      const textX = align === 'left' ? 2 : width / 2;

      // Render text anchored on offscreen canvas
      offCtx.fillText(text, textX, centerY);

      // Single getImageData call
      const imageData = offCtx.getImageData(0, 0, width, height);
      const data = imageData.data;
      particles = [];

      // Fine candidate pixel sampling step (2.2px)
      const sampleStep = 2.2;
      const rawCandidates: { x: number; y: number }[] = [];

      for (let y = 0; y < height; y += sampleStep) {
        for (let x = 0; x < width; x += sampleStep) {
          const index = (Math.floor(y) * width + Math.floor(x)) * 4;
          const alpha = data[index + 3];

          // Sample core letter pixels (alpha > 130) to eliminate crowded blurry edge artifacts
          if (alpha > 130) {
            rawCandidates.push({ x, y });
          }
        }
      }

      // Downsampling cap scaled proportionally to maintain exact same dot spacing & density
      const maxParticles = Math.floor(width * (width < 640 ? 1.95 : 2.25));
      let selectedPoints = rawCandidates;

      if (rawCandidates.length > maxParticles) {
        selectedPoints = [];
        const downsampleRatio = rawCandidates.length / maxParticles;
        for (let i = 0; i < maxParticles; i++) {
          selectedPoints.push(rawCandidates[Math.floor(i * downsampleRatio)]);
        }
      }

      // Cohesive palette matching Mudita Shukla reference (white -> soft warm off-white -> subtle champagne/gold-yellow)
      const baseColors = ['#FFFFFF', '#F7F4EB', '#EFEAD8', '#E5DCBE', '#DBCFA4'];

      for (let i = 0; i < selectedPoints.length; i++) {
        const pt = selectedPoints[i];
        const targetX = pt.x;
        const targetY = pt.y;

        // PRESERVED UNCHANGED SCATTERING LOGIC
        const startX = targetX + (Math.random() - 0.5) * Math.max(width * 0.85, 450);
        const startY = targetY + (Math.random() - 0.5) * Math.max(height * 2.2, 280);

        // Smooth spatial color distribution so neighboring dots blend cohesively like the reference text
        const spatialValue = (Math.sin(targetX * 0.025) + Math.cos(targetY * 0.025) + Math.sin((targetX + targetY) * 0.015) + 3) / 6;
        const colorIndex = Math.min(baseColors.length - 1, Math.max(0, Math.floor(spatialValue * baseColors.length)));
        const color = baseColors[colorIndex];

        particles.push({
          x: startX,
          y: startY,
          targetX,
          targetY,
          radius: Math.random() * 0.25 + 1.35,
          color,
          opacity: Math.random() * 0.2 + 0.8,
          settled: false,
        });
      }
    };

    // Run setup immediately
    init();

    // Secondary init call to handle container layout stabilization
    const timer = setTimeout(init, 120);

    // PRESERVED UNCHANGED ANIMATION LOOP (SCATTERED -> MOVE -> ASSEMBLE -> STAY)
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!p.settled) {
          const dx = p.targetX - p.x;
          const dy = p.targetY - p.y;

          // PRESERVED EASING & TIMING
          p.x += dx * 0.045;
          p.y += dy * 0.045;

          if (Math.abs(dx) < 0.3 && Math.abs(dy) < 0.3) {
            p.x = p.targetX;
            p.y = p.targetY;
            p.settled = true;
          }
        }

        // Draw crisp circular dot particle with cohesive blended color
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Debounced window resize listener
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        init();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [text, isMounted, align]);

  if (!isMounted) {
    return <div className={`w-full overflow-hidden mb-2 min-h-[170px] sm:min-h-[256px] md:min-h-[330px] lg:min-h-[404px] ${className}`} />;
  }

  return (
    <div ref={containerRef} className={`w-full overflow-hidden mb-2 min-h-[170px] sm:min-h-[256px] md:min-h-[330px] lg:min-h-[404px] ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-auto pointer-events-none" />
      <span className="sr-only">{text}</span>
    </div>
  );
}
