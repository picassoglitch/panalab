#!/usr/bin/env node
// Resuelve el token __LEAD_ENDPOINT_ORIGIN__ en out/.htaccess.
//
// El formulario de suscripcion hace un fetch al proveedor de formularios, asi
// que su origen tiene que estar en connect-src o la CSP lo bloquea. Como el
// proveedor se configura por variable de entorno y .htaccess es un archivo
// estatico, el valor se sustituye despues del build.
//
// Solo se agrega el origen (esquema + host + puerto), nunca la ruta completa:
// en una CSP la ruta no aporta nada y revelaria el id del formulario.
//
// Corre al final de `npm run build:static`.

import { existsSync, readFileSync, writeFileSync } from "node:fs";

const FILE = "out/.htaccess";
const TOKEN = "__LEAD_ENDPOINT_ORIGIN__";

if (!existsSync(FILE)) {
  console.error(`[csp] No existe ${FILE}. ¿Corrio el build?`);
  process.exit(1);
}

const raw = (process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "").trim();
let origin = "";

if (raw) {
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    console.error(`[csp] NEXT_PUBLIC_LEAD_ENDPOINT no es una URL valida: "${raw}"`);
    process.exit(1);
  }
  if (parsed.protocol !== "https:" && parsed.hostname !== "localhost") {
    console.error(
      `[csp] NEXT_PUBLIC_LEAD_ENDPOINT debe ser https (salvo localhost para pruebas): "${raw}"`,
    );
    process.exit(1);
  }
  origin = parsed.origin;
}

const before = readFileSync(FILE, "utf8");
if (!before.includes(TOKEN)) {
  console.warn(`[csp] ${FILE} no trae ${TOKEN}; no hay nada que sustituir.`);
  process.exit(0);
}

// Sin endpoint, el token se va junto con el espacio que lo precede, para no
// dejar dos espacios sueltos dentro de la directiva.
const after = origin
  ? before.replaceAll(TOKEN, origin)
  : before.replaceAll(` ${TOKEN}`, "").replaceAll(TOKEN, "");

writeFileSync(FILE, after);

console.log(
  origin
    ? `[csp] connect-src ahora incluye ${origin}`
    : "[csp] Sin endpoint de leads: el token se quito de connect-src.",
);
