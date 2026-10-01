"use client";

import Link from "next/link";
import { MARKETPLACES, type BuyLinks } from "@/lib/data";
import { buildUtmUrl, track } from "@/lib/analytics";

type Props = {
  /** Identificador que viaja en el evento y en utm_term. */
  product?: string;
  /**
   * `general` (por defecto) muestra los canales genericos de Panalab: es lo
   * correcto en /donde-comprar/ y en el cierre del Asesor, donde todavia no se
   * habla de un producto concreto.
   *
   * `product` exige URL directa al producto. En una ficha, mandar a una
   * busqueda de "panalab" deja al usuario buscando a mano lo que ya estaba
   * viendo, asi que sin URL no se pinta ningun boton.
   */
  scope?: "general" | "product";
  /** Enlaces directos del producto. Solo se usa con scope="product". */
  buyLinks?: BuyLinks;
};

export default function BuyButtons({
  product,
  scope = "general",
  buyLinks,
}: Props) {
  const channels =
    scope === "product"
      ? MARKETPLACES.filter((m) => Boolean(buyLinks?.[m.id as keyof BuyLinks]))
      : MARKETPLACES;

  if (scope === "product" && channels.length === 0) {
    return (
      <p className="text-sm leading-relaxed text-ink-soft">
        Próximamente en tiendas en línea.{" "}
        <Link href="/donde-comprar/" className="font-semibold text-brand hover:underline">
          Mira dónde comprar Panalab
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {channels.map((m) => {
        const base =
          scope === "product"
            ? (buyLinks?.[m.id as keyof BuyLinks] as string)
            : m.baseUrl;
        return (
          <a
            key={m.id}
            href={buildUtmUrl(base, { channel: m.id, product })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track("click_where_to_buy", {
                channel: m.id,
                product: product ?? "general",
              })
            }
            className="wave-btn wave-btn-brand flex items-center justify-center rounded-full border-2 border-brand px-6 py-3 text-sm font-medium text-brand"
          >
            {m.name}
          </a>
        );
      })}
    </div>
  );
}
