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

/* Estos cuatro logros son acciones abstractas (test, encuesta, webinar,
   testimonio): no hay foto de producto Panalab que las represente, y meter
   banco de imagenes en un sitio comercial del cliente es un tema de licencia.
   Van como iconos vectoriales en color de marca, que se ven nitidos a
   cualquier tamano. Si el cliente manda fotografia propia, se cambian aqui. */
const ACHIEVEMENTS = [
  {
    icon: (
      <>
        <path d="M9 4.5H7.5A2 2 0 0 0 5.5 6.5v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-13a2 2 0 0 0-2-2H15" />
        <rect x="9" y="2.5" width="6" height="4" rx="1" />
        <path d="m9.5 14 2 2 3.5-3.5" />
      </>
    ),
    title: "Completar tests",
    desc: "Suma puntos cada vez que completas un test de piel o cabello y conoces mejor tus necesidades.",
  },
  {
    icon: (
      <>
        <path d="M3 20.5h18" />
        <path d="M6 20.5v-7" />
        <path d="M12 20.5V4" />
        <path d="M18 20.5v-11" />
      </>
    ),
    title: "Participar en encuestas",
    desc: "Tu opinión cuenta: responde encuestas breves durante el reto y desbloquea logros.",
  },
  {
    icon: (
      <>
        <rect x="2.5" y="5" width="19" height="13" rx="2" />
        <path d="m10.5 9.5 4.5 3-4.5 3z" />
      </>
    ),
    title: "Ver webinars",
    desc: "Aprende con especialistas en sesiones cortas y gana insignias por cada webinar que completes.",
  },
  {
    icon: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-12.8 7.2L3.5 20.5l1.8-4.6A8.4 8.4 0 1 1 21 11.5z" />
        <path d="M8.5 11.5h7" />
        <path d="M8.5 8.5h4" />
      </>
    ),
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
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    {a.icon}
                  </svg>
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
