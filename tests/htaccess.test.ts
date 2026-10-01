import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// No hay Apache en este entorno, asi que estos tests revisan el archivo
// fuente. La comprobacion de que Apache realmente emite las cabeceras va en
// DEPLOY.md, con curl contra el sitio ya desplegado.
const htaccess = readFileSync("public/.htaccess", "utf8");

/** Valor de una directiva `Header always set <Nombre> "<valor>"`. */
function headerValue(name: string): string | undefined {
  const re = new RegExp(`Header always set ${name} "([^"]*)"`);
  return htaccess.match(re)?.[1];
}

describe("cabeceras de seguridad", () => {
  it("todas se emiten con always, para que salgan tambien en 301 y 404", () => {
    const sets = htaccess.match(/^\s*Header (always )?(set|unset)/gm) ?? [];
    expect(sets.length).toBeGreaterThan(0);
    for (const s of sets) expect(s).toContain("always");
  });

  it("manda HSTS de un ano, solo sobre HTTPS", () => {
    expect(headerValue("Strict-Transport-Security")).toBe("max-age=31536000");
    const line = htaccess
      .split("\n")
      .find((l) => l.includes("Strict-Transport-Security"));
    expect(line).toContain("expr=");
    expect(line).toContain("%{HTTPS} == 'on'");
    expect(line).toContain("%{HTTP:X-Forwarded-Proto} == 'https'");
  });

  it("no activa includeSubDomains ni preload todavia", () => {
    expect(headerValue("Strict-Transport-Security")).not.toContain("includeSubDomains");
    expect(headerValue("Strict-Transport-Security")).not.toContain("preload");
  });

  it("bloquea el encuadre, el sniffing y filtra el referer", () => {
    expect(headerValue("X-Frame-Options")).toBe("DENY");
    expect(headerValue("X-Content-Type-Options")).toBe("nosniff");
    expect(headerValue("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
  });

  it("apaga camara, microfono, ubicacion, pago, usb y topics", () => {
    const pp = headerValue("Permissions-Policy") ?? "";
    for (const feat of [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "browsing-topics=()",
    ]) {
      expect(pp).toContain(feat);
    }
  });

  it("quita X-Powered-By", () => {
    expect(htaccess).toMatch(/Header always unset X-Powered-By/);
  });
});

describe("CSP", () => {
  it("la aplicada trae el minimo que no puede romper el sitio", () => {
    const csp = headerValue("Content-Security-Policy") ?? "";
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("form-action 'self'");
  });

  it("la aplicada no restringe scripts todavia, para no romper Next", () => {
    expect(headerValue("Content-Security-Policy")).not.toContain("script-src");
  });

  it("la de solo-reporte ya contempla GTM", () => {
    const ro = headerValue("Content-Security-Policy-Report-Only") ?? "";
    expect(ro).toContain("https://www.googletagmanager.com");
    expect(ro).toContain("default-src 'self'");
    expect(ro).toContain("frame-ancestors 'none'");
  });

  it("la de solo-reporte sirve las fuentes desde el propio dominio", () => {
    expect(headerValue("Content-Security-Policy-Report-Only")).toContain("font-src 'self'");
  });
});

describe("reglas que ya existian", () => {
  it("sigue exenta /.well-known/, que es por donde renueva el certificado", () => {
    expect(htaccess).toContain("RewriteCond %{REQUEST_URI} ^/\\.well-known/ [NC]");
  });

  it("sigue el 404 propio y la redireccion al dominio canonico", () => {
    expect(htaccess).toContain("ErrorDocument 404 /404.html");
    expect(htaccess).toContain("RewriteRule ^(.*)$ https://panalab.mx/$1 [R=301,L]");
  });
});
