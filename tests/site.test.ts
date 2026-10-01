import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SITE_URL, canonical } from "@/lib/site";

describe("SITE_URL", () => {
  it("es el dominio canonico, sin www y sin barra final", () => {
    expect(SITE_URL).toBe("https://panalab.mx");
  });
});

describe("canonical()", () => {
  it("deja la raiz como /", () => {
    expect(canonical("/")).toBe("/");
    expect(canonical("")).toBe("/");
  });

  it("agrega la barra final que espera trailingSlash", () => {
    expect(canonical("/donde-comprar")).toBe("/donde-comprar/");
    expect(canonical("/productos/aminoter-mask")).toBe("/productos/aminoter-mask/");
  });

  it("no duplica la barra si ya venia", () => {
    expect(canonical("/historias/")).toBe("/historias/");
  });

  it("normaliza una ruta sin barra inicial", () => {
    expect(canonical("profesionales")).toBe("/profesionales/");
  });
});

describe("noindex fuera del dominio canonico", () => {
  it("Apache marca cualquier otro host", () => {
    const htaccess = readFileSync("public/.htaccess", "utf8");
    const line = htaccess.split("\n").find((l) => l.includes("X-Robots-Tag"));
    expect(line).toBeDefined();
    expect(line).toContain("noindex, nofollow");
    expect(line).toContain("%{HTTP_HOST} != 'panalab.mx'");
    expect(line).toContain("always");
  });

  it("la rama de Vercel manda noindex cuando el host no es el canonico", () => {
    const cfg = readFileSync("next.config.ts", "utf8");
    expect(cfg).toContain("async headers()");
    expect(cfg).toContain('missing: [{ type: "host", value: "panalab.mx" }]');
    expect(cfg).toContain('value: "noindex, nofollow"');
  });

  it("headers() no se define en la rama del export estatico", () => {
    const cfg = readFileSync("next.config.ts", "utf8");
    // `output: "export"` no soporta headers(); si se colara ahi, el build
    // avisaria y la cabecera no se aplicaria de todos modos.
    const staticBranch = cfg.slice(
      cfg.indexOf('output: "export"'),
      cfg.indexOf("images: { unoptimized: true }"),
    );
    expect(staticBranch).not.toContain("headers()");
  });
});
