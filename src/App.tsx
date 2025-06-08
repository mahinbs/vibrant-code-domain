
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import CaseStudy from "./pages/CaseStudy";
import BlogsPage from "./pages/BlogsPage";
import BlogPostPage from "./pages/BlogPostPage";
import WebAppsPage from "./pages/WebAppsPage";
import MobileAppsPage from "./pages/MobileAppsPage";
import SaasPage from "./pages/SaasPage";
import AiAutomationPage from "./pages/AiAutomationPage";
import AiCallingPage from "./pages/AiCallingPage";
import ReviewsPage from "./pages/ReviewsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PortfolioForm from "./pages/admin/PortfolioForm";
import PortfolioList from "./pages/admin/PortfolioList";
import CaseStudyList from "./pages/admin/CaseStudyList";
import BlogForm from "./pages/admin/BlogForm";
import BlogList from "./pages/admin/BlogList";
import CustomerInquiries from "./pages/admin/CustomerInquiries";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/web-apps" element={<WebAppsPage />} />
          <Route path="/mobile-apps" element={<MobileAppsPage />} />
          <Route path="/saas" element={<SaasPage />} />
          <Route path="/ai-automation" element={<AiAutomationPage />} />
          <Route path="/ai-calling" element={<AiCallingPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/customer-inquiries" element={<ProtectedRoute><CustomerInquiries /></ProtectedRoute>} />
          <Route path="/admin/portfolio" element={<ProtectedRoute><PortfolioList /></ProtectedRoute>} />
          <Route path="/admin/portfolio/new" element={<ProtectedRoute><PortfolioForm /></ProtectedRoute>} />
          <Route path="/admin/portfolio/edit/:id" element={<ProtectedRoute><PortfolioForm /></ProtectedRoute>} />
          <Route path="/admin/case-studies" element={<ProtectedRoute><CaseStudyList /></ProtectedRoute>} />
          <Route path="/admin/blogs" element={<ProtectedRoute><BlogList /></ProtectedRoute>} />
          <Route path="/admin/blogs/new" element={<ProtectedRoute><BlogForm /></ProtectedRoute>} />
          <Route path="/admin/blogs/edit/:id" element={<ProtectedRoute><BlogForm /></ProtectedRoute>} />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
