import Link from "next/link";
import type { Product } from "@/lib/data";
import { getUniverse } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const universe = getUniverse(product.universe);
  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group flex flex-col rounded-2xl border border-sand bg-white p-5 transition-shadow hover:shadow-lg"
    >
      <div
        className={`flex h-36 items-center justify-center rounded-xl text-5xl ${universe?.tone ?? "bg-sand"}`}
      >
        {universe?.emoji}
      </div>
      <p className="mt-4 text-xs font-medium uppercase tracking-wider text-brand">
        {universe?.nav}
      </p>
      <h3 className="mt-1 font-display text-lg font-semibold leading-snug group-hover:text-brand">
        {product.name}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
        {product.benefit}
      </p>
      <span className="mt-4 text-sm font-medium text-accent-dark">
        Ver producto →
      </span>
    </Link>
  );
}
