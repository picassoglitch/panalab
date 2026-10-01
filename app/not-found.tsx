import type { Metadata } from "next";
import Link from "next/link";

// Sin esta pagina, Next sirve su 404 por defecto en ingles ("404: This page
// could not be found.") y el HTML sale con dos <title>: el del layout y el
// suyo. Definir metadata.title aqui deja uno solo.
export const metadata: Metadata = {
  title: "Página no encontrada",
  description:
    "La página que buscas no existe o cambió de dirección. Vuelve al inicio o encuentra dónde comprar Panalab.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28">
      <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
        Error 404
      </p>
      <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
        Página no encontrada
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
        La página que buscas no existe o cambió de dirección. Puedes volver al
        inicio o ver dónde conseguir los productos Panalab.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-brand px-7 py-3 text-center text-sm font-bold uppercase tracking-wider text-white transition hover:bg-brand-dark"
        >
          Ir al inicio
        </Link>
        <Link
          href="/donde-comprar/"
          className="rounded-full border-2 border-brand px-7 py-3 text-center text-sm font-bold uppercase tracking-wider text-brand transition hover:bg-brand-light"
        >
          Dónde comprar
        </Link>
      </div>
    </section>
  );
}
