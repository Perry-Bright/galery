import { useEffect, useRef } from 'react';

interface ConfettiCanvasProps {
  burstKey: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rotation: number;
  vr: number;
  color: string;
  alpha: number;
}

const LUXURY_PALETTE = [
  '#9A7B3E', // Burnished brass
  '#C9A961', // Champagne gold
  '#F5F1E8', // Vellum ivory
  '#1B3B2B', // Heritage forest
  '#D6CDBA', // Warm limestone
];

export function ConfettiCanvas({ burstKey }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (burstKey <= 0) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * (canvas.height * 0.35),
      vx: (Math.random() - 0.5) * 4.2,
      vy: 2.2 + Math.random() * 4.4,
      w: 6 + Math.random() * 7,
      h: 4 + Math.random() * 5,
      rotation: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.14,
      color:
        LUXURY_PALETTE[Math.floor(Math.random() * LUXURY_PALETTE.length)],
      alpha: 0.95,
    }));

    let rafId = 0;
    const startTime = performance.now();
    const durationMs = 4600;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const fadeProgress = Math.max(0, (elapsed - 2800) / (durationMs - 2800));

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.045;
        p.vx *= 0.992;
        p.rotation += p.vr;
        p.alpha = Math.max(0, 0.95 * (1 - fadeProgress));

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (elapsed < durationMs) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, [burstKey]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40"
    />
  );
}
