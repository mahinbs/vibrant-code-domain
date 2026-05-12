/**
 * Preferred production origin for canonical URLs.
 * Set VITE_CANONICAL_ORIGIN in .env when needed (no trailing slash).
 */
export const CANONICAL_ORIGIN = (
  (import.meta.env.VITE_CANONICAL_ORIGIN as string | undefined)?.replace(
    /\/+$/,
    "",
  ) || "https://www.boostmysites.com"
);

/** Build absolute canonical URL for a client pathname (React Router). */
export function canonicalUrlForPathname(pathname: string): string {
  const raw = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const trimmed = raw.replace(/\/+$/, "") || "/";
  if (trimmed === "/") {
    return `${CANONICAL_ORIGIN}/`;
  }
  return `${CANONICAL_ORIGIN}${trimmed}`;
}
