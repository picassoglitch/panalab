#!/usr/bin/env node
// Revisa el resultado de `npm run build:static` en out/.
// Comprueba lo que solo se puede ver en el HTML ya generado: canonicals,
// un solo <h1> y un solo <title>, descripciones unicas, el 404 en espanol,
// robots.txt, sitemap.xml y que Derma Finder no quede expuesto cuando esta
// apagado. No sustituye a los tests: corre despues del build.
//
//   npm run verify:out
//
// Sale con codigo 1 y lista todos los fallos juntos, para no arreglarlos
// de uno en uno.

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
const SITE_URL = "https://panalab.mx";
const GENERIC_DESC =
  "El hub digital de Panalab México: cuidado capilar, piel sensible, acné, fotoprotección y antioxidantes, con información clara y herramientas útiles.";

const errors = [];
const notes = [];
const fail = (msg) => errors.push(msg);

if (!existsSync(OUT)) {
  console.error(`No existe ${OUT}/. Corre primero: npm run build:static`);
  process.exit(1);
}

/** Todos los index.html bajo out/, como rutas de URL ("/", "/productos/x/"). */
function walkPages(dir = OUT, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkPages(full, acc);
    else if (entry === "index.html") {
      const rel = relative(OUT, full).split(sep).slice(0, -1).join("/");
      acc.push({ file: full, route: rel ? `/${rel}/` : "/" });
    }
  }
  return acc;
}

const pages = walkPages();
if (pages.length === 0) fail("out/ no tiene ningun index.html");

const count = (html, re) => (html.match(re) ?? []).length;
const attr = (html, re) => (html.match(re) ?? [])[1];

// --- Un solo <title> por pagina, y un solo <h1> en la home -----------------
for (const { file, route } of pages) {
  const html = readFileSync(file, "utf8");
  const titles = count(html, /<title[\s>]/g);
  if (titles !== 1) fail(`${route} tiene ${titles} <title> (debe ser 1)`);

  const h1s = count(html, /<h1[\s>]/g);
  if (route === "/" && h1s !== 1) fail(`La home tiene ${h1s} <h1> (debe ser 1)`);
  if (h1s > 1) fail(`${route} tiene ${h1s} <h1> (maximo 1)`);
}

// Las paginas de error no llevan canonical: no son contenido indexable y
// apuntarlas a si mismas o a la home seria mentir sobre que son.
const ERROR_ROUTES = new Set(["/404/", "/_not-found/"]);

// --- Canonical por pagina, con barra final --------------------------------
for (const { file, route } of pages) {
  if (ERROR_ROUTES.has(route)) continue;
  const html = readFileSync(file, "utf8");
  const canonicals = count(html, /rel="canonical"/g);
  if (canonicals !== 1) {
    fail(`${route} tiene ${canonicals} <link rel="canonical"> (debe ser 1)`);
    continue;
  }
  const href = attr(html, /rel="canonical"\s+href="([^"]*)"/);
  const expected = `${SITE_URL}${route}`;
  if (href !== expected) fail(`${route}: canonical es "${href}", se esperaba "${expected}"`);
}

// --- Descripciones unicas en productos y universos -------------------------
const descs = new Map();
for (const { file, route } of pages) {
  if (!/^\/(productos|universos)\//.test(route)) continue;
  const html = readFileSync(file, "utf8");
  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  if (!desc) {
    fail(`${route} no tiene meta description`);
    continue;
  }
  if (desc === GENERIC_DESC) fail(`${route} usa la descripcion generica del layout`);
  if (desc.length > 155) fail(`${route}: descripcion de ${desc.length} caracteres (maximo 155)`);
  if (descs.has(desc)) fail(`${route} repite la descripcion de ${descs.get(desc)}`);
  else descs.set(desc, route);
}

// --- 404 en espanol --------------------------------------------------------
const notFound = join(OUT, "404.html");
if (!existsSync(notFound)) fail("falta out/404.html");
else {
  const html = readFileSync(notFound, "utf8");
  const titles = count(html, /<title[\s>]/g);
  if (titles !== 1) fail(`out/404.html tiene ${titles} <title> (debe ser 1)`);
  if (!html.includes("Página no encontrada"))
    fail('out/404.html no dice "Página no encontrada"');
  if (/could not be found/i.test(html))
    fail("out/404.html sigue trayendo el texto por defecto en ingles");
}

// --- robots.txt ------------------------------------------------------------
const robots = join(OUT, "robots.txt");
if (!existsSync(robots)) fail("falta out/robots.txt");
else {
  const txt = readFileSync(robots, "utf8");
  if (!txt.includes(`${SITE_URL}/sitemap.xml`))
    fail("out/robots.txt no apunta al sitemap");
}

// --- sitemap.xml -----------------------------------------------------------
const sitemap = join(OUT, "sitemap.xml");
if (!existsSync(sitemap)) fail("falta out/sitemap.xml");
else {
  const xml = readFileSync(sitemap, "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length <= 40) fail(`sitemap.xml tiene ${locs.length} <loc> (se esperaban mas de 40)`);

  const routes = new Set(pages.map((p) => p.route));
  for (const loc of locs) {
    if (!loc.startsWith(`${SITE_URL}/`)) fail(`sitemap: "${loc}" no empieza con ${SITE_URL}/`);
    if (!loc.endsWith("/")) fail(`sitemap: "${loc}" no termina en barra`);
    const route = loc.slice(SITE_URL.length);
    if (!routes.has(route)) fail(`sitemap: "${loc}" no corresponde a ningun index.html de out/`);
  }
  notes.push(`sitemap.xml: ${locs.length} URLs, todas con pagina generada`);
}

// --- Derma Finder apagado --------------------------------------------------
const dermaPage = join(OUT, "derma-finder", "index.html");
if (existsSync(dermaPage)) {
  const html = readFileSync(dermaPage, "utf8");
  const off = !/Valeria Ontiveros/.test(html);
  if (off) {
    if (!/noindex/.test(html)) fail("derma-finder apagado pero sin noindex");
    // Con el directorio apagado, ningun enlace del sitio debe invitar a entrar.
    for (const { file, route } of pages) {
      if (route === "/derma-finder/") continue;
      const page = readFileSync(file, "utf8");
      for (const m of page.matchAll(
        /<a\b[^>]*href="\/derma-finder\/"[^>]*>([\s\S]*?)<\/a>/g,
      )) {
        const text = m[1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
        if (!/Próximamente/i.test(text))
          fail(`${route}: enlace a /derma-finder/ sin marcar "Próximamente" ("${text}")`);
      }
    }
    notes.push("derma-finder: apagado, con noindex y sin especialistas ficticios");
  } else {
    if (!/Directorio de demostración/.test(html))
      fail("derma-finder en modo demo sin el aviso de demostracion");
    if (/mailto:/.test(html)) fail("derma-finder en modo demo todavia tiene enlaces mailto:");
    if (!/noindex/.test(html)) fail("derma-finder en modo demo sin noindex");
    notes.push("derma-finder: modo demo, con aviso y sin mailto");
  }
}

// --- Enlaces de compra genericos -------------------------------------------
for (const { file, route } of pages) {
  if (!route.startsWith("/productos/")) continue;
  const html = readFileSync(file, "utf8");
  if (/amazon\.com\.mx\/s\?k=panalab/.test(html))
    fail(`${route} todavia enlaza a la busqueda generica de Amazon`);
  if (/listado\.mercadolibre\.com\.mx\/panalab/.test(html))
    fail(`${route} todavia enlaza a la busqueda generica de Mercado Libre`);
}

// --- Resultado -------------------------------------------------------------
console.log(`verify:out — ${pages.length} paginas revisadas en ${OUT}/`);
for (const n of notes) console.log(`  · ${n}`);

if (errors.length) {
  console.error(`\n${errors.length} problema(s):`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log("Todo correcto.");
