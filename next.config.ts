import type { NextConfig } from "next";

// El hospedaje del cliente (panalab.mx) es un servidor compartido con acceso
// solo por FTP, asi que no puede ejecutar Node. Con STATIC_EXPORT=true el build
// genera HTML estatico en /out, listo para subir por FTPS a public_html.
// Sin la variable, el build normal sigue igual (Vercel, `next start`, etc.).
const staticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      // Apache sirve /ruta/index.html: evita 404 en las rutas internas.
      trailingSlash: true,
      // La optimizacion de imagenes de Next necesita servidor.
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
