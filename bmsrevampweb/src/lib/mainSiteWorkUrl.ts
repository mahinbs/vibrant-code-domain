/**
 * Helpers for linking from the redesign (this Vite project, served on a
 * different port during local development and embedded in `/new-homepage-preview`
 * via an iframe) to the new `/work` route on the main app.
 *
 * - `MAIN_APP_ORIGIN` is taken from `VITE_MAIN_APP_ORIGIN` and falls back to the
 *   main app's local dev origin (port 8080) so the parent window is targeted
 *   correctly when this project runs inside the iframe.
 * - In production both projects ship to the same origin, so the env var should
 *   be set to that origin (or simply left empty to always use the parent's
 *   `window.location.origin`).
 */

const FALLBACK_ORIGIN = "http://localhost:8080";

function readEnvOrigin(): string {
  const raw = (import.meta.env.VITE_MAIN_APP_ORIGIN as string | undefined)?.trim();
  return raw && raw.length > 0 ? raw.replace(/\/$/, "") : "";
}

/**
 * Returns the absolute origin of the main app. Prefers an env-supplied origin,
 * then the iframe's parent origin (when accessible), then a sensible fallback.
 */
export function getMainAppOrigin(): string {
  const fromEnv = readEnvOrigin();
  if (fromEnv) return fromEnv;
  if (typeof window !== "undefined") {
    try {
      const ref = window.parent?.location?.origin;
      if (ref && ref !== window.location.origin) return ref;
    } catch {
      // cross-origin parent; fall through to default
    }
  }
  return FALLBACK_ORIGIN;
}

/**
 * Build a deep link to `/work` that, when clicked from inside the
 * `/new-homepage-preview` iframe, navigates the parent window (target=_top).
 *
 * Pass an empty `serviceId` (or omit it) to link to the un-focused listing.
 */
export function workUrl(serviceId?: string): string {
  const base = `${getMainAppOrigin()}/work`;
  if (!serviceId) return base;
  return `${base}?service=${encodeURIComponent(serviceId)}`;
}

/**
 * Build a deep link to an individual `/work/:slug` case-study page
 * on the main app (new design).
 */
export function workCaseStudyUrl(slug: string): string {
  return `${getMainAppOrigin()}/work/${encodeURIComponent(slug)}`;
}
