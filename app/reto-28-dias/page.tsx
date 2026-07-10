import type { Metadata } from "next";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import Disclaimer from "@/components/Disclaimer";
import Accordion, { AccordionItem } from "@/components/Accordion";

export const metadata: Metadata = {
  title: "Reto 28 días",
  description:
    "Reto 28 días · Tu mejor piel: regístrate, recibe tu rutina sugerida y comparte tu avance semanal con la comunidad Panalab.",
};

const STEPS = [
  {
    week: "Semana 1",
    title: "Conoce tu piel y arranca tu rutina",
    desc: "Responde el test inicial, recibe tu rutina sugerida y da tus primeros pasos con recordatorios y tips por correo.",
  },
  {
    week: "Semana 2",
    title: "Constancia y hábitos",
    desc: "La clave está en repetir: cada día recibirás recordatorios y tips por correo para que tu rutina se vuelva hábito.",
  },
  {
    week: "Semana 3",
    title: "Ajustes con base en tu avance",
    desc: "Comparte cómo va tu piel y afina tu rutina con recomendaciones, recordatorios y tips por correo adaptados a tu progreso.",
  },
  {
    week: "Semana 4",
    title: "Resultados y celebración",
    desc: "Compara tu antes y después, celebra tus logros con la comunidad y recibe por correo tips para mantener tus resultados.",
  },
];

const ACHIEVEMENTS = [
  {
    emoji: "🧪",
    title: "Completar tests",
    desc: "Suma puntos cada vez que completas un test de piel o cabello y conoces mejor tus necesidades.",
  },
  {
    emoji: "📋",
    title: "Participar en encuestas",
    desc: "Tu opinión cuenta: responde encuestas breves durante el reto y desbloquea logros.",
  },
  {
    emoji: "🎥",
    title: "Ver webinars",
    desc: "Aprende con especialistas en sesiones cortas y gana insignias por cada webinar que completes.",
  },
  {
    emoji: "💬",
    title: "Compartir tu testimonio",
    desc: "Cuenta tu experiencia al final del reto y obtén el logro más valioso de la comunidad.",
  },
];

export default function Reto28DiasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-accent-dark to-accent text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <p className="text-xs font-bold uppercase tracking-wider text-white/80">
            Gamificación Panalab
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
            Reto 28 días · Tu mejor piel
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">
            Regístrate, recibe tu rutina sugerida y comparte tu avance semanal.
            Cuatro semanas para construir hábitos que tu piel va a agradecer.
          </p>
          <span className="mt-6 inline-block rounded-full bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider">
            Muy pronto
          </span>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">Cómo funciona</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          Un plan de cuatro semanas, paso a paso, con acompañamiento en cada
          etapa.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <article
              key={s.week}
              className="rounded-card border border-sand bg-white p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-accent-dark">
                {s.week}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Sistema de logros */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            Sistema de logros
          </h2>
          <p className="mt-2 max-w-2xl text-ink-soft">
            Cada actividad que completas desbloquea logros. Los logros dan
            acceso a sorteos de kits Panalab.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ACHIEVEMENTS.map((a) => (
              <article
                key={a.title}
                className="rounded-card border border-sand bg-cream p-6"
              >
                <span className="text-3xl" aria-hidden="true">
                  {a.emoji}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {a.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Registro */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="panalab-gradient rounded-card p-8 text-white sm:p-12">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Apúntate a la lista
          </h2>
          <p className="mt-2 max-w-xl text-white/80">
            El reto está por comenzar. Deja tu correo y tendrás acceso
            anticipado cuando el Reto 28 días arranque, además de contenido
            útil para preparar tu piel.
          </p>
          <div className="mt-6 max-w-lg [&_input]:border-white/30 [&_label]:text-white/70">
            <Newsletter source="reto28" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-3xl font-semibold">
          Preguntas frecuentes
        </h2>
        <div className="mt-8">
          <Accordion>
            <AccordionItem title="¿Tiene costo participar en el reto?">
              <p>
                No. El Reto 28 días es completamente gratuito: solo necesitas
                registrarte con tu correo electrónico.
              </p>
            </AccordionItem>
            <AccordionItem title="¿Necesito productos Panalab para participar?">
              <p>
                Los productos Panalab son recomendados para acompañar tu
                rutina, pero el reto es de hábitos: puedes participar y avanzar
                con constancia, limpieza adecuada y fotoprotección diaria.
              </p>
            </AccordionItem>
            <AccordionItem title="¿Qué pasa con mis datos?">
              <p>
                Usamos tu correo únicamente con tu consentimiento para enviarte
                los contenidos del reto. Puedes consultar el detalle en nuestro{" "}
                <Link
                  href="/aviso-de-privacidad"
                  className="font-medium text-brand hover:underline"
                >
                  aviso de privacidad
                </Link>
                .
              </p>
            </AccordionItem>
            <AccordionItem title="¿El reto sustituye una consulta médica?">
              <p>
                No. El reto es una guía de hábitos de cuidado y no sustituye
                una valoración profesional. Consulte a su médico.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
        <Disclaimer />
      </section>
    </>
  );
}
