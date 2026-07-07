import Link from "next/link";
import { notFound } from "next/navigation";
import { UNIVERSES, getUniverse, productsByUniverse } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import Disclaimer from "@/components/Disclaimer";

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

  return (
    <>
      <section className={universe.tone}>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <span className="text-4xl">{universe.emoji}</span>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
            {universe.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {universe.intro}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">
          ¿Te identificas con alguna de estas necesidades?
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {universe.needs.map((n) => (
            <div
              key={n}
              className="rounded-xl border border-sand bg-white px-5 py-4 text-sm font-medium"
            >
              {n}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Disclaimer />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-2xl font-semibold">
          Productos de este universo
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/herramientas"
            className="rounded-full bg-brand px-6 py-3 text-center font-medium text-white transition-colors hover:bg-brand-dark"
          >
            Orientarme con el Asesor Virtual
          </Link>
          <Link
            href="/donde-comprar"
            className="rounded-full border-2 border-brand px-6 py-3 text-center font-medium text-brand transition-colors hover:bg-brand hover:text-white"
          >
            Dónde comprar
          </Link>
        </div>
      </section>
    </>
  );
}
