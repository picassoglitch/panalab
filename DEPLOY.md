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

3. Subir el **contenido de `out/`** a la **raiz** de la cuenta FTP.

   > **Importante — la cuenta FTP entra enjaulada.** `userPnlb@panalab.mx`
   > aterriza directamente en el document root: lo que se ve como `/` al
   > conectarse **ya es** `public_html`. No hay que entrar a ninguna carpeta
   > `public_html` ni crearla. Al conectarse, `/` debe mostrar `.htaccess`,
   > `index.html`, `_next/`, `productos/`, etc.

   Con cliente grafico (FileZilla): Host `panalab.mx`, Usuario
   `userPnlb@panalab.mx`, Puerto `21`, Cifrado **"Requerir FTP explicito sobre
   TLS"**. Arrastrar todo lo que esta dentro de `out/` (no la carpeta `out`) a
   la raiz remota `/`. Verificar que el archivo oculto `.htaccess` tambien se
   suba: en FileZilla, *Servidor -> Forzar mostrar archivos ocultos*.

   Desde la terminal:

   ```bash
   read -rsp 'FTP pass: ' FTP_PASS && export FTP_PASS && echo

   FTP_VERIFY_CERT=no ./scripts/deploy-ftp.sh --dry-run   # simulacro
   FTP_VERIFY_CERT=no ./scripts/deploy-ftp.sh             # subida real
   ```

   `FTP_VERIFY_CERT=no` es obligatorio con este hospedaje: el servidor
   presenta el certificado `*.hostgator.mx`, que nunca va a coincidir con
   `panalab.mx`, asi que la verificacion falla siempre. La conexion sigue
   cifrada por TLS (`ftp:ssl-force` + `ftp:ssl-protect-data`); lo que se pierde
   es la autenticacion del certificado. Se lee la contrasena con `read -rsp`
   para que no quede en el historial del shell.

   El script usa `lftp` con FTPS explicito y espeja `out/` contra la raiz `/`
   de la cuenta (que es el document root). **`--delete` esta activo**: borra
   del servidor lo que ya no existe en `out/`. Es lo que queremos: el sitio
   nuevo reemplaza por completo al anterior (decision tomada con el cliente).
   Aun asi conviene bajar una copia de la raiz antes de la primera subida, por
   si acaso.

   Como el espejo corre contra la raiz, el script excluye del borrado dos
   cosas que son del hospedaje y no nuestras: `.well-known/` (validacion
   ACME/AutoSSL — borrarla rompe la renovacion del certificado HTTPS) y
   `.ftpquota`.

### Si `panalab.mx` responde 403 y el sitio aparece en `panalab.mx/public_html/`

Es el sintoma de haber subido todo un nivel mas abajo: quedo
`<document root>/public_html/` y la raiz se quedo sin `index.html`, asi que
Apache devuelve el 403 de cPanel. Paso por lo que `FTP_DIR` apuntaba a
`/public_html` sin tomar en cuenta que la cuenta ya entra enjaulada en el
document root. Se corrige volviendo a desplegar con `FTP_DIR=/` (el valor por
omision actual); el `--delete` del espejo se encarga de limpiar la carpeta
`public_html/` sobrante.

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
- No la escribas en linea (`FTP_PASS='...' ./scripts/deploy-ftp.sh`): queda
  guardada en claro en `~/.bash_history`. Usa el `read -rsp` del paso 3.
- `npm run build` (sin `STATIC_EXPORT`) sigue haciendo el build normal de
  Next.js, por si mas adelante se despliega en un servidor con Node.
- `out/` esta en `.gitignore`: es un artefacto de build, no se versiona.
