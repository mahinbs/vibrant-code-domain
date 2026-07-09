const META_CONVERSION_SOURCE_PAGES = new Set([
  "business-automation",
  "homepage",
  "automation-score",
  "automation-case-studies",
]);

const META_CAPI_PAGE_PATHS = new Set([
  "/",
  "/business-automation",
  "/automation-score",
  "/automation-case-studies",
]);

export function isMetaConversionSourcePage(sourcePage: string): boolean {
  return META_CONVERSION_SOURCE_PAGES.has(sourcePage);
}

export function isMetaCapiPagePath(pathname: string): boolean {
  return META_CAPI_PAGE_PATHS.has(pathname);
}
