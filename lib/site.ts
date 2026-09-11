// Dominio de producción. Único lugar donde se configura la URL pública del sitio.
// Cámbialo aquí (o vía NEXT_PUBLIC_SITE_URL) y se propaga a metadata, sitemap y robots.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://panalab.mx"
).replace(/\/$/, "");

export const SITE_NAME = "Panalab México";

// El build usa trailingSlash, así que las URLs canónicas también lo llevan.
export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  const clean = `/${path.replace(/^\/+/, "").replace(/\/+$/, "")}/`;
  return `${SITE_URL}${clean}`;
}
