import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GOOGLE_ANALYTICS_MEASUREMENT_ID = 'G-6RG271FTBN';

/**
 * Fires route-level analytics and pushes `virtualPageView` to
 * `dataLayer` so GTM tags (e.g. Google tag, GA4 via GTM) can use a Custom Event
 * trigger or History Change; SPAs otherwise only get the first-load "All Pages" hit.
 */
const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const isPreview = /(^|\.)lovable\.app$/i.test(window.location.hostname);
    if (isPreview) return;

    const pagePath = location.pathname + location.search;

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        send_to: GOOGLE_ANALYTICS_MEASUREMENT_ID,
        page_location: window.location.href,
        page_path: pagePath,
        page_title: document.title,
      });
    }

    const id = window.setTimeout(() => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'virtualPageView',
        page_location: window.location.href,
        page_path: pagePath,
        page_title: document.title,
      });
    }, 0);

    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);

  return null;
};

export default GoogleAnalytics;

// Add this to global.d.ts or a similar declaration file if needed
declare global {
  type GtagConfig = Record<string, unknown>;
  type DataLayerEvent = Record<string, unknown>;

  interface Window {
    gtag: (
      command: string,
      target: string,
      config?: GtagConfig
    ) => void;
    dataLayer: DataLayerEvent[];
  }
}