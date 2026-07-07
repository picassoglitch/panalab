import type { Metadata } from "next";
import Link from "next/link";
import Newsletter from "@/components/Newsletter";
import { STORIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Historias",
  description:
    "Historias que tu piel quiere contar: testimonios reales, noticias y eventos de Panalab México.",
};

// Noticias de demostración — se sustituirán por contenido real de
// congresos/eventos cuando marketing lo apruebe.
const NEWS = [
  {
    tag: "Eventos",
    title: "Panalab en congresos dermatológicos 2026",
    desc: "Presencia en las principales cumbres médicas de México y la región.",
  },
  {
    tag: "Educación",
    title: "Dermatólogo en 60 segundos",
    desc: "La serie de cápsulas educativas que traducen la ciencia a lenguaje cotidiano.",
  },
  {
    tag: "Comunidad",
    title: "Reto 28 días: tu mejor piel",
    desc: "Muy pronto: regístrate, recibe tu rutina y comparte tu avance semanal.",
  },
];

export default function HistoriasPage() {
  return (
    <>
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">
            Historias que tu piel quiere contar
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Historias reales de piel y de vida: bienestar en el día a día,
            alivio para la piel atópica, confianza frente al espejo y seguridad
            recuperada.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {STORIES.map((s) => (
            <figure key={s.author} className={`rounded-card p-6 ${s.tone}`}>
              <blockquote className="font-display text-lg leading-relaxed">
                “{s.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-ink-soft">
                {s.author}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-soft">
          Testimonios ilustrativos. Las historias publicadas se moderan con
          lineamientos médicos y regulatorios.
        </p>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            Noticias y eventos
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {NEWS.map((n) => (
              <article key={n.title} className="rounded-card border border-sand bg-cream p-6">
                <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand-dark">
                  {n.tag}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{n.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{n.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-card bg-brand p-8 text-white sm:p-12">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            ¿Quieres contar tu historia?
          </h2>
          <p className="mt-2 max-w-xl text-white/80">
            Suscríbete y entérate primero de los retos, sorteos y lanzamientos
            de Panalab México.
          </p>
          <div className="mt-6 max-w-lg [&_input]:border-white/30 [&_label]:text-white/70">
            <Newsletter source="historias" />
          </div>
        </div>
        <p className="mt-8 text-center">
          <Link href="/" className="text-sm font-medium text-brand hover:underline">
            ← Volver al inicio
          </Link>
        </p>
      </section>
    </>
  );
}
