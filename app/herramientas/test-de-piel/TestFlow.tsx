"use client";

import Link from "next/link";
import { useState } from "react";
import { productsByUniverse, type Product } from "@/lib/data";
import { track } from "@/lib/analytics";
import Disclaimer from "@/components/Disclaimer";
import Newsletter from "@/components/Newsletter";

type SkinType = "seca" | "mixta" | "grasa" | "sensible";

interface Option {
  label: string;
  type: SkinType;
}

interface Question {
  question: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    question: "Al despertar, ¿cómo sientes tu piel?",
    options: [
      { label: "Tirante, áspera o con resequedad", type: "seca" },
      { label: "Cómoda, aunque con algo de brillo en frente y nariz", type: "mixta" },
      { label: "Con brillo o sensación grasosa en casi todo el rostro", type: "grasa" },
      { label: "Con comezón, ardor o enrojecimiento", type: "sensible" },
    ],
  },
  {
    question: "Durante el día, ¿notas brillo en la zona T (frente, nariz y mentón)?",
    options: [
      { label: "Casi nunca; más bien se ve opaca o reseca", type: "seca" },
      { label: "Sí, pero solo en la zona T", type: "mixta" },
      { label: "Sí, el brillo aparece en todo el rostro", type: "grasa" },
      { label: "Más que brillo, noto zonas rojas o irritadas", type: "sensible" },
    ],
  },
  {
    question: "Cuando pruebas un producto nuevo, ¿cómo reacciona tu piel?",
    options: [
      { label: "A veces se siente aún más reseca", type: "seca" },
      { label: "Depende de la zona: unas partes bien, otras no", type: "mixta" },
      { label: "Suelen aparecer granitos o puntos negros", type: "grasa" },
      { label: "Arde, pica o se enrojece con facilidad", type: "sensible" },
    ],
  },
  {
    question: "¿Cómo describirías tus poros?",
    options: [
      { label: "Casi imperceptibles", type: "seca" },
      { label: "Visibles solo en la zona T", type: "mixta" },
      { label: "Visibles y abiertos en gran parte del rostro", type: "grasa" },
      { label: "No los noto mucho, pero mi piel reacciona a casi todo", type: "sensible" },
    ],
  },
  {
    question: "Después de lavarte la cara, ¿sientes tirantez?",
    options: [
      { label: "Sí, casi siempre y dura un buen rato", type: "seca" },
      { label: "Solo en las mejillas; la zona T queda cómoda", type: "mixta" },
      { label: "No; al poco tiempo vuelve el brillo", type: "grasa" },
      { label: "Sí, y a veces con ardor o comezón", type: "sensible" },
    ],
  },
];

const RESULTS: Record<
  SkinType,
  { title: string; text: string }
> = {
  seca: {
    title: "Tu piel tiende a ser seca",
    text: "Tus respuestas sugieren una piel que produce poca grasa y pierde agua con facilidad: tirantez, aspereza y poros poco visibles son señales típicas. Suele agradecer limpiadores suaves sin fragancia y emolientes aplicados de forma constante, idealmente después del baño. Recuerda que este test solo orienta: si la resequedad es intensa o persistente, lo mejor es una valoración con dermatólogo.",
  },
  mixta: {
    title: "Tu piel tiende a ser mixta",
    text: "Tus respuestas apuntan a una piel con dos comportamientos: brillo en la zona T y comodidad o resequedad en mejillas. La clave suele estar en el equilibrio: limpieza suave, hidratación ligera y fotoprotección diaria, evitando productos muy agresivos que alteren unas zonas para corregir otras. Este resultado es orientativo; un profesional de la salud puede afinar tu rutina.",
  },
  grasa: {
    title: "Tu piel tiende a ser grasa",
    text: "Tus respuestas sugieren una producción de grasa mayor a la habitual: brillo generalizado, poros visibles y tendencia a brotes. Una limpieza adecuada dos veces al día —sin exceso, porque irritar la piel puede empeorarla— suele ser el mejor punto de partida. Si los brotes son frecuentes o dejan marcas, la valoración dermatológica es el camino recomendado.",
  },
  sensible: {
    title: "Tu piel tiende a ser sensible",
    text: "Tus respuestas indican una piel que reacciona con facilidad: ardor, comezón o enrojecimiento frente a productos o cambios de clima. Este tipo de piel agradece fórmulas sin fragancia, limpieza muy suave e hidratación constante para cuidar la barrera cutánea. Si las molestias son frecuentes, te recomendamos comentarlo con un dermatólogo: este test orienta, no diagnostica.",
  },
};

function productsForType(type: SkinType): Product[] {
  switch (type) {
    case "sensible":
    case "seca":
      return productsByUniverse("piel-sensible").slice(0, 3);
    case "grasa":
      return productsByUniverse("acne").slice(0, 3);
    case "mixta":
      return [
        ...productsByUniverse("primeras-arrugas"),
        ...productsByUniverse("sol"),
      ].slice(0, 3);
  }
}

const EMPTY_SCORES: Record<SkinType, number> = {
  seca: 0,
  mixta: 0,
  grasa: 0,
  sensible: 0,
};

function winner(scores: Record<SkinType, number>): SkinType {
  const order: SkinType[] = ["sensible", "seca", "grasa", "mixta"];
  let best: SkinType = order[0];
  for (const t of order) {
    if (scores[t] > scores[best]) best = t;
  }
  return best;
}

export default function TestFlow() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<SkinType, number>>(EMPTY_SCORES);

  const done = step >= QUESTIONS.length;
  const result = done ? winner(scores) : null;

  function answer(type: SkinType) {
    if (step === 0) track("test_start", { test: "tipo-de-piel" });
    const next = { ...scores, [type]: scores[type] + 1 };
    setScores(next);
    if (step === QUESTIONS.length - 1) {
      track("test_complete", { test: "tipo-de-piel", result: winner(next) });
    }
    setStep(step + 1);
  }

  function restart() {
    setStep(0);
    setScores(EMPTY_SCORES);
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
                onClick={() => answer(o.type)}
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
            {RESULTS[result].title}
          </h2>
          <p className="mt-4 rounded-card bg-brand-light p-5 leading-relaxed text-ink">
            {RESULTS[result].text}
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold">
            Productos Panalab que pueden acompañarte
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {productsForType(result).map((p) => (
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
            <Disclaimer text="Este test es orientativo y no constituye un diagnóstico. Consulte a su médico si tiene dudas sobre el cuidado de su piel." />
          </div>

          <div className="mt-10 rounded-card border border-sand bg-white p-6">
            <h3 className="font-display text-xl font-semibold">
              Recibe tu rutina por correo
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              Te enviamos consejos de cuidado según tu tipo de piel.
            </p>
            <div className="mt-4">
              <Newsletter source="test_piel" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
