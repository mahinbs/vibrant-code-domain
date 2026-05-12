import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GOOGLE_ANALYTICS_MEASUREMENT_ID = 'G-6RG271FTBN';
const GOOGLE_ADS_MEASUREMENT_ID = 'AW-10794572231';

// This component ensures Google Analytics events are fired on route changes
const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const isPreview = /(^|\.)lovable\.app$/i.test(window.location.hostname);
    if (isPreview) return;

    // This ensures the gtag function is available
    if (typeof window.gtag === 'function') {
      // Send pageview with the page's path and title to GA4.
      window.gtag('config', GOOGLE_ANALYTICS_MEASUREMENT_ID, {
        page_path: location.pathname + location.search
      });

      // Keep existing Google Ads destination tracking in sync.
      window.gtag('config', GOOGLE_ADS_MEASUREMENT_ID, {
        page_path: location.pathname + location.search
      });
    }
  }, [location]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;

// Add this to global.d.ts or a similar declaration file if needed
declare global {
  interface Window {
    gtag: (
      command: string,
      target: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}