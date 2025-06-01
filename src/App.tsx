
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load all page components for code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WebAppsPage = lazy(() => import("./pages/WebAppsPage"));
const SaasPage = lazy(() => import("./pages/SaasPage"));
const MobileAppsPage = lazy(() => import("./pages/MobileAppsPage"));
const AiCallingPage = lazy(() => import("./pages/AiCallingPage"));
const AiAutomationPage = lazy(() => import("./pages/AiAutomationPage"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));

// Optimized query client configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback component with performance optimization
const PageSkeleton = () => (
  <div className="min-h-screen bg-black" style={{ contain: 'layout style paint' }}>
    <div className="container mx-auto px-6 py-20">
      <Skeleton className="h-12 w-64 mb-8" />
      <Skeleton className="h-8 w-full mb-4" />
      <Skeleton className="h-8 w-3/4 mb-4" />
      <Skeleton className="h-64 w-full mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    </div>
  </div>
);

const App = () => {
  useEffect(() => {
    // Global performance optimizations
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      * {
        scroll-behavior: auto !important;
      }
      
      .gpu-accelerate {
        transform: translateZ(0);
        will-change: auto;
        backface-visibility: hidden;
        perspective: 1000px;
      }
      
      .prevent-layout-shift {
        contain: layout style paint;
        content-visibility: auto;
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageSkeleton />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/web-apps" element={<WebAppsPage />} />
              <Route path="/saas" element={<SaasPage />} />
              <Route path="/mobile-apps" element={<MobileAppsPage />} />
              <Route path="/ai-calling" element={<AiCallingPage />} />
              <Route path="/ai-automation" element={<AiAutomationPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
