#!/usr/bin/env bash
# Sube el sitio estatico a panalab.mx por FTPS explicito.
#
# Uso:
#   npm run build:static
#   FTP_PASS='...' ./scripts/deploy-ftp.sh
#
# Nunca escribas la contrasena dentro de este archivo: va por variable de
# entorno para que no termine en el repositorio.
#
# Requiere lftp:  brew install lftp  /  sudo apt install lftp

set -euo pipefail

FTP_HOST="${FTP_HOST:-panalab.mx}"
FTP_PORT="${FTP_PORT:-21}"
FTP_USER="${FTP_USER:-userPnlb@panalab.mx}"
# La cuenta FTP del cliente (userPnlb@panalab.mx) entra enjaulada: su raiz "/"
# YA ES el document root del sitio. Apuntar aqui a /public_html creaba
# /public_html dentro del docroot y dejaba el sitio en panalab.mx/public_html/
# mientras panalab.mx/ devolvia el 403 de cPanel (sin index en la raiz).
FTP_DIR="${FTP_DIR:-/}"
LOCAL_DIR="${LOCAL_DIR:-out}"
# Algunos hospedajes compartidos presentan un certificado que no coincide con el
# dominio. Solo entonces: FTP_VERIFY_CERT=no ./scripts/deploy-ftp.sh
FTP_VERIFY_CERT="${FTP_VERIFY_CERT:-yes}"

if [ -z "${FTP_PASS:-}" ]; then
  echo "Falta FTP_PASS. Ejemplo: FTP_PASS='tu-password' $0" >&2
  exit 1
fi

if [ ! -f "$LOCAL_DIR/index.html" ]; then
  echo "No encuentro $LOCAL_DIR/index.html. Corre primero: npm run build:static" >&2
  exit 1
fi

# --dry-run: muestra que subiria y que borraria, sin tocar el servidor.
# --delete borra en el servidor lo que no exista en out/. Como ahora espejamos
# contra la raiz, hay que proteger lo que no es nuestro:
#   .well-known/  validacion ACME/AutoSSL -> borrarlo rompe la renovacion del
#                 certificado HTTPS
#   .ftpquota     archivo de cuota que mantiene el hospedaje
MIRROR_FLAGS="--reverse --delete --verbose --parallel=4"
# Las comillas simples sobreviven hasta lftp: sin ellas su parser se come la
# barra invertida y el patron dejaria de coincidir con un punto literal.
MIRROR_FLAGS="$MIRROR_FLAGS --exclude '^\.well-known' --exclude '^\.ftpquota$'"
if [ "${1:-}" = "--dry-run" ]; then
  MIRROR_FLAGS="$MIRROR_FLAGS --dry-run"
fi

lftp -c "
set ftp:ssl-force true;
set ftp:ssl-protect-data true;
set ssl:verify-certificate $FTP_VERIFY_CERT;
open -u '$FTP_USER','$FTP_PASS' -p $FTP_PORT '$FTP_HOST';
mirror $MIRROR_FLAGS '$LOCAL_DIR' '$FTP_DIR';
bye;
"

echo "Listo. Revisa https://panalab.mx"
