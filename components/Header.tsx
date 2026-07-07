"use client";

import Link from "next/link";
import { useState } from "react";
import { UNIVERSES } from "@/lib/data";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-1" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl font-semibold tracking-tight text-brand">
            Panalab
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-ink-soft">
            México
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {UNIVERSES.map((u) => (
            <Link
              key={u.slug}
              href={`/universos/${u.slug}`}
              className="text-sm text-ink-soft transition-colors hover:text-brand"
            >
              {u.nav}
            </Link>
          ))}
          <Link
            href="/herramientas"
            className="text-sm text-ink-soft transition-colors hover:text-brand"
          >
            Herramientas
          </Link>
          <Link
            href="/donde-comprar"
            className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
          >
            Dónde comprar
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

      {open && (
        <div className="border-t border-sand bg-cream px-4 pb-6 pt-2 lg:hidden">
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
              href="/donde-comprar"
              className="mt-4 rounded-full bg-brand px-4 py-3 text-center font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Dónde comprar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
