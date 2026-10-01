#!/usr/bin/env node
// Lista los productos que no tienen URL de compra directa.
//
// Es un aviso, no un error: el build sigue. Mientras un producto no tenga URL,
// su ficha no muestra botones de compra, porque mandar a una busqueda generica
// de "panalab" deja al usuario buscando a mano lo que ya estaba viendo.
//
// Se ejecuta dentro de `npm run build:static`.

import { PRODUCTS, BUY_LINK_HOSTS, MARKETPLACES } from "../lib/data.ts";

const channels = MARKETPLACES.map((m) => m.id);
const missing = [];
const invalid = [];

for (const p of PRODUCTS) {
  const links = p.buyLinks ?? {};
  const present = channels.filter((c) => links[c]);
  if (present.length === 0) missing.push(p.slug);

  for (const [channel, url] of Object.entries(links)) {
    if (!url) continue;
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      invalid.push(`${p.slug} · ${channel}: "${url}" no es una URL valida`);
      continue;
    }
    if (parsed.protocol !== "https:")
      invalid.push(`${p.slug} · ${channel}: no es https`);
    else if (!BUY_LINK_HOSTS.includes(parsed.hostname))
      invalid.push(`${p.slug} · ${channel}: dominio no permitido (${parsed.hostname})`);
  }
}

if (missing.length) {
  console.warn(
    `\n[buy-links] ${missing.length} de ${PRODUCTS.length} productos sin URL de compra directa.`,
  );
  console.warn("[buy-links] Su ficha no mostrara botones de compra:");
  for (const slug of missing) console.warn(`  · ${slug}`);
  console.warn("[buy-links] Pendiente del cliente (ver OPS 7 en el prompt de QA).\n");
} else {
  console.log("[buy-links] Todos los productos tienen URL de compra.");
}

// Una URL mal formada si es un error: significa que alguien ya cargo datos y
// quedaron mal, y eso llegaria a produccion sin que nadie lo note.
if (invalid.length) {
  console.error(`\n[buy-links] ${invalid.length} enlace(s) invalido(s):`);
  for (const e of invalid) console.error(`  ✗ ${e}`);
  process.exit(1);
}
