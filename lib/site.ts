// Dominio de producción. Único lugar donde se configura la URL pública del sitio.
// Cámbialo aquí (o vía NEXT_PUBLIC_SITE_URL) y se propaga a metadata, sitemap y robots.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://panalab.mx"
).replace(/\/$/, "");

export const SITE_NAME = "Panalab México";

// Sin trailingSlash (default de Next/Vercel): la raíz lleva "/" y el resto no,
// para que las URLs del sitemap coincidan exactamente con las canónicas.
export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}/${path.replace(/^\/+/, "").replace(/\/+$/, "")}`;
}
