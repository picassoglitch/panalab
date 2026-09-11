import type { MetadataRoute } from "next";
import { PRODUCTS, UNIVERSES } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

// Rutas con archivo propio bajo app/. Al agregar una página nueva, súmala aquí.
// Nota: /universos y /productos no tienen índice todavía, sólo rutas [slug].
const STATIC_ROUTES = [
  "/",
  "/derma-finder",
  "/asesor-virtual",
  "/donde-comprar",
  "/historias",
  "/reto-28-dias",
  "/profesionales",
  "/herramientas",
  "/herramientas/test-de-piel",
  "/herramientas/calculadora-rutina",
  "/herramientas/mini-test-atopia",
  "/herramientas/mini-test-caida",
  "/aviso-de-privacidad",
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (path: string, priority: number) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  });

  return [
    ...STATIC_ROUTES.map((route) => entry(route, route === "/" ? 1 : 0.7)),
    ...UNIVERSES.map((u) => entry(`/universos/${u.slug}`, 0.8)),
    ...PRODUCTS.map((p) => entry(`/productos/${p.slug}`, 0.6)),
  ];
}
