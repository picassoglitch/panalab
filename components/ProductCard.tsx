import Link from "next/link";
import type { Product } from "@/lib/data";
import { getUniverse } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const universe = getUniverse(product.universe);
  return (
    <Link
      href={`/productos/${product.slug}`}
      className="group relative flex flex-col rounded-card border border-sand bg-white transition-shadow hover:shadow-lg"
    >
      {product.badge && (
        <span
          className={`absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide text-white ${
            product.badge === "Nuevo" ? "bg-accent-dark" : "bg-brand"
          }`}
        >
          {product.badge.toUpperCase()}
        </span>
      )}
      <div
        className={`flex h-44 items-center justify-center text-6xl transition-transform duration-300 group-hover:scale-105 ${universe?.tone ?? "bg-cream"}`}
      >
        {universe?.emoji}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-bold tracking-[0.15em] text-ink-soft">
          {product.line}
        </p>
        <h3 className="mt-1 font-display text-base font-bold leading-snug group-hover:text-brand">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {product.benefit}
        </p>
        <span className="mt-auto pt-3 text-sm font-semibold text-brand">
          Ver producto
        </span>
      </div>
    </Link>
  );
}
