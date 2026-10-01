/**
 * Dominio canonico del sitio.
 *
 * Fijo a proposito y no leido del entorno: es el mismo que redirige
 * public/.htaccess y el unico que debe aparecer en los buscadores. Existe una
 * copia publica en panalab.vercel.app, y sin canonical las dos compiten por
 * el mismo contenido.
 */
export const SITE_URL = "https://panalab.mx";

/**
 * Ruta canonica de una pagina, siempre con barra final.
 *
 * El build usa `trailingSlash: true` y Apache sirve /ruta/index.html, asi que
 * la URL buena termina en barra. Sin ella el canonical apuntaria a una URL
 * que responde 301.
 */
export function canonical(path: string): string {
  if (path === "/" || path === "") return "/";
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean.endsWith("/") ? clean : `${clean}/`;
}
