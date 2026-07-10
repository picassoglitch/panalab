import Link from "next/link";
import { UNIVERSES, PRODUCTS, STORIES } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import USPBar from "@/components/USPBar";
import Newsletter from "@/components/Newsletter";
import Disclaimer from "@/components/Disclaimer";
import HeroBanner from "@/components/HeroBanner";
import WaveDivider from "@/components/WaveDivider";

const COMMUNITY_BENEFITS = [
  "Recibe tu rutina personalizada por correo",
  "Entérate primero de lanzamientos y novedades",
  "Consejos de expertos en lenguaje claro",
  "Acceso a retos, sorteos y experiencias",
];

export default function Home() {
  const carousel = PRODUCTS.filter((p) => !p.provisional).concat(
    PRODUCTS.filter((p) => p.provisional)
  );

  return (
    <>
      {/* Hero de banners de campaña */}
      <HeroBanner />

      {/* Categorías / universos */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl leading-snug sm:text-4xl">
          <span className="font-extrabold">Cuidar tu piel es entenderla.</span>{" "}
          <span className="font-light">Entra por lo que necesitas hoy</span>
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {UNIVERSES.map((u) => (
            <Link
              key={u.slug}
              href={`/universos/${u.slug}`}
              className={`group rounded-card p-5 transition-shadow hover:shadow-lg ${u.tone}`}
            >
              <span className="text-3xl">{u.emoji}</span>
              <h3 className="mt-4 font-display text-lg font-bold group-hover:text-brand">
                {u.nav}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                {u.intro}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <WaveDivider fill="#f1f1f3" bg="#ffffff" />

      {/* Herramientas */}
      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl leading-snug sm:text-4xl">
            <span className="font-extrabold">Más que un catálogo.</span>{" "}
            <span className="font-light">Herramientas que te orientan</span>
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/asesor-virtual",
                title: "Asesor Virtual",
                desc: "Tu rutina orientativa en 2 minutos, guiada paso a paso.",
              },
              {
                href: "/herramientas/test-de-piel",
                title: "Test de tipo de piel",
                desc: "¿Seca, mixta, grasa o sensible? Descúbrelo en 5 preguntas.",
              },
              {
                href: "/herramientas/calculadora-rutina",
                title: "Calculadora de rutina",
                desc: "Ordena tus productos, mañana y noche, sin adivinar.",
              },
              {
                href: "/derma-finder",
                title: "Derma Finder",
                desc: "Dermatólogos y clínicas aliadas cerca de ti.",
              },
            ].map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group rounded-card border border-sand bg-white p-5 transition-shadow hover:shadow-lg"
              >
                <h3 className="font-display text-lg font-bold group-hover:text-brand">
                  {t.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.desc}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-brand">
                  Probar →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Banner de campaña */}
      <section className="bg-gradient-to-r from-accent-dark to-accent text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] text-white/80">
              MUY PRONTO
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
              Reto 28 días · Tu mejor piel
            </h2>
            <p className="mt-2 max-w-xl text-white/90">
              Regístrate, recibe tu rutina sugerida y comparte tu avance. Con
              recordatorios, logros y sorteos de kits Panalab.
            </p>
          </div>
          <Link
            href="/reto-28-dias"
            className="wave-btn wave-btn-accent shrink-0 rounded-full bg-white px-7 py-3 text-sm font-bold tracking-wider text-accent-dark"
          >
            CONOCE MÁS
          </Link>
        </div>
      </section>

      {/* Carrusel de productos */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl leading-snug sm:text-4xl">
            <span className="font-extrabold">Ciencia que se entiende.</span>{" "}
            <span className="font-light">Productos para cada historia</span>
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            El portafolio Panalab organizado por universos: capilar, piel
            sensible, acné, fotoprotección y antioxidantes.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-6xl overflow-x-auto px-4 pb-4 sm:px-6">
          <div className="flex w-max gap-4">
            {carousel.map((p) => (
              <div key={p.slug} className="w-64 shrink-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Link
            href="/donde-comprar"
            className="text-sm font-semibold text-brand hover:underline"
          >
            Ver todo y dónde comprar →
          </Link>
        </div>
      </section>

      <WaveDivider fill="#e7eaf4" bg="#ffffff" />

      {/* Comunidad */}
      <section className="bg-brand-light">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
              La comunidad de los que viven en su mejor piel
            </h2>
            <ul className="mt-6 space-y-3">
              {COMMUNITY_BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                    ✓
                  </span>
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div id="newsletter" className="rounded-card border border-sand bg-white p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold">
              No te pierdas nada
            </h3>
            <p className="mt-1 text-sm text-ink-soft">
              Novedades, consejos de expertos y retos, directo a tu correo.
            </p>
            <div className="mt-4">
              <Newsletter source="home" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl leading-snug sm:text-4xl">
          <span className="font-extrabold">Historias reales.</span>{" "}
          <span className="font-light">Piel real</span>
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {STORIES.map((s) => (
            <figure key={s.author} className={`rounded-card p-6 ${s.tone}`}>
              <blockquote className="font-display text-lg font-semibold leading-relaxed">
                “{s.quote}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-ink-soft">
                {s.author}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/historias" className="text-sm font-semibold text-brand hover:underline">
            Ver todas las historias →
          </Link>
        </div>
        <div className="mt-8">
          <Disclaimer />
        </div>
      </section>

      <USPBar />
    </>
  );
}
