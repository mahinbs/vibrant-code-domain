import { useEffect } from "react";
import { RedesignHomePage } from "../RedesignHomePage";

/**
 * Hidden, link-only copy of the main automation landing page.
 * Same content as "/", but unlisted (not in nav/footer/sitemap) and marked
 * noindex so it doesn't compete with the homepage for search.
 */
export default function LandingCopy() {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    meta.setAttribute("data-lp-noindex", "true");
    document.head.appendChild(meta);
    return () => {
      document.querySelectorAll('meta[data-lp-noindex="true"]').forEach((m) => m.remove());
    };
  }, []);

  return <RedesignHomePage />;
}
