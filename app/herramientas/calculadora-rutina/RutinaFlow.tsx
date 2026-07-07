"use client";

import Link from "next/link";
import { useState } from "react";
import { getProduct } from "@/lib/data";
import { track } from "@/lib/analytics";
import Disclaimer from "@/components/Disclaimer";
import Newsletter from "@/components/Newsletter";

type Focus = "piel" | "cabello";

interface RoutineStep {
  title: string;
  detail: string;
  productSlug?: string;
}

interface RoutineBlock {
  heading: string;
  subheading: string;
  steps: RoutineStep[];
}

interface NeedOption {
  id: string;
  label: string;
  blocks: RoutineBlock[];
}

const NEEDS: Record<Focus, { question: string; options: NeedOption[] }> = {
  piel: {
    question: "¿Cuál es la necesidad principal de tu piel?",
    options: [
      {
        id: "piel-sensible-reseca",
        label: "Piel sensible o reseca",
        blocks: [
          {
            heading: "Mañana",
            subheading: "En este orden, todos los días",
            steps: [
              {
                title: "Limpieza suave",
                detail:
                  "Usa un limpiador tipo syndet, sin fragancia y con pH fisiológico, con agua tibia (no caliente).",
              },
              {
                title: "Hidratación / emoliente",
                detail:
                  "Aplica el emoliente con la piel aún ligeramente húmeda para sellar la hidratación.",
                productSlug: "proavenal",
              },
              {
                title: "Fotoprotección",
                detail:
                  "Último paso de la mañana, incluso en días nublados. Reaplica cada 3 a 4 horas de exposición.",
                productSlug: "fotoprotector-facial",
              },
            ],
          },
          {
            heading: "Noche",
            subheading: "Antes de dormir",
            steps: [
              {
                title: "Limpieza suave",
                detail:
                  "Retira el fotoprotector y las impurezas del día con el mismo limpiador suave de la mañana.",
              },
              {
                title: "Tratamiento renovador suave",
                detail:
                  "La noche es buen momento para activos renovadores que respetan el equilibrio de la piel.",
                productSlug: "lactokey",
              },
              {
                title: "Hidratación / emoliente",
                detail:
                  "Cierra la rutina con tu emoliente para reforzar la barrera cutánea mientras duermes.",
                productSlug: "proavenal",
              },
            ],
          },
        ],
      },
      {
        id: "tendencia-acneica",
        label: "Tendencia acneica",
        blocks: [
          {
            heading: "Mañana",
            subheading: "En este orden, todos los días",
            steps: [
              {
                title: "Limpieza suave",
                detail:
                  "Limpia sin tallar: el exceso de fricción irrita y puede empeorar los brotes.",
                productSlug: "gel-limpiador-acne",
              },
              {
                title: "Hidratación ligera",
                detail:
                  "Usa un hidratante ligero, libre de aceite (oil-free) y no comedogénico. La piel con acné también necesita hidratación.",
              },
              {
                title: "Fotoprotección",
                detail:
                  "Elige un fotoprotector de acabado ligero; el sol puede oscurecer las marcas de acné.",
                productSlug: "fotoprotector-facial",
              },
            ],
          },
          {
            heading: "Noche",
            subheading: "Antes de dormir",
            steps: [
              {
                title: "Limpieza suave",
                detail:
                  "Segunda (y última) limpieza del día. Lavar más veces no mejora el acné.",
                productSlug: "gel-limpiador-acne",
              },
              {
                title: "Tratamiento localizado",
                detail:
                  "Aplica una capa fina solo sobre los brotes visibles, sin exprimirlos.",
                productSlug: "gel-secativo",
              },
              {
                title: "Hidratación ligera",
                detail:
                  "Termina con tu hidratante ligero no comedogénico para evitar la resequedad de los activos.",
              },
            ],
          },
        ],
      },
      {
        id: "prevencion-primeras-arrugas",
        label: "Prevención y primeras arrugas",
        blocks: [
          {
            heading: "Mañana",
            subheading: "En este orden, todos los días",
            steps: [
              {
                title: "Limpieza suave",
                detail:
                  "Empieza con un limpiador suave que no reseque ni tense la piel.",
              },
              {
                title: "Sérum antioxidante",
                detail:
                  "Sobre piel limpia y seca, antes de la crema. Los antioxidantes complementan la defensa frente a sol y contaminación.",
                productSlug: "serum-antioxidante",
              },
              {
                title: "Hidratación",
                detail:
                  "Aplica tu crema hidratante habitual para mantener la piel flexible y luminosa.",
              },
              {
                title: "Fotoprotección",
                detail:
                  "El hábito con mayor impacto contra el fotoenvejecimiento. Siempre el último paso de la mañana.",
                productSlug: "fotoprotector-facial",
              },
            ],
          },
          {
            heading: "Noche",
            subheading: "Antes de dormir",
            steps: [
              {
                title: "Limpieza suave",
                detail:
                  "Retira fotoprotector, maquillaje e impurezas antes de cualquier tratamiento nocturno.",
              },
              {
                title: "Tratamiento de noche",
                detail:
                  "Si tu médico te indicó un activo renovador (como retinoides), va en este paso, sobre piel limpia y seca.",
              },
              {
                title: "Hidratación",
                detail:
                  "Cierra con tu crema para acompañar la renovación nocturna de la piel. Como complemento diario, un antioxidante oral puede sumar desde adentro.",
                productSlug: "antioxidante-oral",
              },
            ],
          },
        ],
      },
    ],
  },
  cabello: {
    question: "¿Cuál es la necesidad principal de tu cabello?",
    options: [
      {
        id: "caida-fortalecimiento",
        label: "Caída / fortalecimiento",
        blocks: [
          {
            heading: "Rutina semanal",
            subheading: "Constancia durante varias semanas",
            steps: [
              {
                title: "Lavado con shampoo fortalecedor",
                detail:
                  "En cada lavado, masajea suavemente el cuero cabelludo y enjuaga bien.",
                productSlug: "aminoter-max-shampoo",
              },
              {
                title: "Mascarilla 2-3 veces por semana",
                detail:
                  "Después del shampoo, de medios a puntas; deja actuar unos minutos y enjuaga.",
                productSlug: "aminoter-mask",
              },
              {
                title: "Suplemento diario según indicación",
                detail:
                  "Un suplemento capilar puede complementar la rutina tópica desde adentro. Sigue la indicación del empaque o de tu médico.",
                productSlug: "complidermol",
              },
            ],
          },
        ],
      },
      {
        id: "reparacion-dano",
        label: "Reparación por daño",
        blocks: [
          {
            heading: "Rutina semanal",
            subheading: "Constancia durante varias semanas",
            steps: [
              {
                title: "Lavado con shampoo fortalecedor",
                detail:
                  "Limpia con un shampoo que cuide la fibra capilar; evita el agua muy caliente.",
                productSlug: "aminoter-max-shampoo",
              },
              {
                title: "Mascarilla 2-3 veces por semana",
                detail:
                  "La mascarilla nutre y ayuda a devolver suavidad al cabello debilitado por químicos o calor.",
                productSlug: "aminoter-mask",
              },
              {
                title: "Tratamiento reparador según indicación",
                detail:
                  "Sobre cabello limpio y húmedo, según el empaque. Reduce el uso de herramientas de calor mientras el cabello se recupera.",
                productSlug: "aminoter-reparage",
              },
            ],
          },
        ],
      },
    ],
  },
};

const TIPS = [
  "La constancia es clave: una rutina muestra resultados en 4 a 8 semanas.",
  "Introduce un producto nuevo a la vez, para identificar cómo responde tu piel o tu cabello.",
  "Si notas irritación persistente o los síntomas empeoran, suspende el producto y consulta a tu médico.",
];

export default function RutinaFlow() {
  const [step, setStep] = useState(0);
  const [focus, setFocus] = useState<Focus | null>(null);
  const [need, setNeed] = useState<NeedOption | null>(null);

  function pickFocus(f: Focus) {
    if (step === 0) track("test_start", { test: "calculadora-rutina" });
    setFocus(f);
    setStep(1);
  }

  function pickNeed(option: NeedOption) {
    setNeed(option);
    setStep(2);
    track("test_complete", {
      test: "calculadora-rutina",
      focus: focus ?? "",
      need: option.id,
    });
  }

  function restart() {
    setStep(0);
    setFocus(null);
    setNeed(null);
  }

  const needConfig = focus ? NEEDS[focus] : null;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center gap-2">
        {[0, 1, 2].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full ${s <= step ? "bg-brand" : "bg-sand"}`}
          />
        ))}
      </div>

      {step === 0 && (
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            ¿Para qué quieres ordenar tu rutina?
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              onClick={() => pickFocus("piel")}
              className="flex items-center gap-4 rounded-card bg-[#f2eef4] p-5 text-left transition-transform hover:-translate-y-0.5"
            >
              <span className="text-3xl">🧴</span>
              <span className="font-display text-lg font-semibold">Piel</span>
            </button>
            <button
              onClick={() => pickFocus("cabello")}
              className="flex items-center gap-4 rounded-card bg-[#eef4ee] p-5 text-left transition-transform hover:-translate-y-0.5"
            >
              <span className="text-3xl">💇</span>
              <span className="font-display text-lg font-semibold">Cabello</span>
            </button>
          </div>
        </div>
      )}

      {step === 1 && needConfig && (
        <div>
          <button onClick={restart} className="text-sm text-ink-soft hover:text-brand">
            ← Empezar de nuevo
          </button>
          <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
            {needConfig.question}
          </h2>
          <div className="mt-6 grid gap-3">
            {needConfig.options.map((o) => (
              <button
                key={o.id}
                onClick={() => pickNeed(o)}
                className="rounded-card border border-sand bg-white p-5 text-left font-medium transition-colors hover:border-brand"
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && focus && need && (
        <div>
          <button onClick={restart} className="text-sm text-ink-soft hover:text-brand">
            ← Empezar de nuevo
          </button>
          <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
            Tu rutina ordenada
          </h2>
          <p className="mt-2 text-ink-soft">
            {focus === "piel"
              ? "Sigue cada paso en este orden, mañana y noche."
              : "Organiza tu semana con estos pasos y mantén la constancia."}
          </p>

          <div
            className={`mt-6 grid gap-4 ${need.blocks.length > 1 ? "md:grid-cols-2" : ""}`}
          >
            {need.blocks.map((block) => (
              <div
                key={block.heading}
                className="rounded-card border border-sand bg-white p-6"
              >
                <h3 className="font-display text-xl font-semibold">{block.heading}</h3>
                <p className="mt-0.5 text-sm text-ink-soft">{block.subheading}</p>
                <ol className="mt-5 space-y-5">
                  {block.steps.map((s, i) => {
                    const product = s.productSlug ? getProduct(s.productSlug) : undefined;
                    return (
                      <li key={s.title} className="flex gap-4">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light font-display text-sm font-bold text-brand">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-semibold">{s.title}</p>
                          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                            {s.detail}
                          </p>
                          {product && (
                            <Link
                              href={`/productos/${product.slug}`}
                              className="mt-2 inline-block rounded-full border border-brand px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand transition-colors hover:bg-brand hover:text-white"
                            >
                              {product.name}
                            </Link>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-card bg-brand-light p-6">
            <h3 className="font-display text-lg font-semibold">
              Consejos para que funcione
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink">
              {TIPS.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span aria-hidden className="text-brand">
                    •
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 rounded-card border border-sand bg-white p-6">
            <h3 className="font-display text-xl font-semibold">
              Recibe tu rutina por correo
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              Te enviamos esta rutina paso a paso con consejos para empezar.
            </p>
            <div className="mt-4">
              <Newsletter source="calculadora" />
            </div>
          </div>

          <div className="mt-8">
            <Disclaimer text="Esta rutina es orientativa y no sustituye una valoración médica. Consulte a su médico antes de iniciar cualquier tratamiento." />
          </div>
        </div>
      )}
    </div>
  );
}
