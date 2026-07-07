import type { Metadata } from "next";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "Profesionales de la salud",
  description:
    "Espacio para dermatólogos, pediatras y médicos: resúmenes de estudios, fichas técnicas y webinars Panalab.",
};

const RESOURCES = [
  {
    title: "Resúmenes de estudios",
    desc: "Evidencia científica del portafolio Panalab en formato breve y accionable.",
  },
  {
    title: "Fichas técnicas",
    desc: "Composición, indicaciones de uso y presentaciones de cada producto.",
  },
  {
    title: "Webinars on demand",
    desc: "Sesiones con especialistas sobre manejo dermocosmético por categoría.",
  },
  {
    title: "PDFs descargables",
    desc: "Material de apoyo para consulta y punto de venta.",
  },
];

export default function ProfesionalesPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-white/60">
            Espacio profesional
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold sm:text-5xl">
            Para profesionales de la salud
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Contenido científico para dermatólogos, pediatras y médicos
            generales interesados en soluciones dermocosméticas y suplementos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {RESOURCES.map((r) => (
            <div key={r.title} className="rounded-card border border-sand bg-white p-6">
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-dark">
                Próximamente
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold">{r.title}</h2>
              <p className="mt-2 leading-relaxed text-ink-soft">{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-card border border-sand bg-white p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold">
            Recibe acceso cuando esté disponible
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Déjanos tu correo profesional y te avisamos al activar esta sección.
          </p>
          <div className="mt-4 max-w-lg">
            <Newsletter source="hcp" />
          </div>
        </div>
      </section>
    </>
  );
}
