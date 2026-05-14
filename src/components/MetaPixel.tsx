import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const MetaPixel = () => {
  const location = useLocation();
  const isFirstRoute = useRef(true);

  useEffect(() => {
    const isPreview = /(^|\.)lovable\.app$/i.test(window.location.hostname);
    if (isPreview) return;
    if (typeof window.fbq !== "function") return;

    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }

    window.fbq("track", "PageView");
  }, [location.pathname, location.search]);

  return null;
};

export default MetaPixel;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
