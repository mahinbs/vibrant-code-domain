const MAIN_NEW_UI_HOSTS = new Set([
  "www.boostmysites.com",
  "localhost",
  "127.0.0.1",
  "::1",
]);

export const isMainNewUiHost = (hostname: string): boolean => {
  return MAIN_NEW_UI_HOSTS.has(hostname.toLowerCase());
};

/** Fintech / healthcare redesign landings: production hosts, or any host in Vite dev (LAN, etc.). */
export const shouldUseRedesignIndustryLanding = (hostname: string): boolean => {
  if (isMainNewUiHost(hostname)) return true;
  if (import.meta.env.DEV) return true;
  return false;
};

export const shouldUseNewUiForRoute = (
  pathname: string,
  hostname: string,
): boolean => {
  if (!isMainNewUiHost(hostname)) {
    return false;
  }

  if (pathname === "/" || pathname === "/work") {
    return true;
  }

  return pathname.startsWith("/work/");
};
