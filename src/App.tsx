
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

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
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

// Admin components
const AdminLogin = lazy(() => import("./components/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const PortfolioList = lazy(() => import("./pages/admin/PortfolioList"));
const PortfolioForm = lazy(() => import("./pages/admin/PortfolioForm"));
const BlogList = lazy(() => import("./pages/admin/BlogList"));
const BlogForm = lazy(() => import("./pages/admin/BlogForm"));
const CaseStudyList = lazy(() => import("./pages/admin/CaseStudyList"));

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

// Mobile-optimized loading fallback component
const PageSkeleton = () => (
  <div className="min-h-screen bg-black" style={{ contain: 'layout style paint' }}>
    <div className="container mx-auto mobile-container py-16 sm:py-20">
      <Skeleton className="h-8 sm:h-12 w-48 sm:w-64 mb-6 sm:mb-8" />
      <Skeleton className="h-6 sm:h-8 w-full mb-3 sm:mb-4" />
      <Skeleton className="h-6 sm:h-8 w-3/4 mb-3 sm:mb-4" />
      <Skeleton className="h-48 sm:h-64 w-full mb-6 sm:mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-32 sm:h-48 w-full" />
        ))}
      </div>
    </div>
  </div>
);

const App = () => {
  useEffect(() => {
    // Ensure proper viewport meta tag for mobile
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    } else {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Add mobile-optimized meta tags
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = '#000000';
      document.head.appendChild(meta);
    }

    // Optimize for mobile browsers
    const statusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    if (!statusBar) {
      const meta = document.createElement('meta');
      meta.name = 'apple-mobile-web-app-status-bar-style';
      meta.content = 'black-translucent';
      document.head.appendChild(meta);
    }

    // Global performance optimizations for mobile
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
      
      /* Mobile-specific optimizations */
      @media (max-width: 768px) {
        /* Prevent zoom on input focus */
        input, select, textarea {
          font-size: 16px !important;
        }
        
        /* Optimize touch events */
        * {
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Improve scroll performance */
        html, body {
          -webkit-overflow-scrolling: touch;
        }
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
          <div className="min-h-screen w-full overflow-x-hidden">
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/case-study/:projectId" element={<CaseStudy />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/blog/:blogId" element={<BlogPostPage />} />
                <Route path="/web-apps" element={<WebAppsPage />} />
                <Route path="/saas" element={<SaasPage />} />
                <Route path="/mobile-apps" element={<MobileAppsPage />} />
                <Route path="/ai-calling" element={<AiCallingPage />} />
                <Route path="/ai-automation" element={<AiAutomationPage />} />
                
                {/* Secure Admin routes */}
                <Route path="/secure-management-portal-x7k9/login" element={<AdminLogin />} />
                <Route path="/secure-management-portal-x7k9" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<AdminDashboard />} />
                  <Route path="portfolios" element={<PortfolioList />} />
                  <Route path="portfolios/new" element={<PortfolioForm />} />
                  <Route path="portfolios/edit/:id" element={<PortfolioForm />} />
                  <Route path="blogs" element={<BlogList />} />
                  <Route path="blogs/new" element={<BlogForm />} />
                  <Route path="blogs/edit/:id" element={<BlogForm />} />
                  <Route path="case-studies" element={<CaseStudyList />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
