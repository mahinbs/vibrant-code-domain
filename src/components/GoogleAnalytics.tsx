import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component ensures Google Analytics events are fired on route changes
const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // This ensures the gtag function is available
    if (typeof window.gtag === 'function') {
      // Send pageview with the page's path and title
      window.gtag('config', 'AW-10794572231', {
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