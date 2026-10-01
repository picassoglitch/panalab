import type { Metadata } from "next";
import Link from "next/link";
import FinderClient from "./FinderClient";
import { DERMA_FINDER_MODE } from "@/lib/features";

const off = DERMA_FINDER_MODE === "off";

// La pagina nunca se indexa: apagada no tiene contenido util, y en modo demo
// los especialistas son ficticios.
export const metadata: Metadata = {
  alternates: { canonical: "/derma-finder/" },
  title: "Derma Finder",
  description: off
    ? "El directorio de especialistas aliados de Panalab México estará disponible próximamente."
    : "Directorio de demostración de especialistas aliados. Los perfiles son ficticios.",
  robots: { index: false, follow: false },
};

export default function DermaFinderPage() {
  if (off) {
    return (
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
            Próximamente
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
            Derma Finder
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Estamos construyendo el directorio de dermatólogos, pediatras y
            clínicas aliadas de Panalab México. Lo abriremos en cuanto cada
            especialista haya confirmado su participación.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
            Mientras tanto, el Asesor Virtual puede orientarte con una rutina
            inicial. No sustituye una valoración médica.
          </p>
          <Link
            href="/asesor-virtual"
            className="mt-8 inline-block rounded-full bg-brand px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-brand-dark"
          >
            Ir al Asesor Virtual
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
            Derma Finder
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Encuentra dermatólogos, pediatras y clínicas aliadas cerca de ti.
            Busca por código postal o ciudad, filtra según tu necesidad y da el
            siguiente paso con un especialista.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <FinderClient />
      </section>
    </>
  );
}
