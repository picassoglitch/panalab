import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hosting compartido por FTP (Apache/cPanel), sin servidor Node: el sitio se
  // publica como export estático. `next build` genera la carpeta out/.
  output: "export",
  // Cada ruta queda como carpeta con index.html, que Apache sirve sin rewrites.
  trailingSlash: true,
  // El export estático no incluye el optimizador de imágenes de Next.
  images: { unoptimized: true },
};

export default nextConfig;
