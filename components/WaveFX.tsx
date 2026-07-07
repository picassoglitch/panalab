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

  return null;
}
