import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

type TwqFn = (...args: unknown[]) => void;

/** Fires X PageView on SPA route changes (base tag in index.html handles first load). */
const XPixel = () => {
  const location = useLocation();
  const isFirstRoute = useRef(true);

  useEffect(() => {
    const isPreview = /(^|\.)lovable\.app$/i.test(window.location.hostname);
    if (isPreview) return;

    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }

    const twq = (window as unknown as { twq?: TwqFn }).twq;
    if (typeof twq !== "function") return;

    twq("track", "PageView");
  }, [location.pathname, location.search]);

  return null;
};

export default XPixel;
