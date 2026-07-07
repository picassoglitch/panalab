import type { Metadata } from "next";
import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Herramientas",
  description:
    "Asesor Virtual, test de tipo de piel, calculadora de rutina y Derma Finder: herramientas Panalab para orientarte.",
};

const TOOLS = [
  {
    title: "Asesor Virtual Panalab",
    desc: "Un flujo guiado que te hace preguntas sobre tu piel o cabello y te sugiere una rutina orientativa con productos Panalab. Nunca diagnostica: te orienta y te acerca a tu médico cuando hace falta.",
    phase: "Fase 2",
  },
  {
    title: "Test de tipo de piel",
    desc: "Preguntas cortas para saber si tu piel es seca, mixta, grasa o sensible, con un resultado simple y accionable.",
    phase: "Fase 2",
  },
  {
    title: "Calculadora de rutina",
    desc: "Te ayuda a ordenar tus productos en el orden correcto, mañana y noche, según tu necesidad principal.",
    phase: "Fase 2",
  },
  {
    title: "Derma Finder",
    desc: "Encuentra dermatólogos y clínicas aliadas cerca de ti, con filtros por problema: acné, capilar, atopia o pediatría.",
    phase: "Fase 3",
  },
];

export default function HerramientasPage() {
  return (
    <>
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">
            Herramientas
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Estamos construyendo herramientas para orientarte mejor. Muy pronto
            podrás usarlas aquí.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {TOOLS.map((t) => (
            <div key={t.title} className="rounded-2xl border border-sand bg-white p-6">
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-dark">
                Próximamente · {t.phase}
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold">{t.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Disclaimer text="Estas herramientas orientan y ordenan información; no diagnostican ni sustituyen una valoración médica. Consulte a su médico." />
        </div>

        <div className="mt-10">
          <p className="text-ink-soft">
            Mientras tanto, explora los universos Panalab:
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-full bg-brand px-6 py-3 font-medium text-white transition-colors hover:bg-brand-dark"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </>
  );
}
