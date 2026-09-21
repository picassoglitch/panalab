# Despliegue de panalab.mx

## Que nos dio el cliente

Credenciales de **FTP**, no de un panel de Vercel/Netlify ni de DNS:

| Dato | Valor |
| --- | --- |
| Servidor FTP | `panalab.mx` |
| Usuario | `userPnlb@panalab.mx` |
| Puerto | `21` (FTPS explicito) |
| Password | fuera del repositorio (gestor de contrasenas) |

`panalab.mx` y `panalab.com.mx` apuntan hoy a `69.49.241.100`, un hospedaje
compartido tipo Apache/cPanel. Ese tipo de servidor **no ejecuta Node**, asi que
no puede correr `next start`. La buena noticia: este sitio no usa API routes,
server actions ni datos en tiempo real, por lo que se puede exportar como HTML
estatico y subir por FTP tal cual.

## Opcion A — subir el sitio al hospedaje del cliente (lo que habilitan estas credenciales)

1. Generar el sitio estatico:

   ```bash
   npm ci
   npm run build:static     # STATIC_EXPORT=true next build -> carpeta out/
   ```

   Genera 49 paginas en `out/` (~9 MB), incluido `out/.htaccess`.

2. Revisar el resultado en local antes de subirlo:

   ```bash
   npx serve out            # o: cd out && python3 -m http.server 8080
   ```

3. Subir el **contenido de `out/`** a `public_html` del servidor.

   Con cliente grafico (FileZilla): Host `panalab.mx`, Usuario
   `userPnlb@panalab.mx`, Puerto `21`, Cifrado **"Requerir FTP explicito sobre
   TLS"**. Arrastrar todo lo que esta dentro de `out/` (no la carpeta `out`) a
   `public_html`. Verificar que el archivo oculto `.htaccess` tambien se suba:
   en FileZilla, *Servidor -> Forzar mostrar archivos ocultos*.

   Desde la terminal:

   ```bash
   FTP_PASS='la-password' ./scripts/deploy-ftp.sh --dry-run   # simulacro
   FTP_PASS='la-password' ./scripts/deploy-ftp.sh             # subida real
   ```

   El script usa `lftp` con FTPS explicito y espeja `out/` contra
   `/public_html`. **`--delete` esta activo**: borra del servidor lo que ya no
   existe en `out/`. Es lo que queremos: el sitio nuevo reemplaza por completo
   al anterior (decision tomada con el cliente). Aun asi conviene bajar una
   copia de `public_html` antes de la primera subida, por si acaso.

4. Revisar en el navegador: home, un producto (`/productos/aminoter-mask/`), un
   universo (`/universos/acne/`), una herramienta y `/donde-comprar/`.

Cada actualizacion del sitio repite los pasos 1 y 3.

### Que hace `public/.htaccess`

Fuerza HTTPS, apunta el 404 a `/404.html` y define cache y compresion. Trae
comentada la redireccion de `panalab.com.mx` a `panalab.mx` por si el cliente
prefiere que la resolvamos nosotros; en el correo dijo que la hace el.

## Opcion B — Vercel con dominio propio (recomendada si el cliente acepta)

El hospedaje compartido obliga a exportar estatico y a subir por FTP en cada
cambio. Con Vercel, cada push despliega solo, hay preview por rama, HTTPS
automatico e imagenes optimizadas.

Requiere algo que estas credenciales **no** incluyen: acceso al **DNS** del
dominio para apuntar `panalab.mx` a Vercel (registro A `76.76.21.21`, o el que
indique el panel) y `www` por CNAME. Si el cliente lo autoriza, hay que pedirle
acceso al panel de DNS del registrador, no al FTP.

Mientras tanto, la Opcion A funciona con lo que ya tenemos.

## Notas

- La contrasena del FTP no se guarda en el repositorio: va en un gestor de
  contrasenas y se pasa por la variable `FTP_PASS`.
- `npm run build` (sin `STATIC_EXPORT`) sigue haciendo el build normal de
  Next.js, por si mas adelante se despliega en un servidor con Node.
- `out/` esta en `.gitignore`: es un artefacto de build, no se versiona.
