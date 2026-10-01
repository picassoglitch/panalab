import type { Metadata } from "next";
import { PRIVACY, isPrivacyProvisional } from "@/lib/legal";

export const metadata: Metadata = {
  alternates: { canonical: "/aviso-de-privacidad/" },
  title: "Aviso de privacidad",
  description:
    "Cómo Panalab México trata los datos personales que recibe a través de este sitio y cómo ejercer tus derechos ARCO.",
};

export default function AvisoPrivacidadPage() {
  const provisional = isPrivacyProvisional();

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-semibold">Aviso de privacidad</h1>

      {provisional ? (
        // Mientras no haya texto validado no se publica un aviso a medias.
        // Antes se veian los corchetes ("[domicilio por confirmar]") y una
        // nota interna dirigida al equipo, en una pagina publica contra la
        // que ademas se pedia consentimiento.
        <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
          <p>
            El aviso de privacidad de {PRIVACY.responsable} está en revisión y
            se publicará en esta página en cuanto esté validado.
          </p>
          <p>
            Mientras tanto, este sitio no recaba datos personales a través de
            formularios.
          </p>
        </div>
      ) : (
        // TODO(owner): el texto definitivo lo entrega el area legal del
        // cliente y entra en un PR aparte. Esta estructura solo coloca los
        // valores de lib/legal.ts.
        <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
          <p>
            {PRIVACY.responsable}, con domicilio en {PRIVACY.domicilio}, es
            responsable del tratamiento de los datos personales que nos
            proporciones a través de este sitio.
          </p>
          <p>
            Los datos que recabamos (como tu correo electrónico al suscribirte)
            se utilizan únicamente para enviarte la información que solicitaste
            y, con tu consentimiento, comunicaciones de la marca.
          </p>
          <p>
            Puedes ejercer tus derechos ARCO (acceso, rectificación,
            cancelación y oposición) escribiendo a {PRIVACY.correoArco}.
          </p>
          <p className="text-sm">
            Última actualización: {PRIVACY.updatedAt}.
          </p>
        </div>
      )}
    </div>
  );
}
