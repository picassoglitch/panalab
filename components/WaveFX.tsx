"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function WaveFX() {
  const pathname = usePathname();

  // Reveal de secciones al hacer scroll
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sections = document.querySelectorAll<HTMLElement>("main section");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            observer.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 }
    );

    for (const s of sections) {
      if (s.getBoundingClientRect().top > window.innerHeight * 0.9) {
        s.classList.add("reveal");
        observer.observe(s);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  // Ondas concéntricas al tocar, como una gota sobre el agua
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const ripple = document.createElement("div");
      ripple.className = "water-touch";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      // anillo sobre fondos oscuros vs claros
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const dark = el?.closest(
        ".bg-brand, .bg-brand-dark, .bg-ink, [class*='from-brand'], [class*='from-accent'], footer"
      );
      if (dark) ripple.classList.add("water-touch-light");
      for (let i = 0; i < 3; i++) ripple.appendChild(document.createElement("span"));
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1300);
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return null;
}
