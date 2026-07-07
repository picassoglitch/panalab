import Link from "next/link";
import { UNIVERSES, PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import BuyButtons from "@/components/BuyButtons";
import Disclaimer from "@/components/Disclaimer";

const TOOLS = [
  {
    title: "Asesor Virtual",
    desc: "Responde unas preguntas y recibe una rutina orientativa con productos Panalab.",
  },
  {
    title: "Test de tipo de piel",
    desc: "Descubre en 2 minutos si tu piel es seca, mixta, grasa o sensible.",
  },
  {
    title: "Calculadora de rutina",
    desc: "Ordena tus productos en el orden correcto, mañana y noche.",
  },
  {
    title: "Derma Finder",
    desc: "Encuentra dermatólogos y clínicas aliadas cerca de ti.",
  },
];

export default function Home() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <>
      <section className="bg-brand-light">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-brand">
              Panalab México
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
              Historias que tu piel quiere contar
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              Ciencia traducida a lenguaje cotidiano. Encuentra información
              clara, rutinas útiles y productos para cada momento de tu piel y
              tu cabello.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/herramientas"
                className="rounded-full bg-brand px-6 py-3 text-center font-medium text-white transition-colors hover:bg-brand-dark"
              >
                Probar el Asesor Virtual
              </Link>
              <Link
                href="/donde-comprar"
                className="rounded-full border-2 border-brand px-6 py-3 text-center font-medium text-brand transition-colors hover:bg-brand hover:text-white"
              >
                Dónde comprar
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2">
            {UNIVERSES.slice(0, 4).map((u) => (
              <Link
                key={u.slug}
                href={`/universos/${u.slug}`}
                className={`flex flex-col items-start justify-between rounded-2xl p-5 transition-transform hover:-translate-y-1 ${u.tone}`}
              >
                <span className="text-3xl">{u.emoji}</span>
                <span className="mt-6 font-display text-lg font-semibold leading-tight">
                  {u.nav}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          Entra por lo que necesitas
        </h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          No navegues por producto: navega por tu necesidad. Cada universo
          reúne información, rutinas y productos para un mismo problema.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {UNIVERSES.map((u) => (
            <Link
              key={u.slug}
              href={`/universos/${u.slug}`}
              className={`group rounded-2xl p-5 transition-shadow hover:shadow-lg ${u.tone}`}
            >
              <span className="text-3xl">{u.emoji}</span>
              <h3 className="mt-4 font-display text-lg font-semibold group-hover:text-brand">
                {u.nav}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                {u.intro}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Herramientas útiles
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Más que un catálogo: herramientas que te ayudan a orientarte, sin
            sustituir a tu médico.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((t) => (
              <div key={t.title} className="rounded-2xl border border-sand bg-cream p-5">
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent-dark">
                  Próximamente
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Disclaimer />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Productos destacados
            </h2>
            <p className="mt-3 max-w-2xl text-ink-soft">
              Una muestra del portafolio Panalab por universo.
            </p>
          </div>
          <Link href="/donde-comprar" className="text-sm font-medium text-brand hover:underline">
            Ver dónde comprar →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-brand">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            ¿Lista tu rutina? Encuentra Panalab cerca de ti
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Compra en tu marketplace favorito o en farmacias y distribuidores
            autorizados.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="[&_a]:border-white [&_a]:text-white [&_a:hover]:bg-white [&_a:hover]:text-brand">
              <BuyButtons />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
