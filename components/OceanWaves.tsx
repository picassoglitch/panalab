"use client";

import { useEffect, useRef } from "react";

interface Layer {
  amp: number;
  speed: number;
  freq: number;
  alpha: number;
  base: number;
}

const LAYERS: Layer[] = [
  { amp: 0.32, speed: 0.35, freq: 1.6, alpha: 0.22, base: 0.5 },
  { amp: 0.38, speed: -0.55, freq: 2.2, alpha: 0.38, base: 0.62 },
  { amp: 0.42, speed: 0.8, freq: 2.8, alpha: 1, base: 0.74 },
];

export default function OceanWaves({ color = "255,255,255" }: { color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (time: number) => {
      const t = time / 1000;
      ctx.clearRect(0, 0, w, h);
      for (const l of LAYERS) {
        ctx.beginPath();
        ctx.moveTo(0, h);
        const ampPx = l.amp * h * 0.4;
        for (let x = 0; x <= w; x += 6) {
          const p = (x / w) * Math.PI * 2 * l.freq;
          const y =
            h * l.base +
            ampPx * Math.sin(p + t * l.speed * 2) +
            ampPx * 0.5 * Math.sin(p * 1.9 - t * l.speed * 2.6) +
            ampPx * 0.25 * Math.sin(p * 3.7 + t * l.speed * 1.3);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fillStyle = `rgba(${color},${l.alpha})`;
        ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [color]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[clamp(70px,11vw,150px)] w-full"
      aria-hidden="true"
    />
  );
}
