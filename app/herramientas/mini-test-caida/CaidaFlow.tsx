"use client";

import Link from "next/link";
import { useState } from "react";
import { productsByUniverse } from "@/lib/data";
import { track } from "@/lib/analytics";
import Disclaimer from "@/components/Disclaimer";

interface Option {
  label: string;
  // 1 punto suma hacia un patrón persistente; 0 hacia estacional.
  persistentPoints: 0 | 1;
}

interface Question {
  question: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    question: "¿Hace cuánto tiempo notas la caída?",
    options: [
      { label: "Menos de 3 meses", persistentPoints: 0 },
      { label: "Más de 3 meses", persistentPoints: 1 },
    ],
  },
  {
    question: "¿La caída coincide con un cambio de estación (otoño, fin del verano)?",
    options: [
      { label: "Sí, empezó con el cambio de temporada", persistentPoints: 0 },
      { label: "No, no la relaciono con la temporada", persistentPoints: 1 },
    ],
  },
  {
    question: "¿Notas menos densidad o zonas despobladas en el cuero cabelludo?",
    options: [
      { label: "No, solo veo más cabello al lavarme o peinarme", persistentPoints: 0 },
      { label: "Sí, noto zonas con menos densidad", persistentPoints: 1 },
    ],
  },
  {
    question: "¿Hubo un evento reciente como estrés fuerte, parto o enfermedad?",
    options: [
      { label: "Sí, en los últimos meses", persistentPoints: 0 },
      { label: "No, nada fuera de lo habitual", persistentPoints: 1 },
    ],
  },
];

const RESULTS = {
  estacional: {
    key: "probablemente-estacional",
    title: "Probablemente estacional",
    text: "Tus respuestas sugieren un patrón que suele corresponder a una caída estacional o reactiva: reciente, ligada a la temporada o a un evento puntual como estrés, parto o enfermedad. Este tipo de caída tiende a estabilizarse sola en unas semanas, y una rutina de cuidado capilar puede acompañar esta etapa. Si la caída se prolonga más de 3 meses o notas cambios en la densidad, lo recomendable es acudir con un dermatólogo.",
  },
  persistente: {
    key: "patron-persistente",
    title: "Patrón persistente — valoración dermatológica recomendada",
    text: "Tus respuestas sugieren un patrón de caída más prolongado o con cambios en la densidad. Esto no es un diagnóstico, pero sí una buena razón para agendar una valoración con dermatólogo, que puede identificar la causa y definir el manejo adecuado. Mientras tanto, una rutina capilar completa puede acompañar el cuidado diario de tu cabello.",
  },
} as const;

export default function CaidaFlow() {
  const [step, setStep] = useState(0);
  const [points, setPoints] = useState(0);

  const done = step >= QUESTIONS.length;
  const result = done
    ? points >= 2
      ? RESULTS.persistente
      : RESULTS.estacional
    : null;

  function answer(persistentPoints: 0 | 1) {
    if (step === 0) track("test_start", { test: "caida" });
    const next = points + persistentPoints;
    setPoints(next);
    if (step === QUESTIONS.length - 1) {
      const r = next >= 2 ? RESULTS.persistente : RESULTS.estacional;
      track("test_complete", { test: "caida", result: r.key });
    }
    setStep(step + 1);
  }

  function restart() {
    setStep(0);
    setPoints(0);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center gap-2">
        {[...Array(QUESTIONS.length + 1).keys()].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-brand" : "bg-sand"}`}
          />
        ))}
      </div>

      {!done && (
        <div>
          {step > 0 && (
            <button onClick={restart} className="text-sm text-ink-soft hover:text-brand">
              ← Empezar de nuevo
            </button>
          )}
          <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-brand">
            Pregunta {step + 1} de {QUESTIONS.length}
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
            {QUESTIONS[step].question}
          </h2>
          <div className="mt-6 grid gap-3">
            {QUESTIONS[step].options.map((o) => (
              <button
                key={o.label}
                onClick={() => answer(o.persistentPoints)}
                className="w-full rounded-card border border-sand bg-white p-5 text-left font-medium transition-colors hover:border-brand"
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {done && result && (
        <div>
          <button onClick={restart} className="text-sm text-ink-soft hover:text-brand">
            ← Empezar de nuevo
          </button>
          <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
            {result.title}
          </h2>
          <p className="mt-4 rounded-card bg-brand-light p-5 leading-relaxed text-ink">
            {result.text}
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold">
            Rutina capilar Panalab que puede acompañarte
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {productsByUniverse("cabello").slice(0, 4).map((p) => (
              <Link
                key={p.slug}
                href={`/productos/${p.slug}`}
                className="rounded-card border border-sand bg-white p-5 transition-shadow hover:shadow-md"
              >
                <p className="font-display font-semibold">{p.name}</p>
                <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{p.benefit}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/asesor-virtual"
              className="rounded-full bg-brand px-6 py-3 text-center text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-brand-dark"
            >
              Ir al asesor virtual
            </Link>
            <Link
              href="/donde-comprar"
              className="rounded-full border border-brand px-6 py-3 text-center text-sm font-bold uppercase tracking-wider text-brand transition-colors hover:bg-brand-light"
            >
              Dónde comprar
            </Link>
          </div>

          <div className="mt-8">
            <Disclaimer text="Este mini test es orientativo y no diagnostica la causa de la caída. Si la caída persiste o te preocupa, consulte a su médico o dermatólogo." />
          </div>
        </div>
      )}
    </div>
  );
}
