import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import BuyButtons from "@/components/BuyButtons";

export const metadata: Metadata = {
  title: "Dónde comprar",
  description:
    "Encuentra productos Panalab en Amazon México, Mercado Libre, farmacias y distribuidores autorizados.",
};

export default function DondeComprarPage() {
  return (
    <>
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">
            Dónde comprar
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Los productos Panalab están disponibles en los principales
            marketplaces de México y en farmacias y distribuidores autorizados.
          </p>
          <div className="mt-8">
            <BuyButtons />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Busca tu producto
        </h2>
        <p className="mt-2 text-ink-soft">
          Entra a la ficha de cada producto para ir directo a su punto de venta.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
