import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, getUniverse, productsByUniverse } from "@/lib/data";
import BuyButtons from "@/components/BuyButtons";
import Disclaimer from "@/components/Disclaimer";
import ProductCard from "@/components/ProductCard";
import Accordion, { AccordionItem } from "@/components/Accordion";
import TrackView from "@/components/TrackView";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product?.name ?? "Producto" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const universe = getUniverse(product.universe);
  const related = productsByUniverse(product.universe)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <TrackView event="view_product" params={{ product: product.slug }} />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <nav className="text-sm text-ink-soft">
          <Link href="/" className="hover:text-brand">Inicio</Link>
          {" / "}
          <Link href={`/universos/${product.universe}`} className="hover:text-brand">
            {universe?.nav}
          </Link>
          {" / "}
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div
            className={`relative flex min-h-80 items-center justify-center rounded-card text-8xl ${universe?.tone ?? "bg-cream"}`}
          >
            {product.badge && (
              <span
                className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide text-white ${
                  product.badge === "Nuevo" ? "bg-accent-dark" : "bg-brand"
                }`}
              >
                {product.badge.toUpperCase()}
              </span>
            )}
            {universe?.emoji}
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-ink-soft">
              {product.line}
            </p>
            <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {product.benefit}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {product.ingredients.map((i) => (
                <span
                  key={i}
                  className="rounded-full bg-brand-light px-3 py-1 text-sm font-medium text-brand-dark"
                >
                  {i}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <p className="text-sm font-bold tracking-wider text-ink">DÓNDE COMPRAR</p>
              <div className="mt-3">
                <BuyButtons product={product.slug} />
              </div>
            </div>

            <div className="mt-8">
              <Accordion>
                <AccordionItem title="Cómo se usa">{product.usage}</AccordionItem>
                <AccordionItem title="Respaldo científico">
                  {product.science}
                </AccordionItem>
                <AccordionItem title="Ingredientes clave">
                  {product.ingredients.join(" · ")}
                </AccordionItem>
                <AccordionItem title="Bueno saber">
                  Cada piel es distinta: si tienes dudas sobre si este producto
                  es para ti, el Asesor Virtual puede orientarte y tu médico
                  siempre será la mejor guía.
                </AccordionItem>
              </Accordion>
            </div>

            <div className="mt-8">
              <Disclaimer text={product.legend} />
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-cream">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 className="font-display text-2xl leading-snug sm:text-3xl">
              <span className="font-extrabold">Completa tu rutina.</span>{" "}
              <span className="font-light">De la misma familia</span>
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
