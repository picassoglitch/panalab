import type { Metadata } from "next";
import AdvisorFlow from "./AdvisorFlow";

export const metadata: Metadata = {
  title: "Asesor Virtual",
  description:
    "Responde unas preguntas y recibe una orientación con rutinas y productos Panalab. No sustituye una valoración médica.",
};

export default function AsesorVirtualPage() {
  return (
    <>
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">
            Asesor Virtual Panalab
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Unas preguntas rápidas para orientarte y sugerirte una rutina con
            productos Panalab. Esta herramienta no sustituye una valoración
            médica.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <AdvisorFlow />
      </section>
    </>
  );
}
