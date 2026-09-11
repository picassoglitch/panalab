import Link from "next/link";
import { notFound } from "next/navigation";
import {
  UNIVERSES,
  FAQS,
  getProductLine,
  getUniverse,
  productsByUniverse,
} from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Disclaimer from "@/components/Disclaimer";
import Accordion, { AccordionItem } from "@/components/Accordion";
import TrackView from "@/components/TrackView";
import OceanWaves from "@/components/OceanWaves";

export function generateStaticParams() {
  return UNIVERSES.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const universe = getUniverse(slug);
  return { title: universe?.title ?? "Universo" };
}

export default async function UniversePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const universe = getUniverse(slug);
  if (!universe) notFound();

  const allProducts = productsByUniverse(slug);
  const faqs = FAQS[slug] ?? [];

  // Líneas con sección propia (p. ej. Cuteral en acné) van arriba, con su
  // encabezado; el resto de productos sigue en el grid general.
  const lineIds = Array.from(new Set(allProducts.map((p) => p.line))).filter(
    (id) => getProductLine(id),
  );
  const lineSections = lineIds.map((id) => ({
    line: getProductLine(id)!,
    products: allProducts.filter((p) => p.line === id),
  }));
  const products = allProducts.filter((p) => !getProductLine(p.line));

  // Banner editorial intercalado en el grid, patrón ISDIN (posición fija)
  const gridItems: React.ReactNode[] = products.map((p) => (
    <ProductCard key={p.slug} product={p} />
  ));
  const banner = (
    <Link
      key="_banner"
      href="/asesor-virtual"
      className={`panalab-gradient flex flex-col justify-between rounded-card p-5 text-white transition-shadow hover:shadow-lg sm:col-span-2 ${
        products.length === 0 ? "lg:col-span-4" : ""
      }`}
    >
      <p className="text-xs font-bold tracking-[0.25em] text-white/70">
        ¿NO SABES POR DÓNDE EMPEZAR?
      </p>
      <div className="mt-8">
        <p className="font-display text-2xl font-extrabold leading-snug">
          El Asesor Virtual te sugiere una rutina en 2 minutos
        </p>
        <span className="mt-4 inline-block rounded-full bg-white px-5 py-2 text-xs font-bold tracking-wider text-brand">
          EMPEZAR
        </span>
      </div>
    </Link>
  );
  if (gridItems.length > 2) gridItems.splice(2, 0, banner);
  else gridItems.push(banner);

  return (
    <>
      <TrackView event="view_category" params={{ category: universe.slug }} />
      <section className={`relative ${universe.tone}`}>
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 md:pt-16">
          <span className="text-4xl">{universe.emoji}</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
            {universe.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {universe.intro}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {universe.needs.map((n) => (
              <span
                key={n}
                className="rounded-full border border-ink/10 bg-white/70 px-4 py-1.5 text-sm font-medium"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
        <OceanWaves />
      </section>

      {lineSections.map(({ line, products: lineProducts }) => (
        <section
          key={line.id}
          id={line.name.toLowerCase()}
          className="mx-auto max-w-6xl px-4 pt-12 sm:px-6"
        >
          <p className="text-xs font-bold tracking-[0.25em] text-ink-soft">
            LÍNEA
          </p>
          <h2 className="mt-2 font-display text-3xl leading-snug sm:text-4xl">
            <span className="font-extrabold">{line.name}.</span>{" "}
            <span className="font-light">{line.tagline}</span>
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
            {line.description}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lineProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{gridItems}</div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/donde-comprar"
            className="wave-btn wave-btn-deep rounded-full bg-brand px-7 py-3 text-center text-sm font-bold tracking-wider text-white"
          >
            DÓNDE COMPRAR
          </Link>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="bg-cream">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Preguntas frecuentes
            </h2>
            <div className="mt-6">
              <Accordion>
                {faqs.map((f) => (
                  <AccordionItem key={f.q} title={f.q}>
                    {f.a}
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="mt-8">
              <Disclaimer />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
