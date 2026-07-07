import type { Metadata } from "next";
import Link from "next/link";
import Disclaimer from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Herramientas",
  description:
    "Asesor Virtual, test de tipo de piel, calculadora de rutina, mini tests y Derma Finder: herramientas Panalab para orientarte.",
};

const TOOLS = [
  {
    href: "/herramientas/test-de-piel",
    title: "Test de tipo de piel",
    desc: "Descubre en 2 minutos si tu piel es seca, mixta, grasa o sensible, con un resultado simple y accionable.",
  },
  {
    href: "/herramientas/calculadora-rutina",
    title: "Calculadora de rutina",
    desc: "Ordena tus productos en el orden correcto, mañana y noche, según tu necesidad principal.",
  },
  {
    href: "/herramientas/mini-test-atopia",
    title: "¿Tu piel podría ser atópica?",
    desc: "Cinco preguntas rápidas para identificar señales que vale la pena comentar con tu médico.",
  },
  {
    href: "/herramientas/mini-test-caida",
    title: "¿Tu caída es estacional o persistente?",
    desc: "Identifica el patrón de tu caída de cabello y sabe cuándo conviene una valoración.",
  },
  {
    href: "/derma-finder",
    title: "Derma Finder",
    desc: "Encuentra dermatólogos y clínicas aliadas por código postal, con filtros por problema.",
  },
  {
    href: "/reto-28-dias",
    title: "Reto 28 días · Tu mejor piel",
    desc: "Regístrate, recibe una rutina sugerida y comparte tu avance semanal. Con logros y sorteos.",
  },
];

export default function HerramientasPage() {
  return (
    <>
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
            Herramientas
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Herramientas que te ayudan a orientarte y ordenar tu rutina, sin
            sustituir a tu médico.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-card bg-gradient-to-br from-brand-dark to-brand p-8 text-white sm:p-10">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-wider">
            EMPIEZA AQUÍ
          </span>
          <h2 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">
            Asesor Virtual Panalab
          </h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-white/80">
            Un flujo guiado que te hace preguntas sobre tu piel o cabello y te
            sugiere una rutina orientativa con productos Panalab. Nunca
            diagnostica: te orienta y te acerca a tu médico cuando hace falta.
          </p>
          <Link
            href="/asesor-virtual"
            className="mt-6 inline-block rounded-full bg-white px-7 py-3 text-sm font-bold tracking-wider text-brand transition-colors hover:bg-cream"
          >
            EMPEZAR AHORA
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group rounded-card border border-sand bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <h3 className="font-display text-xl font-bold group-hover:text-brand">
                {t.title}
              </h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{t.desc}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-brand">
                Probar →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Disclaimer text="Estas herramientas orientan y ordenan información; no diagnostican ni sustituyen una valoración médica. Consulte a su médico." />
        </div>
      </section>
    </>
  );
}
