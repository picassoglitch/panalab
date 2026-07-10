"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import OceanWaves from "@/components/OceanWaves";
import { HERO_SLIDES } from "@/lib/data";

export default function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (HERO_SLIDES.length < 2) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % HERO_SLIDES.length),
      6000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-brand-dark text-white">
      <div className="relative min-h-[60vh] w-full sm:min-h-[72vh]">
        {HERO_SLIDES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="hero-scrim pointer-events-none absolute inset-x-0 bottom-0 h-56" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 pb-16 sm:flex-row sm:px-6 sm:pb-20">
            <Link
              href="/asesor-virtual"
              className="wave-btn wave-btn-brand rounded-full bg-white px-7 py-3 text-center text-sm font-bold tracking-wider text-brand"
            >
              PROBAR EL ASESOR VIRTUAL
            </Link>
            <Link
              href="/donde-comprar"
              className="wave-btn wave-btn-white rounded-full border-2 border-white px-7 py-3 text-center text-sm font-bold tracking-wider text-white"
            >
              DÓNDE COMPRAR
            </Link>
          </div>
        </div>

        {HERO_SLIDES.length > 1 && (
          <div className="absolute bottom-6 right-6 z-10 flex gap-2">
            {HERO_SLIDES.map((s, i) => (
              <button
                key={s.src}
                onClick={() => setActive(i)}
                aria-label={`Ir al banner ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === active ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      {/* Franja donde vive la ola, para no tapar la imagen de campaña */}
      <div aria-hidden className="h-16 sm:h-24" />
      <OceanWaves />
    </section>
  );
}
