import Link from "next/link";
import { notFound } from "next/navigation";
import { UNIVERSES, FAQS, getUniverse, productsByUniverse } from "@/lib/data";
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

  const products = productsByUniverse(slug);
  const faqs = FAQS[slug] ?? [];

  // Banner editorial intercalado en el grid, patrón ISDIN (posición fija)
  const gridItems: React.ReactNode[] = products.map((p) => (
    <ProductCard key={p.slug} product={p} />
  ));
  const banner = (
    <Link
      key="_banner"
      href="/asesor-virtual"
      className="flex flex-col justify-between rounded-card bg-gradient-to-br from-brand-dark to-brand p-5 text-white transition-shadow hover:shadow-lg sm:col-span-2"
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
