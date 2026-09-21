'use client';

import { useEffect, useRef, useState } from 'react';

interface WhiteDotTextCanvasProps {
  text: string;
  className?: string;
}

interface WhiteParticle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  ease: number;
  friction: number;
}

export default function WhiteDotTextCanvas({ text, className = '' }: WhiteDotTextCanvasProps) {
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
    let particles: WhiteParticle[] = [];
    let width = 0;
    let height = 0;

    const init = () => {
      const rect = container.getBoundingClientRect();
      const parentWidth = container.parentElement?.clientWidth || window.innerWidth * 0.55;
      width = canvas.width = rect.width && rect.width > 200 ? rect.width : Math.min(680, parentWidth);
      height = canvas.height = Math.max(90, Math.min(140, width * 0.22));

      // Offscreen canvas for pixel sampling
      const offscreen = document.createElement('canvas');
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      // Use standard system bold font to guarantee instant, reliable text sampling
      let fontSize = Math.min(62, Math.max(26, Math.floor(width / (text.length * 0.58))));
      offCtx.font = `900 ${fontSize}px sans-serif, Arial, system-ui`;
      offCtx.fillStyle = '#ffffff';
      offCtx.textAlign = 'left';
      offCtx.textBaseline = 'middle';

      let textMetrics = offCtx.measureText(text);
      if (textMetrics.width > width * 0.98) {
        fontSize = Math.floor(fontSize * ((width * 0.94) / textMetrics.width));
        offCtx.font = `900 ${fontSize}px sans-serif, Arial, system-ui`;
      }

      offCtx.fillText(text, 0, height / 2);

      const imageData = offCtx.getImageData(0, 0, width, height);
      const data = imageData.data;
      particles = [];

      // Grid sampling gap for clear, separated dots
      const gap = width < 480 ? 3.2 : 3.8;
      const colors = ['#FFFFFF', '#E8E8E8', '#DCDCDC'];

      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          const index = (Math.floor(y) * width + Math.floor(x)) * 4;
          const alpha = data[index + 3];

          if (alpha > 80) {
            // Scattered start coordinates
            const angle = Math.random() * Math.PI * 2;
            const dist = 40 + Math.random() * Math.max(width, height) * 0.5;
            const startX = x + Math.cos(angle) * dist;
            const startY = y + Math.sin(angle) * dist;

            const color = colors[Math.floor(Math.random() * colors.length)];

            particles.push({
              x: startX,
              y: startY,
              targetX: x,
              targetY: y,
              vx: 0,
              vy: 0,
              radius: Math.random() * 0.5 + 1.25,
              color,
              alpha: Math.random() * 0.25 + 0.75,
              ease: 0.08 + Math.random() * 0.04,
              friction: 0.82 + Math.random() * 0.04,
            });
          }
        }
      }
    };

    init();
    // Delayed init to handle container layout stabilization
    const timer = setTimeout(init, 150);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move to target coordinates
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;

        p.vx = p.vx * p.friction + dx * p.ease;
        p.vy = p.vy * p.friction + dy * p.ease;

        p.x += p.vx;
        p.y += p.vy;

        // Draw crisp white particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 2;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [text, isMounted]);

  if (!isMounted) {
    return <div className={`w-full overflow-hidden mb-3 min-h-[90px] sm:min-h-[120px] ${className}`} />;
  }

  return (
    <div ref={containerRef} className={`w-full overflow-hidden mb-3 min-h-[90px] sm:min-h-[120px] ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-auto pointer-events-none" />
      <span className="sr-only">{text}</span>
    </div>
  );
}
