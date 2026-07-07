"use client";

import { useEffect, useRef } from "react";

// Superficie de agua vista desde arriba: simulación de la ecuación de onda 2D
// en una malla gruesa, renderizada como luces y sombras suaves sobre la página.
// Cada click y movimiento del cursor deja ondas que se expanden y se calman.
export default function WaterSurface() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLS = 160;
    // Amortiguación alta: una sola onda limpia que se expande y muere pronto
    const DAMP = 0.94;
    let rows = 100;
    let w = 0;
    let h = 0;
    let curr = new Float32Array(0);
    let prev = new Float32Array(0);
    let off: HTMLCanvasElement | null = null;
    let offCtx: CanvasRenderingContext2D | null = null;
    let img: ImageData | null = null;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      rows = Math.max(70, Math.round((COLS * h) / w));
      curr = new Float32Array(COLS * rows);
      prev = new Float32Array(COLS * rows);
      off = document.createElement("canvas");
      off.width = COLS;
      off.height = rows;
      offCtx = off.getContext("2d");
      img = offCtx ? offCtx.createImageData(COLS, rows) : null;
    };
    resize();
    window.addEventListener("resize", resize);

    const drop = (px: number, py: number, strength: number, radius: number) => {
      const cx = (px / w) * COLS;
      const cy = (py / h) * rows;
      const r = Math.ceil(radius);
      for (let y = -r; y <= r; y++) {
        for (let x = -r; x <= r; x++) {
          const d = Math.hypot(x, y);
          if (d > radius) continue;
          const ix = Math.round(cx + x);
          const iy = Math.round(cy + y);
          if (ix < 1 || iy < 1 || ix >= COLS - 1 || iy >= rows - 1) continue;
          curr[iy * COLS + ix] += Math.cos((d / radius) * (Math.PI / 2)) * strength;
        }
      }
    };

    const onDown = (e: PointerEvent) => drop(e.clientX, e.clientY, 2.2, 3);
    window.addEventListener("pointerdown", onDown, { passive: true });

    let raf = 0;
    const step = () => {
      for (let y = 1; y < rows - 1; y++) {
        const row = y * COLS;
        for (let x = 1; x < COLS - 1; x++) {
          const i = row + x;
          prev[i] =
            ((curr[i - 1] + curr[i + 1] + curr[i - COLS] + curr[i + COLS]) / 2 -
              prev[i]) *
            DAMP;
        }
      }
      const tmp = curr;
      curr = prev;
      prev = tmp;

      if (img && offCtx && off) {
        const data = img.data;
        for (let y = 1; y < rows - 1; y++) {
          for (let x = 1; x < COLS - 1; x++) {
            const i = y * COLS + x;
            const gx = curr[i + 1] - curr[i - 1];
            const gy = curr[i + COLS] - curr[i - COLS];
            const light = (gx + gy) * 190;
            const p = i * 4;
            if (light > 0) {
              data[p] = 255;
              data[p + 1] = 255;
              data[p + 2] = 255;
              data[p + 3] = Math.min(light, 92);
            } else {
              data[p] = 10;
              data[p + 1] = 79;
              data[p + 2] = 74;
              data[p + 3] = Math.min(-light * 0.75, 68);
            }
          }
        }
        offCtx.putImageData(img, 0, 0);
        ctx.clearRect(0, 0, w, h);
        ctx.imageSmoothingEnabled = true;
        ctx.drawImage(off, 0, 0, w, h);
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(step);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[70]"
      aria-hidden="true"
    />
  );
}
