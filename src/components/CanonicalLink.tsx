import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { canonicalUrlForPathname } from "@/lib/siteCanonical";

/** One site-wide canonical per route; skips admin (noindex-style isolation). */
const CanonicalLink = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) {
    return null;
  }
  const href = canonicalUrlForPathname(pathname);
  return (
    <Helmet>
      <link rel="canonical" href={href} />
    </Helmet>
  );
};

export default CanonicalLink;
