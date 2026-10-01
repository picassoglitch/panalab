import type { MetadataRoute } from "next";
import { PRODUCTS, UNIVERSES } from "@/lib/data";
import { DERMA_FINDER_MODE } from "@/lib/features";
import { SITE_URL, canonical } from "@/lib/site";

// Igual que robots.ts: con output: "export" esto se resuelve en el build.
export const dynamic = "force-static";

/**
 * Rutas fijas del sitio.
 *
 * /derma-finder/ no entra mientras el directorio este apagado: la pagina lleva
 * noindex y no tiene contenido que indexar. Tampoco entran las de error.
 */
const STATIC_ROUTES = [
  "/",
  "/asesor-virtual/",
  "/donde-comprar/",
  "/herramientas/",
  "/herramientas/calculadora-rutina/",
  "/herramientas/mini-test-atopia/",
  "/herramientas/mini-test-caida/",
  "/herramientas/test-de-piel/",
  "/historias/",
  "/profesionales/",
  "/reto-28-dias/",
  "/aviso-de-privacidad/",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...STATIC_ROUTES,
    ...(DERMA_FINDER_MODE === "off" ? [] : ["/derma-finder/"]),
    ...UNIVERSES.map((u) => canonical(`/universos/${u.slug}`)),
    ...PRODUCTS.map((p) => canonical(`/productos/${p.slug}`)),
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
