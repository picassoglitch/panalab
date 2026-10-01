#!/usr/bin/env node
// Impide publicar el sitio con un aviso de privacidad a medias.
//
// El sitio pide consentimiento ("he leido el aviso de privacidad") al
// suscribirse. Si ese aviso todavia no existe, ese consentimiento no vale, asi
// que el build de produccion se detiene.
//
// Corre dentro de `npm run build:static`, antes de `next build`.
// En desarrollo (`--warn`) solo avisa, para no estorbar mientras se trabaja.

import { readFileSync } from "node:fs";
import { PRIVACY, PRIVACY_REQUIRED_FIELDS } from "../lib/legal.ts";

const warnOnly = process.argv.includes("--warn");
const PAGE = "app/aviso-de-privacidad/page.tsx";

const problems = [];

for (const field of PRIVACY_REQUIRED_FIELDS) {
  if (!String(PRIVACY[field] ?? "").trim()) {
    problems.push(`PRIVACY.${field} esta vacio (lib/legal.ts)`);
  }
}

if (PRIVACY.status !== "final") {
  problems.push(
    `PRIVACY.status es "${PRIVACY.status}"; tiene que ser "final" para publicar`,
  );
}

if (PRIVACY.updatedAt && !/^\d{4}-\d{2}-\d{2}$/.test(PRIVACY.updatedAt)) {
  problems.push(`PRIVACY.updatedAt debe ir en formato AAAA-MM-DD`);
}

// El texto publicado no puede traer marcadores ni notas internas.
//
// Solo se miran los nodos de texto del JSX, o sea lo que queda entre `>` y
// `<`. Si se revisara el archivo entero, nombres como `isPrivacyProvisional`
// o la propia variable `provisional` darian positivo para siempre y el guardia
// seguiria fallando incluso despues de que legal entregue el texto.
const source = readFileSync(PAGE, "utf8");
const withoutComments = source
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/^\s*\/\/.*$/gm, "");

const textNodes = [...withoutComments.matchAll(/>([^<>{}]+)</g)]
  .map((m) => m[1].replace(/\s+/g, " ").trim())
  .filter(Boolean);


const FORBIDDEN = [
  { re: /por confirmar/i, what: '"por confirmar"' },
  { re: /\[[^\]]+\]/, what: "un marcador entre corchetes" },
  { re: /\bprovisional\b/i, what: '"provisional"' },
];

for (const { re, what } of FORBIDDEN) {
  const hit = textNodes.find((t) => re.test(t));
  if (hit) {
    problems.push(
      `${PAGE} todavia muestra ${what} en el texto: "${hit.slice(0, 70)}"`,
    );
  }
}

if (problems.length === 0) {
  console.log("[check-legal] Aviso de privacidad listo para publicarse.");
  process.exit(0);
}

const title = warnOnly
  ? "[check-legal] AVISO: el aviso de privacidad todavia no es definitivo."
  : "[check-legal] El aviso de privacidad no esta listo, no se puede publicar.";

const log = warnOnly ? console.warn : console.error;
log(`\n${title}`);
for (const p of problems) log(`  · ${p}`);
log(
  warnOnly
    ? "[check-legal] En desarrollo solo es un aviso; `build:static` si va a fallar.\n"
    : "\nFalta que el area legal del cliente entregue: domicilio fiscal, correo\n" +
        "para derechos ARCO, el texto definitivo y la fecha. Se cargan en\n" +
        "lib/legal.ts y se pone status: \"final\".\n\n" +
        "El sitio pide consentimiento sobre este aviso al suscribirse, asi que\n" +
        "no debe salir a produccion sin el.\n",
);

process.exit(warnOnly ? 0 : 1);
