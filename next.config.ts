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
  : {
      // Esta rama es la que construye Vercel. Existe una copia publica del
      // sitio en panalab.vercel.app que compite en buscadores con panalab.mx,
      // asi que todo lo que no se sirva desde el dominio canonico sale con
      // noindex. `headers()` no existe en el export estatico; en Apache el
      // equivalente es el X-Robots-Tag de public/.htaccess.
      //
      // Solo surte efecto cuando Vercel reconstruya desde una rama que ya
      // tenga esto. Lo definitivo es retirar esa copia (tarea de OPS).
      async headers() {
        return [
          {
            source: "/:path*",
            missing: [{ type: "host", value: "panalab.mx" }],
            headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
          },
        ];
      },
    };

export default nextConfig;
