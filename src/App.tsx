import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import EnhancedIndex from "./pages/EnhancedIndex";
import Portfolio from "./pages/Portfolio";
import CaseStudy from "./pages/CaseStudy";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
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
import TermsAndConditions from "./pages/TermsAndConditions";
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
import AppIdeasLabPage from "./pages/AppIdeasLabPage";
import GoogleAnalytics from "./components/GoogleAnalytics";
import FloatingWhatsAppButton from "./components/ui/FloatingWhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import ProjectsShowcase from "./pages/ProjectsShowcase";
import AppIdeas from "./pages/AppIdeas";
import AppIdeaDetail from "./pages/AppIdeaDetail";
import Signup from "./pages/Signup";
import TechCompanyLanding from "./pages/landingPages/TechCompanyLanding";
import StartupLanding from "./pages/landingPages/StartupLanding";
import AiStockPrediction from "./pages/landingPages/AiStockPrediction";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <GoogleAnalytics />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <FloatingWhatsAppButton /> <EnhancedIndex />
                  </>
                }
              />
              <Route
                path="/portfolio"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <Portfolio />
                  </>
                }
              />
              <Route
                path="/case-study/:slug"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <CaseStudy />
                  </>
                }
              />
              <Route
                path="/contact"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <ContactPage />
                  </>
                }
              />
              {/* <Route
                path="innovation-lab"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <ProjectsShowcase />
                  </>
                }
              /> */}
              <Route
                path="/about"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <AboutPage />
                  </>
                }
              />
              <Route
                path="/blogs"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <BlogsPage />
                  </>
                }
              />
              <Route
                path="/blog/:slug"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <BlogPostPage />
                  </>
                }
              />
              <Route
                path="/services"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <ServicesPage />
                  </>
                }
              />
              <Route
                path="/web-apps"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <WebAppsPage />
                  </>
                }
              />
              <Route
                path="/mobile-apps"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <MobileAppsPage />
                  </>
                }
              />
              <Route
                path="/ux-ui-design"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <UxuiDesignPage />
                  </>
                }
              />
              <Route
                path="/saas"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <SaasPage />
                  </>
                }
              />
              <Route
                path="/ai-development"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <AiDevelopmentPage />
                  </>
                }
              />
              <Route
                path="/game-development"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <GameDevelopmentPage />
                  </>
                }
              />
              <Route
                path="/ar-vr-development"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <ArVrDevelopmentPage />
                  </>
                }
              />
              <Route
                path="/blockchain-development"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <BlockchainDevelopmentPage />
                  </>
                }
              />
              <Route
                path="/iot-development"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <IotDevelopmentPage />
                  </>
                }
              />
              <Route
                path="/data-analytics"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <DataAnalyticsPage />
                  </>
                }
              />
              <Route
                path="/cloud-computing"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <CloudComputingPage />
                  </>
                }
              />
              <Route
                path="/chatbot-development"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <ChatbotDevelopmentPage />
                  </>
                }
              />
              <Route
                path="/ai-automation"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <AiAutomationPage />
                  </>
                }
              />
              <Route
                path="/reviews"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <ReviewsPage />
                  </>
                }
              />
              <Route
                path="/thank-you"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <ThankYouPage />
                  </>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <PrivacyPolicyPage />
                  </>
                }
              />
              <Route
                path="/terms-and-conditions"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <TermsAndConditions />
                  </>
                }
              />
              <Route
                path="/index.php/aie-termsconditions"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <TermsAndConditions />
                  </>
                }
              />
              <Route
                path="/partnership"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <PartnershipPage />
                  </>
                }
              />
              <Route
                path="/ai-freelancing"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <AiFreelancingPage />
                  </>
                }
              />
              <Route
                path="/ai-freelancing/thank-you"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <AiFreelancingThankYouPage />
                  </>
                }
              />
              <Route
                path="/ai-calling"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <AiCallingPage />
                  </>
                }
              />
              <Route
                path="/salesperson/:id"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <SalespersonServicePage />
                  </>
                }
              />
              <Route
                path="/webinar/:id"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <WebinarPage />
                  </>
                }
              />
              <Route
                path="/app-ideas-lab"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <AppIdeasLabPage />
                  </>
                }
              />
              <Route
                path="/app-ideas"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <AppIdeas />
                  </>
                }
              />
              <Route
                path="/app-ideas/product/:id"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <AppIdeaDetail />
                  </>
                }
              />
              <Route
                path="/signup"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <Signup />
                  </>
                }
              />

              <Route
                path="/build-your-tech-company"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <TechCompanyLanding />
                  </>
                }
              />

              <Route
                path="/startup-launch"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <StartupLanding />
                  </>
                }
              />

              <Route
                path="/ai-stock-prediction"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <AiStockPrediction />
                  </>
                }
              />

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
              {/* <Route 
                path="/admin/link-generator" 
                element={
                  <ProtectedRoute>
                    <LinkGenerator />
                  </ProtectedRoute>
                } 
              /> */}
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
