import type { Metadata } from "next";
import CaidaFlow from "./CaidaFlow";

export const metadata: Metadata = {
  title: "Mini test: ¿tu caída es estacional o persistente?",
  description:
    "4 preguntas rápidas para orientarte sobre si tu caída de cabello parece estacional o persistente. No sustituye una valoración dermatológica.",
};

export default function MiniTestCaidaPage() {
  return (
    <>
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
            ¿Tu caída es estacional o persistente?
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            4 preguntas rápidas para orientarte sobre el patrón de tu caída de
            cabello y qué rutina puede acompañarte. Este mini test no
            diagnostica ni sustituye una valoración dermatológica.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <CaidaFlow />
      </section>
    </>
  );
}
