import type { Metadata } from "next";
import AtopiaFlow from "./AtopiaFlow";

export const metadata: Metadata = {
  title: "Mini test: ¿tu piel podría ser atópica?",
  description:
    "5 preguntas de sí o no para identificar señales asociadas a la piel atópica. Orientación con productos Panalab; solo un médico puede confirmar el diagnóstico.",
};

export default function MiniTestAtopiaPage() {
  return (
    <>
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
            ¿Tu piel podría ser atópica?
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            5 preguntas de sí o no para identificar señales que suelen
            asociarse a la piel atópica, en ti o en tus hijos. Este mini test
            no diagnostica: solo un médico puede confirmar si una piel es
            atópica.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <AtopiaFlow />
      </section>
    </>
  );
}
