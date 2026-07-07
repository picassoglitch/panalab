import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, getUniverse } from "@/lib/data";
import BuyButtons from "@/components/BuyButtons";
import Disclaimer from "@/components/Disclaimer";

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
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
          className={`flex min-h-72 items-center justify-center rounded-3xl text-8xl ${universe?.tone ?? "bg-sand"}`}
        >
          {universe?.emoji}
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-brand">
            {universe?.nav}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {product.benefit}
          </p>

          <h2 className="mt-8 font-display text-lg font-semibold">Cómo se usa</h2>
          <p className="mt-2 leading-relaxed text-ink-soft">{product.usage}</p>

          <h2 className="mt-6 font-display text-lg font-semibold">
            Ingredientes clave
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {product.ingredients.map((i) => (
              <li
                key={i}
                className="rounded-full bg-brand-light px-3 py-1 text-sm text-brand-dark"
              >
                {i}
              </li>
            ))}
          </ul>

          <h2 className="mt-6 font-display text-lg font-semibold">
            Respaldo científico
          </h2>
          <p className="mt-2 leading-relaxed text-ink-soft">{product.science}</p>

          <div className="mt-8">
            <h2 className="font-display text-lg font-semibold">Dónde comprar</h2>
            <div className="mt-3">
              <BuyButtons product={product.slug} />
            </div>
          </div>

          <div className="mt-8">
            <Disclaimer text={product.legend} />
          </div>
        </div>
      </div>
    </div>
  );
}
