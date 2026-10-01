import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isLeadCaptureEnabled, submitLead } from "@/lib/leads";

const ENDPOINT = "https://formularios.example.invalid/f/fixture";

function okResponse(status = 200) {
  return { ok: status >= 200 && status < 300, status } as Response;
}

describe("submitLead()", () => {
  it("un 200 cuenta como exito", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(okResponse(200));
    const res = await submitLead({
      email: "alguien@example.invalid",
      source: "home",
      consentText: "Acepto",
      endpoint: ENDPOINT,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    expect(res).toEqual({ ok: true });
    expect(fetchImpl).toHaveBeenCalledOnce();
  });

  it("manda el consentimiento con su texto y su fecha", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(okResponse(200));
    await submitLead({
      email: "alguien@example.invalid",
      source: "reto28",
      consentText: "Acepto recibir comunicaciones",
      endpoint: ENDPOINT,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    const body = JSON.parse(fetchImpl.mock.calls[0][1].body);
    expect(body.consent).toBe(true);
    expect(body.consentText).toBe("Acepto recibir comunicaciones");
    expect(body.source).toBe("reto28");
    expect(body.email).toBe("alguien@example.invalid");
    expect(Date.parse(body.consentAt)).not.toBeNaN();
    expect(body).toHaveProperty("_gotcha", "");
  });

  it("pide respuesta JSON al proveedor", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(okResponse(200));
    await submitLead({
      email: "a@b.invalid",
      source: "home",
      consentText: "Acepto",
      endpoint: ENDPOINT,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    expect(fetchImpl.mock.calls[0][1].headers.Accept).toBe("application/json");
  });

  it("422 y 500 no son exito", async () => {
    for (const status of [422, 500]) {
      const fetchImpl = vi.fn().mockResolvedValue(okResponse(status));
      const res = await submitLead({
        email: "a@b.invalid",
        source: "home",
        consentText: "Acepto",
        endpoint: ENDPOINT,
        fetchImpl: fetchImpl as unknown as typeof fetch,
      });
      expect(res).toEqual({ ok: false, reason: `http-${status}` });
    }
  });

  it("un fallo de red tampoco", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
    const res = await submitLead({
      email: "a@b.invalid",
      source: "home",
      consentText: "Acepto",
      endpoint: ENDPOINT,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    expect(res).toEqual({ ok: false, reason: "red" });
  });

  it("si el proveedor se cuelga, corta por timeout", async () => {
    const abortError = new Error("aborted");
    abortError.name = "AbortError";
    const fetchImpl = vi.fn().mockRejectedValue(abortError);
    const res = await submitLead({
      email: "a@b.invalid",
      source: "home",
      consentText: "Acepto",
      endpoint: ENDPOINT,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    expect(res).toEqual({ ok: false, reason: "timeout" });
  });

  it("sin endpoint no intenta nada", async () => {
    const fetchImpl = vi.fn();
    const res = await submitLead({
      email: "a@b.invalid",
      source: "home",
      consentText: "Acepto",
      endpoint: "",
      fetchImpl: fetchImpl as unknown as typeof fetch,
    });
    expect(res).toEqual({ ok: false, reason: "sin-endpoint" });
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});

describe("isLeadCaptureEnabled()", () => {
  it("solo con una URL de verdad", () => {
    expect(isLeadCaptureEnabled(ENDPOINT)).toBe(true);
    expect(isLeadCaptureEnabled("")).toBe(false);
    expect(isLeadCaptureEnabled("   ")).toBe(false);
  });
});

describe("<Newsletter />", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
    vi.restoreAllMocks();
  });

  async function load(endpoint?: string) {
    vi.resetModules();
    vi.stubEnv("NEXT_PUBLIC_LEAD_ENDPOINT", endpoint ?? "");
    const mod = await import("@/components/Newsletter");
    return mod.default;
  }

  it("sin endpoint no pinta formulario, para no pedir un correo que se perderia", async () => {
    const Newsletter = await load();
    render(<Newsletter source="home" />);
    expect(screen.getByText(/Muy pronto podrás suscribirte/i)).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  describe("con endpoint", () => {
    beforeEach(() => {
      window.dataLayer = [];
    });

    it("el campo de correo tiene etiqueta", async () => {
      const Newsletter = await load(ENDPOINT);
      render(<Newsletter source="home" />);
      expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    });

    it("el consentimiento enlaza al aviso de privacidad", async () => {
      const Newsletter = await load(ENDPOINT);
      render(<Newsletter source="home" />);
      const link = screen.getByRole("link", { name: /aviso de privacidad/i });
      expect(link.getAttribute("href")).toMatch(/^\/aviso-de-privacidad\/?$/);
    });

    it("solo dice que quedo registrado despues de un 2xx", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(okResponse(200)));
      const Newsletter = await load(ENDPOINT);
      render(<Newsletter source="home" />);

      await userEvent.type(
        screen.getByLabelText(/Correo electrónico/i),
        "alguien@example.invalid",
      );
      await userEvent.click(screen.getByRole("checkbox"));
      await userEvent.click(screen.getByRole("button", { name: /Suscribirme/i }));

      await waitFor(() =>
        expect(screen.getByText(/Revisa tu correo/i)).toBeInTheDocument(),
      );
    });

    it("ante un 500 muestra error y no finge exito", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(okResponse(500)));
      const Newsletter = await load(ENDPOINT);
      render(<Newsletter source="home" />);

      await userEvent.type(
        screen.getByLabelText(/Correo electrónico/i),
        "alguien@example.invalid",
      );
      await userEvent.click(screen.getByRole("checkbox"));
      await userEvent.click(screen.getByRole("button", { name: /Suscribirme/i }));

      await waitFor(() =>
        expect(screen.getByText(/No pudimos registrar tu correo/i)).toBeInTheDocument(),
      );
      expect(screen.queryByText(/Revisa tu correo/i)).toBeNull();
    });

    it("el dataLayer nunca recibe el correo", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(okResponse(200)));
      const Newsletter = await load(ENDPOINT);
      render(<Newsletter source="home" />);

      await userEvent.type(
        screen.getByLabelText(/Correo electrónico/i),
        "alguien@example.invalid",
      );
      await userEvent.click(screen.getByRole("checkbox"));
      await userEvent.click(screen.getByRole("button", { name: /Suscribirme/i }));

      await waitFor(() => expect(window.dataLayer?.length).toBeGreaterThan(0));
      expect(JSON.stringify(window.dataLayer)).not.toContain("@");
    });

    it("no se dispara lead_submit si el envio fallo", async () => {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(okResponse(500)));
      const Newsletter = await load(ENDPOINT);
      render(<Newsletter source="home" />);

      await userEvent.type(
        screen.getByLabelText(/Correo electrónico/i),
        "alguien@example.invalid",
      );
      await userEvent.click(screen.getByRole("checkbox"));
      await userEvent.click(screen.getByRole("button", { name: /Suscribirme/i }));

      await waitFor(() => expect(window.dataLayer?.length).toBeGreaterThan(0));
      const events = (window.dataLayer ?? []).map((e) => e.event);
      expect(events).toContain("lead_error");
      expect(events).not.toContain("lead_submit");
    });
  });
});
