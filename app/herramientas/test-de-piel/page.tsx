import type { Metadata } from "next";
import TestFlow from "./TestFlow";

export const metadata: Metadata = {
  title: "Test de tipo de piel",
  description:
    "Responde 5 preguntas rápidas y descubre si tu piel tiende a ser seca, mixta, grasa o sensible. Orientación con productos Panalab; no sustituye una valoración médica.",
};

export default function TestDePielPage() {
  return (
    <>
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
            Test de tipo de piel
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            5 preguntas rápidas para conocer la tendencia de tu piel y recibir
            una orientación de cuidado con productos Panalab. Esta herramienta
            no diagnostica ni sustituye una valoración médica.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <TestFlow />
      </section>
    </>
  );
}
