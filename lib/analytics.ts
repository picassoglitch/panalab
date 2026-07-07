type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export function buildUtmUrl(
  baseUrl: string,
  opts: { channel: string; product?: string; campaign?: string }
) {
  const url = new URL(baseUrl);
  url.searchParams.set("utm_source", "panalab_web");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", opts.campaign ?? "landing_2026");
  url.searchParams.set("utm_content", opts.channel);
  if (opts.product) url.searchParams.set("utm_term", opts.product);
  return url.toString();
}
