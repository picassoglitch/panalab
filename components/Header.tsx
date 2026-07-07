"use client";

import Link from "next/link";
import { useState } from "react";
import { UNIVERSES } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur">
      <div className="bg-brand-dark px-4 py-2 text-center text-xs font-medium tracking-wide text-white">
        Prueba el nuevo Asesor Virtual Panalab —{" "}
        <Link href="/asesor-virtual" className="underline underline-offset-2">
          empezar ahora
        </Link>
      </div>
      <div className="border-b border-sand">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-baseline gap-1" onClick={() => setOpen(false)}>
            <span className="font-display text-2xl font-extrabold tracking-tight text-brand">
              Panalab
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
              México
            </span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            {UNIVERSES.map((u) => (
              <Link
                key={u.slug}
                href={`/universos/${u.slug}`}
                className="text-sm text-ink transition-colors hover:text-brand"
              >
                {u.nav}
              </Link>
            ))}
            <Link
              href="/herramientas"
              className="text-sm text-ink transition-colors hover:text-brand"
            >
              Herramientas
            </Link>
            <Link
              href="/historias"
              className="text-sm text-ink transition-colors hover:text-brand"
            >
              Historias
            </Link>
            <Link
              href="/donde-comprar"
              className="rounded-full bg-brand px-5 py-2 text-xs font-bold tracking-wider text-white transition-colors hover:bg-brand-dark"
            >
              DÓNDE COMPRAR
            </Link>
          </nav>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-ink lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-b border-sand bg-white px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col">
            {UNIVERSES.map((u) => (
              <Link
                key={u.slug}
                href={`/universos/${u.slug}`}
                className="border-b border-sand py-3 text-ink"
                onClick={() => setOpen(false)}
              >
                {u.nav}
              </Link>
            ))}
            <Link
              href="/herramientas"
              className="border-b border-sand py-3 text-ink"
              onClick={() => setOpen(false)}
            >
              Herramientas
            </Link>
            <Link
              href="/historias"
              className="border-b border-sand py-3 text-ink"
              onClick={() => setOpen(false)}
            >
              Historias
            </Link>
            <Link
              href="/profesionales"
              className="border-b border-sand py-3 text-ink"
              onClick={() => setOpen(false)}
            >
              Profesionales de la salud
            </Link>
            <Link
              href="/asesor-virtual"
              className="mt-4 rounded-full border-2 border-brand px-4 py-3 text-center text-sm font-bold tracking-wider text-brand"
              onClick={() => setOpen(false)}
            >
              ASESOR VIRTUAL
            </Link>
            <Link
              href="/donde-comprar"
              className="mt-3 rounded-full bg-brand px-4 py-3 text-center text-sm font-bold tracking-wider text-white"
              onClick={() => setOpen(false)}
            >
              DÓNDE COMPRAR
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
