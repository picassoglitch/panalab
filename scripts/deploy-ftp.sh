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
FTP_DIR="${FTP_DIR:-/public_html}"
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
MIRROR_FLAGS="--reverse --delete --verbose --parallel=4"
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
