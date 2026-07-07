"use client";

import Link from "next/link";
import { useState } from "react";
import { productsByUniverse } from "@/lib/data";
import { track } from "@/lib/analytics";
import Disclaimer from "@/components/Disclaimer";

const QUESTIONS: string[] = [
  "¿La piel presenta resequedad persistente, aunque uses cremas de vez en cuando?",
  "¿Hay comezón frecuente, sobre todo por la noche o después del baño?",
  "¿Aparecen brotes o zonas irritadas en pliegues como codos, rodillas o cuello?",
  "¿Hay antecedentes familiares de piel atópica, asma o rinitis alérgica?",
  "¿Las molestias empeoran con los cambios de clima o en épocas de estrés?",
];

interface ResultBucket {
  title: string;
  text: string;
}

function bucketFor(yesCount: number): ResultBucket {
  if (yesCount <= 1) {
    return {
      title: "Pocas señales asociadas a piel atópica",
      text: "Tus respuestas muestran pocas de las señales que suelen asociarse a la piel atópica. Aun así, si hay resequedad o comezón que te preocupa, mantener una rutina de limpieza suave e hidratación constante es un buen hábito, y cualquier duda puede resolverla tu médico.",
    };
  }
  if (yesCount <= 3) {
    return {
      title: "Algunas señales — vale la pena observar",
      text: "Tus respuestas muestran algunas señales que a veces se asocian a la piel atópica. No significa que lo sea: muchas pieles secas o sensibles comparten estas molestias. Vale la pena observar cómo evoluciona, mantener hidratación diaria con emolientes suaves y, si las molestias persisten o aumentan, comentarlo con un médico.",
    };
  }
  return {
    title: "Varias señales — te recomendamos valoración médica",
    text: "Tus respuestas reúnen varias de las señales que suelen asociarse a la piel atópica. Esto no es un diagnóstico: solo un dermatólogo o pediatra puede confirmarlo y definir el manejo adecuado. Te recomendamos agendar una valoración médica; mientras tanto, la limpieza suave y la hidratación constante ayudan a cuidar la barrera de la piel.",
  };
}

function resultKey(yesCount: number): string {
  if (yesCount <= 1) return "pocas-senales";
  if (yesCount <= 3) return "algunas-senales";
  return "varias-senales";
}

export default function AtopiaFlow() {
  const [step, setStep] = useState(0);
  const [yesCount, setYesCount] = useState(0);

  const done = step >= QUESTIONS.length;
  const bucket = done ? bucketFor(yesCount) : null;

  function answer(yes: boolean) {
    if (step === 0) track("test_start", { test: "atopia" });
    const nextYes = yesCount + (yes ? 1 : 0);
    setYesCount(nextYes);
    if (step === QUESTIONS.length - 1) {
      track("test_complete", { test: "atopia", result: resultKey(nextYes) });
    }
    setStep(step + 1);
  }

  function restart() {
    setStep(0);
    setYesCount(0);
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
            {QUESTIONS[step]}
          </h2>
          <div className="mt-6 grid gap-3">
            <button
              onClick={() => answer(true)}
              className="w-full rounded-card border border-sand bg-white p-5 text-left font-medium transition-colors hover:border-brand"
            >
              Sí
            </button>
            <button
              onClick={() => answer(false)}
              className="w-full rounded-card border border-sand bg-white p-5 text-left font-medium transition-colors hover:border-brand"
            >
              No
            </button>
          </div>
        </div>
      )}

      {done && bucket && (
        <div>
          <button onClick={restart} className="text-sm text-ink-soft hover:text-brand">
            ← Empezar de nuevo
          </button>
          <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
            {bucket.title}
          </h2>
          <p className="mt-4 rounded-card bg-brand-light p-5 leading-relaxed text-ink">
            {bucket.text}
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold">
            Productos que pueden acompañar el cuidado diario
          </h3>
          <p className="mt-1 text-sm text-ink-soft">
            Las líneas Proavenal y Lactokey están pensadas para piel seca,
            sensible o con tendencia atópica, como acompañamiento del cuidado
            diario.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {productsByUniverse("piel-sensible").map((p) => (
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
            <Disclaimer text="Este mini test no diagnostica la dermatitis atópica. Solo un médico puede confirmar el diagnóstico y definir el tratamiento adecuado. Consulte a su médico." />
          </div>
        </div>
      )}
    </div>
  );
}
