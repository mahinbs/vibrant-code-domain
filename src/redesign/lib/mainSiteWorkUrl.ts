/**
 * Same-origin path helpers for `/work` deep links inside the redesign tree.
 * The redesign now renders natively in the parent React app, so these are
 * relative paths that the parent's <BrowserRouter> handles directly.
 */

export function workUrl(serviceId?: string): string {
  if (!serviceId) return "/work";
  return `/work?service=${encodeURIComponent(serviceId)}`;
}

export function workCaseStudyUrl(slug: string): string {
  return `/work/${encodeURIComponent(slug)}`;
}
