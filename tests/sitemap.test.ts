import { describe, expect, it, vi } from "vitest";
import { PRODUCTS, UNIVERSES } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("robots.txt", () => {
  it("permite todo y apunta al sitemap del dominio canonico", () => {
    const r = robots();
    expect(r.rules).toMatchObject({ userAgent: "*", allow: "/" });
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(r.host).toBe(SITE_URL);
  });
});

describe("sitemap.xml", () => {
  const urls = sitemap().map((e) => e.url);

  it("incluye todos los productos y universos", () => {
    expect(urls.length).toBeGreaterThan(40);
    for (const p of PRODUCTS) {
      expect(urls, p.slug).toContain(`${SITE_URL}/productos/${p.slug}/`);
    }
    for (const u of UNIVERSES) {
      expect(urls, u.slug).toContain(`${SITE_URL}/universos/${u.slug}/`);
    }
  });

  it("todas las URLs son absolutas al dominio canonico y terminan en barra", () => {
    for (const url of urls) {
      expect(url.startsWith(`${SITE_URL}/`), url).toBe(true);
      expect(url.endsWith("/"), url).toBe(true);
    }
  });

  it("no repite ninguna URL", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("deja fuera Derma Finder mientras esta apagado", () => {
    expect(urls.some((u) => u.includes("derma-finder"))).toBe(false);
  });

  it("no lista las paginas de error", () => {
    expect(urls.some((u) => u.includes("404") || u.includes("not-found"))).toBe(false);
  });

  it("lo incluye cuando el directorio esta en demo", async () => {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_DERMA_FINDER_MODE", "demo");
    const { default: demoSitemap } = await import("@/app/sitemap");
    const demoUrls = demoSitemap().map((e) => e.url);
    expect(demoUrls).toContain(`${SITE_URL}/derma-finder/`);
    vi.unstubAllEnvs();
    vi.resetModules();
  });
});
