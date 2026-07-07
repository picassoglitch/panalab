"use client";

import Link from "next/link";
import { useState } from "react";
import { UNIVERSES, productsByUniverse, getUniverse } from "@/lib/data";
import { track } from "@/lib/analytics";
import BuyButtons from "@/components/BuyButtons";
import Disclaimer from "@/components/Disclaimer";
import Newsletter from "@/components/Newsletter";

const DETAIL_QUESTIONS: Record<
  string,
  { question: string; options: { label: string; note: string }[] }
> = {
  cabello: {
    question: "¿Cómo describirías la caída o el estado de tu cabello?",
    options: [
      {
        label: "Caída reciente (menos de 3 meses)",
        note: "Suele relacionarse con cambios de temporada, estrés o hábitos. Una rutina de shampoo fortalecedor y suplemento puede acompañar esta etapa.",
      },
      {
        label: "Caída persistente (más de 3 meses)",
        note: "Cuando la caída se prolonga, lo más importante es una valoración con dermatólogo. Mientras tanto, una rutina completa puede acompañar el cuidado diario.",
      },
      {
        label: "Cabello dañado o debilitado",
        note: "Los procesos químicos y el calor debilitan la fibra. Una rutina reparadora ayuda a restaurarla.",
      },
    ],
  },
  "piel-sensible": {
    question: "¿Para quién buscas orientación?",
    options: [
      {
        label: "Para mí (adulto)",
        note: "La piel sensible adulta agradece limpieza suave y emolientes sin fragancia, aplicados de forma constante.",
      },
      {
        label: "Para un niño o bebé",
        note: "En pieles infantiles con resequedad o atopia, la constancia en la hidratación es clave — y el pediatra o dermatólogo debe guiar el manejo.",
      },
    ],
  },
  acne: {
    question: "¿Cómo son tus brotes?",
    options: [
      {
        label: "Ocasionales o leves",
        note: "Una rutina de limpieza adecuada y tratamiento localizado suele ser un buen punto de partida.",
      },
      {
        label: "Frecuentes o con marcas",
        note: "El acné frecuente o que deja marcas merece valoración dermatológica. La rutina de limpieza acompaña, no sustituye.",
      },
    ],
  },
  sol: {
    question: "¿Cuál es tu exposición típica al sol?",
    options: [
      {
        label: "Diaria en la ciudad",
        note: "La exposición urbana acumulada es la principal causa de fotoenvejecimiento. Un fotoprotector facial diario es el hábito más importante.",
      },
      {
        label: "Actividades al aire libre",
        note: "Para deporte o playa conviene protección corporal resistente al agua y reaplicación frecuente.",
      },
    ],
  },
  "primeras-arrugas": {
    question: "¿Qué te interesa más?",
    options: [
      {
        label: "Prevenir desde ahora",
        note: "Antioxidantes por la mañana y fotoprotección diaria son la base de la prevención.",
      },
      {
        label: "Ya noto primeras líneas",
        note: "Una rutina con sérum antioxidante y buenos hábitos de protección ayuda a cuidar la piel en esta etapa.",
      },
    ],
  },
};

export default function AdvisorFlow() {
  const [step, setStep] = useState(0);
  const [universe, setUniverse] = useState<string | null>(null);
  const [detail, setDetail] = useState<number | null>(null);

  function pickUniverse(slug: string) {
    if (step === 0) track("advisor_start", {});
    setUniverse(slug);
    setStep(1);
  }

  function pickDetail(i: number) {
    setDetail(i);
    setStep(2);
    track("advisor_complete", { universe: universe ?? "", option: i });
  }

  function restart() {
    setStep(0);
    setUniverse(null);
    setDetail(null);
  }

  const u = universe ? getUniverse(universe) : null;
  const dq = universe ? DETAIL_QUESTIONS[universe] : null;

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
            ¿Sobre qué quieres orientarte hoy?
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {UNIVERSES.map((un) => (
              <button
                key={un.slug}
                onClick={() => pickUniverse(un.slug)}
                className={`flex items-center gap-4 rounded-card p-5 text-left transition-transform hover:-translate-y-0.5 ${un.tone}`}
              >
                <span className="text-3xl">{un.emoji}</span>
                <span className="font-display text-lg font-semibold">{un.nav}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && u && dq && (
        <div>
          <button onClick={restart} className="text-sm text-ink-soft hover:text-brand">
            ← Empezar de nuevo
          </button>
          <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
            {dq.question}
          </h2>
          <div className="mt-6 grid gap-3">
            {dq.options.map((o, i) => (
              <button
                key={o.label}
                onClick={() => pickDetail(i)}
                className="rounded-card border border-sand bg-white p-5 text-left font-medium transition-colors hover:border-brand"
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && u && dq && detail !== null && (
        <div>
          <button onClick={restart} className="text-sm text-ink-soft hover:text-brand">
            ← Empezar de nuevo
          </button>
          <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
            Tu orientación
          </h2>
          <p className="mt-4 rounded-card bg-brand-light p-5 leading-relaxed text-ink">
            {dq.options[detail].note}
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold">
            Productos Panalab que pueden acompañarte
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {productsByUniverse(u.slug).slice(0, 4).map((p) => (
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

          <div className="mt-8">
            <Disclaimer text="Esta herramienta no sustituye una valoración médica. Consulte a su médico antes de iniciar cualquier tratamiento." />
          </div>

          <div className="mt-8">
            <h3 className="font-display text-xl font-semibold">¿Dónde comprar?</h3>
            <div className="mt-3">
              <BuyButtons product={`asesor-${u.slug}`} />
            </div>
          </div>

          <p className="mt-6 text-ink-soft">
            ¿Prefieres una valoración profesional?{" "}
            <Link href="/derma-finder" className="font-semibold text-brand hover:underline">
              Busca un dermatólogo cerca de ti →
            </Link>
          </p>

          <div className="mt-10 rounded-card border border-sand bg-white p-6">
            <h3 className="font-display text-xl font-semibold">
              Recibe tu rutina por correo
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              Te enviamos esta orientación con consejos para empezar.
            </p>
            <div className="mt-4">
              <Newsletter source={`advisor_${u.slug}`} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
