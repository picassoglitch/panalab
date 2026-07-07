import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
};

export default function AvisoPrivacidadPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-semibold">Aviso de privacidad</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
        <p>
          Panalab México, con domicilio en [domicilio por confirmar], es
          responsable del tratamiento de los datos personales que nos
          proporciones a través de este sitio.
        </p>
        <p>
          Los datos que recabamos (como tu correo electrónico al guardar una
          rutina o suscribirte al newsletter) se utilizan únicamente para
          enviarte la información que solicitaste y, con tu consentimiento,
          comunicaciones de la marca.
        </p>
        <p>
          Puedes ejercer tus derechos ARCO (acceso, rectificación, cancelación
          y oposición) escribiendo a [correo de contacto por confirmar].
        </p>
        <p className="rounded-lg bg-sand px-4 py-3 text-sm">
          Este texto es provisional y debe ser sustituido por el aviso de
          privacidad definitivo validado por el área legal del cliente antes de
          salir a producción.
        </p>
      </div>
    </div>
  );
}
