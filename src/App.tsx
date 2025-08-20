
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import CaseStudy from "./pages/CaseStudy";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import BlogsPage from "./pages/BlogsPage";
import BlogPostPage from "./pages/BlogPostPage";
import ServicesPage from "./pages/ServicesPage";
import WebAppsPage from "./pages/WebAppsPage";
import MobileAppsPage from "./pages/MobileAppsPage";
import UxuiDesignPage from "./pages/UxuiDesignPage";
import SaasPage from "./pages/SaasPage";
import AiDevelopmentPage from "./pages/AiDevelopmentPage";
import GameDevelopmentPage from "./pages/GameDevelopmentPage";
import ArVrDevelopmentPage from "./pages/ArVrDevelopmentPage";
import BlockchainDevelopmentPage from "./pages/BlockchainDevelopmentPage";
import IotDevelopmentPage from "./pages/IotDevelopmentPage";
import DataAnalyticsPage from "./pages/DataAnalyticsPage";
import CloudComputingPage from "./pages/CloudComputingPage";
import ChatbotDevelopmentPage from "./pages/ChatbotDevelopmentPage";
import AiAutomationPage from "./pages/AiAutomationPage";
import ReviewsPage from "./pages/ReviewsPage";
import ThankYouPage from "./pages/ThankYouPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CustomerInquiries from "./pages/admin/CustomerInquiries";
import TrialLeads from "./pages/admin/TrialLeads";
import PortfolioList from "./pages/admin/PortfolioList";
import PortfolioForm from "./pages/admin/PortfolioForm";
import CaseStudyList from "./pages/admin/CaseStudyList";
import BlogList from "./pages/admin/BlogList";
import BlogForm from "./pages/admin/BlogForm";
import { LinkGenerator } from "./pages/admin/LinkGenerator";
import WebinarManagement from "./pages/admin/WebinarManagement";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import PartnershipPage from "./pages/PartnershipPage";
import AiFreelancingPage from "./pages/AiFreelancingPage";
import AiFreelancingThankYouPage from "./pages/AiFreelancingThankYouPage";
import AiCallingPage from "./pages/AiCallingPage";
import SalespersonServicePage from "./pages/SalespersonServicePage";
import WebinarPage from "./pages/WebinarPage";
import GoogleAnalytics from "./components/GoogleAnalytics";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <GoogleAnalytics />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/case-study/:slug" element={<CaseStudy />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/web-apps" element={<WebAppsPage />} />
              <Route path="/mobile-apps" element={<MobileAppsPage />} />
              <Route path="/ux-ui-design" element={<UxuiDesignPage />} />
              <Route path="/saas" element={<SaasPage />} />
              <Route path="/ai-development" element={<AiDevelopmentPage />} />
              <Route path="/game-development" element={<GameDevelopmentPage />} />
              <Route path="/ar-vr-development" element={<ArVrDevelopmentPage />} />
              <Route path="/blockchain-development" element={<BlockchainDevelopmentPage />} />
              <Route path="/iot-development" element={<IotDevelopmentPage />} />
              <Route path="/data-analytics" element={<DataAnalyticsPage />} />
              <Route path="/cloud-computing" element={<CloudComputingPage />} />
              <Route path="/chatbot-development" element={<ChatbotDevelopmentPage />} />
              <Route path="/ai-automation" element={<AiAutomationPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/partnership" element={<PartnershipPage />} />
              <Route path="/ai-freelancing" element={<AiFreelancingPage />} />
              <Route path="/ai-freelancing/thank-you" element={<AiFreelancingThankYouPage />} />
              <Route path="/ai-calling" element={<AiCallingPage />} />
              <Route path="/salesperson/:id" element={<SalespersonServicePage />} />
              <Route path="/webinar/:id" element={<WebinarPage />} />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/customer-inquiries" 
                element={
                  <ProtectedRoute>
                    <CustomerInquiries />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/trial-leads" 
                element={
                  <ProtectedRoute>
                    <TrialLeads />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/portfolio" 
                element={
                  <ProtectedRoute>
                    <PortfolioList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/portfolio/new" 
                element={
                  <ProtectedRoute>
                    <PortfolioForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/portfolio/edit/:id" 
                element={
                  <ProtectedRoute>
                    <PortfolioForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/case-studies" 
                element={
                  <ProtectedRoute>
                    <CaseStudyList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/blogs" 
                element={
                  <ProtectedRoute>
                    <BlogList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/blogs/new" 
                element={
                  <ProtectedRoute>
                    <BlogForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/blogs/edit/:id" 
                element={
                  <ProtectedRoute>
                    <BlogForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/link-generator" 
                element={
                  <ProtectedRoute>
                    <LinkGenerator />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/webinar-management" 
                element={
                  <ProtectedRoute>
                    <WebinarManagement />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
