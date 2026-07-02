import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackMetaConversion } from "@/lib/analytics/metaConversion";
import { isMetaCapiPagePath } from "@/lib/analytics/metaScope";

const MetaPixel = () => {
  const location = useLocation();
  const isFirstRoute = useRef(true);

  useEffect(() => {
    const isPreview = /(^|\.)lovable\.app$/i.test(window.location.hostname);
    if (isPreview) return;

    const scoped = isMetaCapiPagePath(location.pathname);
    const url = window.location.href;

    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      if (scoped) {
        // index.html already fired Pixel PageView; add CAPI with matching event_id path.
        trackMetaConversion({ eventName: "PageView", eventSourceUrl: url, skipPixel: true });
      }
      return;
    }

    if (typeof window.fbq !== "function" && !scoped) return;

    if (scoped) {
      trackMetaConversion({ eventName: "PageView", eventSourceUrl: url });
      return;
    }

    window.fbq("track", "PageView");
  }, [location.pathname, location.search]);

  return null;
};

export default MetaPixel;
