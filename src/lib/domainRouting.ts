const MAIN_NEW_UI_HOSTS = new Set([
  "www.boostmysites.com",
  "localhost",
  "127.0.0.1",
]);

export const isMainNewUiHost = (hostname: string): boolean => {
  return MAIN_NEW_UI_HOSTS.has(hostname.toLowerCase());
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
