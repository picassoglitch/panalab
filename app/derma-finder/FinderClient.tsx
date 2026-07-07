"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ESPECIALISTAS,
  FOCOS_LABELS,
  type Especialista,
  type Foco,
} from "@/lib/dermatologos";
import { track } from "@/lib/analytics";
import Disclaimer from "@/components/Disclaimer";

const FOCOS: Foco[] = ["acne", "capilar", "atopia", "pediatria"];

function matchesQuery(e: Especialista, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    e.cp.startsWith(q) ||
    e.ciudad.toLowerCase().includes(q) ||
    e.estado.toLowerCase().includes(q)
  );
}

function contactHref(e: Especialista): string {
  const subject = encodeURIComponent(
    `Contacto Derma Finder: ${e.nombre} (${e.ciudad})`
  );
  return `mailto:hola@panalab.mx?subject=${subject}`;
}

export default function FinderClient() {
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [focos, setFocos] = useState<Foco[]>([]);

  const resultados = useMemo(
    () =>
      ESPECIALISTAS.filter(
        (e) =>
          matchesQuery(e, query) &&
          (focos.length === 0 || focos.some((f) => e.focos.includes(f)))
      ),
    [query, focos]
  );

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    setQuery(input);
    track("derma_finder_search", { query: input, focos: focos.join(",") });
  }

  function toggleFoco(foco: Foco) {
    const next = focos.includes(foco)
      ? focos.filter((f) => f !== foco)
      : [...focos, foco];
    setFocos(next);
    track("derma_finder_search", { query, focos: next.join(",") });
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <label htmlFor="derma-finder-query" className="sr-only">
          Código postal o ciudad
        </label>
        <input
          id="derma-finder-query"
          type="text"
          value={input}
          onChange={(ev) => setInput(ev.target.value)}
          placeholder="Código postal o ciudad (ej. 06700, Guadalajara)"
          className="w-full rounded-full border border-sand bg-white px-5 py-3 text-base text-ink outline-none placeholder:text-ink-soft/60 focus:border-brand sm:flex-1"
        />
        <button
          type="submit"
          className="rounded-full bg-brand px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-brand-dark"
        >
          Buscar
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {FOCOS.map((foco) => {
          const active = focos.includes(foco);
          return (
            <button
              key={foco}
              type="button"
              onClick={() => toggleFoco(foco)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                active
                  ? "border-brand bg-brand text-white"
                  : "border-sand bg-white text-ink-soft hover:border-brand hover:text-brand"
              }`}
            >
              {FOCOS_LABELS[foco]}
            </button>
          );
        })}
      </div>

      {resultados.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resultados.map((e) => (
            <article
              key={e.id}
              className="flex flex-col rounded-card border border-sand bg-white p-5"
            >
              <h2 className="font-display text-lg font-semibold text-ink">
                {e.nombre}
              </h2>
              <p className="mt-1 text-sm text-ink-soft">{e.especialidad}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {e.focos.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-brand-light px-2.5 py-0.5 text-xs font-semibold text-brand"
                  >
                    {FOCOS_LABELS[f]}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                {e.colonia}, {e.ciudad}
                <br />
                CP {e.cp}
              </p>
              <a
                href={contactHref(e)}
                className="mt-5 inline-block self-start rounded-full bg-brand px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-brand-dark"
              >
                Contactar
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-card border border-sand bg-white px-6 py-12 text-center">
          <p className="font-display text-xl font-semibold text-ink">
            No encontramos especialistas en tu zona todavía
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
            Nuestro directorio de aliados está creciendo. Mientras tanto, el
            Asesor Virtual puede orientarte con una rutina inicial.
          </p>
          <Link
            href="/asesor-virtual"
            className="mt-6 inline-block rounded-full bg-brand px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-brand-dark"
          >
            Ir al Asesor Virtual
          </Link>
        </div>
      )}

      <div className="rounded-card border border-sand bg-cream px-5 py-4 text-sm leading-relaxed text-ink-soft">
        Este directorio muestra especialistas y clínicas aliadas de
        demostración. Los datos se reemplazarán por la base de aliados real de
        Panalab una vez que esté disponible.
      </div>

      <Disclaimer />
    </div>
  );
}
