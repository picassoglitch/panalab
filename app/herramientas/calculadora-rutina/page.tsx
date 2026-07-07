import type { Metadata } from "next";
import RutinaFlow from "./RutinaFlow";

export const metadata: Metadata = {
  title: "Calculadora de rutina",
  description:
    "Ordena tus productos en una rutina de mañana y noche según tu piel o tu cabello. Herramienta orientativa Panalab; no sustituye una valoración médica.",
};

export default function CalculadoraRutinaPage() {
  return (
    <>
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
            Calculadora de rutina
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            ¿En qué orden va cada producto? Responde dos preguntas y te
            mostramos tu rutina paso a paso, organizada en mañana y noche, con
            los productos Panalab que pueden acompañarte. Esta herramienta no
            sustituye una valoración médica.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <RutinaFlow />
      </section>
    </>
  );
}
