"use client";

import { MARKETPLACES } from "@/lib/data";
import { buildUtmUrl, track } from "@/lib/analytics";

export default function BuyButtons({ product }: { product?: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      {MARKETPLACES.map((m) => (
        <a
          key={m.id}
          href={buildUtmUrl(m.baseUrl, { channel: m.id, product })}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track("click_where_to_buy", { channel: m.id, product: product ?? "general" })
          }
          className="wave-btn wave-btn-brand flex items-center justify-center rounded-full border-2 border-brand px-6 py-3 text-sm font-medium text-brand"
        >
          {m.name}
        </a>
      ))}
    </div>
  );
}
