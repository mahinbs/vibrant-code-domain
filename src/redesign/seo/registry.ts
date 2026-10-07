import type { SeoPageData, SeoPageKind } from "./types";
import { servicePages } from "./content/services";
import { industryPages } from "./content/industries";
import { locationPages } from "./content/locations";
import { comparisonPages } from "./content/comparisons";

export type HubKey = SeoPageKind;

type Hub = {
  /** Hub URL, e.g. "/services". */
  path: string;
  /** Breadcrumb / footer label. */
  label: string;
  pages: SeoPageData[];
};

export const HUBS: Record<HubKey, Hub> = {
  service: { path: "/services", label: "Services", pages: servicePages },
  industry: { path: "/industries", label: "Industries", pages: industryPages },
  location: { path: "/locations", label: "Locations", pages: locationPages },
  compare: { path: "/compare", label: "Comparisons", pages: comparisonPages },
};

export const pagePath = (p: Pick<SeoPageData, "kind" | "slug">) => `${HUBS[p.kind].path}/${p.slug}`;

/** Every data-driven page path (used by the sitemap generator via a regex over the content files, and by tests). */
export const allSeoPagePaths = (): string[] =>
  Object.values(HUBS).flatMap((h) => h.pages.map((p) => pagePath(p)));
