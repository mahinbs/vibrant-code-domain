import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import GoogleAnalytics from "./components/GoogleAnalytics";
import MetaPixel from "./components/MetaPixel";
import CanonicalLink from "./components/CanonicalLink";
import RouteMeta from "./components/RouteMeta";
import FloatingWhatsAppButton from "./components/ui/FloatingWhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import { RedesignShell } from "./redesign/RedesignShell";
import JsonLd from "./components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "./lib/seo/brand";
import { shouldUseNewUiForRoute, shouldUseRedesignIndustryLanding } from "./lib/domainRouting";

const Index = lazy(() => import("./pages/Index"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const WorkCaseStudyPage = lazy(() => import("./pages/WorkCaseStudyPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const BlogsPage = lazy(() => import("./pages/BlogsPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const WebAppsPage = lazy(() => import("./pages/WebAppsPage"));
const MobileAppsPage = lazy(() => import("./pages/MobileAppsPage"));
const UxuiDesignPage = lazy(() => import("./pages/UxuiDesignPage"));
const SaasPage = lazy(() => import("./pages/SaasPage"));
const AiDevelopmentPage = lazy(() => import("./pages/AiDevelopmentPage"));
const GameDevelopmentPage = lazy(() => import("./pages/GameDevelopmentPage"));
const ArVrDevelopmentPage = lazy(() => import("./pages/ArVrDevelopmentPage"));
const BlockchainDevelopmentPage = lazy(
  () => import("./pages/BlockchainDevelopmentPage")
);
const IotDevelopmentPage = lazy(() => import("./pages/IotDevelopmentPage"));
const DataAnalyticsPage = lazy(() => import("./pages/DataAnalyticsPage"));
const CloudComputingPage = lazy(() => import("./pages/CloudComputingPage"));
const ChatbotDevelopmentPage = lazy(
  () => import("./pages/ChatbotDevelopmentPage")
);
const AiAutomationPage = lazy(() => import("./pages/AiAutomationPage"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const ThankYouPage = lazy(() => import("./pages/ThankYouPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const PartnershipPage = lazy(() => import("./pages/PartnershipPage"));
const PlacementProgramsPage = lazy(
  () => import("./pages/PlacementProgramsPage")
);
const AiFreelancingPage = lazy(() => import("./pages/AiFreelancingPage"));
const AiFreelancingThankYouPage = lazy(
  () => import("./pages/AiFreelancingThankYouPage")
);
const AiCallingPage = lazy(() => import("./pages/AiCallingPage"));
const SalespersonServicePage = lazy(
  () => import("./pages/SalespersonServicePage")
);
const WebinarPage = lazy(() => import("./pages/WebinarPage"));
const AppIdeasLabPage = lazy(() => import("./pages/AppIdeasLabPage"));
const AppIdeas = lazy(() => import("./pages/AppIdeas"));
const AppIdeaDetail = lazy(() => import("./pages/AppIdeaDetail"));
const Signup = lazy(() => import("./pages/Signup"));
const StartupLanding = lazy(() => import("./pages/landingPages/StartupLanding"));
const AiStockPrediction = lazy(
  () => import("./pages/landingPages/AiStockPrediction")
);
const FintechLanding = lazy(() => import("./pages/landingPages/FintechLanding"));
const HealthcareLanding = lazy(
  () => import("./pages/landingPages/HealthcareLanding")
);
const ReshabLandingPage = lazy(
  () => import("./pages/landingPages/ReshabLandingPage")
);
const DarshanLandingPage = lazy(
  () => import("./pages/landingPages/DarshanLandingPage")
);
const KavyaLandingPage = lazy(
  () => import("./pages/landingPages/KavyaLandingPage")
);
const MahinLandingPage = lazy(
  () => import("./pages/landingPages/MahinLandingPage")
);
const MeghanaLandingPage = lazy(
  () => import("./pages/landingPages/MeghanaLandingPage")
);
const RedesignFintechLanding = lazy(
  () => import("./redesign/pages/FintechPortfolioLanding")
);
const RedesignHealthcareLanding = lazy(
  () => import("./redesign/pages/HealthcarePortfolioLanding")
);
const BuildYourTechCompanyLanding = lazy(
  () => import("./redesign/pages/BuildYourTechCompanyLanding"),
);
const FounderPartnershipApplication = lazy(
  () => import("./redesign/pages/FounderPartnershipApplication"),
);
const AutomationCaseStudy = lazy(
  () => import("./redesign/pages/AutomationCaseStudy"),
);
const NewHomepagePreview = lazy(() => import("./pages/NewHomepagePreview"));
const FintechDevelopmentCompanyPage = lazy(() => import("./pages/geo/FintechDevelopmentCompanyPage"));
const TradingAppDevelopmentPage = lazy(() => import("./pages/geo/TradingAppDevelopmentPage"));
const PayinPayoutSoftwarePage = lazy(() => import("./pages/geo/PayinPayoutSoftwarePage"));
const ForLlmPage = lazy(() => import("./pages/ForLlmPage"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CustomerInquiries = lazy(() => import("./pages/admin/CustomerInquiries"));
const ReshabLeads = lazy(() => import("./pages/admin/ReshabLeads"));
const TrialLeads = lazy(() => import("./pages/admin/TrialLeads"));
const PlacementProgramApplications = lazy(
  () => import("./pages/admin/PlacementProgramApplications")
);
const PortfolioList = lazy(() => import("./pages/admin/PortfolioList"));
const PortfolioForm = lazy(() => import("./pages/admin/PortfolioForm"));
const CaseStudyList = lazy(() => import("./pages/admin/CaseStudyList"));
const BlogList = lazy(() => import("./pages/admin/BlogList"));
const BlogForm = lazy(() => import("./pages/admin/BlogForm"));
const WebinarManagement = lazy(() => import("./pages/admin/WebinarManagement"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const useNewHomepageUi = shouldUseNewUiForRoute("/", hostname);
  const useNewWorkUi = shouldUseNewUiForRoute("/work", hostname);
  const useNewWorkCaseStudyUi = shouldUseNewUiForRoute("/work/sample", hostname);
  const useNewFintechLanding = shouldUseRedesignIndustryLanding(hostname);
  const useNewHealthcareLanding = useNewFintechLanding;

  const routeFallback = (
    <div className="min-h-[40vh] w-full bg-black" aria-hidden="true" />
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {/* Sitewide entity schema. Renders nothing visible — just JSON-LD for crawlers/LLMs. */}
          <JsonLd data={organizationJsonLd()} id="organization" />
          <JsonLd data={websiteJsonLd()} id="website" />
          <BrowserRouter>
            <ScrollToTop />
            <GoogleAnalytics />
            <MetaPixel />
            <CanonicalLink />
            <RouteMeta />
            <Suspense fallback={routeFallback}>
              <Routes>
              <Route
                path="/"
                element={
                  useNewHomepageUi ? (
                    <NewHomepagePreview />
                  ) : (
                    <>
                      <FloatingWhatsAppButton />
                      <Index />
                    </>
                  )
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
                path="/work"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    {useNewWorkUi ? <WorkPage /> : <Portfolio />}
                  </>
                }
              />
              <Route
                path="/work/:slug"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    {useNewWorkCaseStudyUi ? <WorkCaseStudyPage /> : <CaseStudy />}
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
              {/* Fintech authority pages (GEO Phase 1). New routes, additive only — do not rename. */}
              <Route
                path="/fintech-development-company"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <FintechDevelopmentCompanyPage />
                  </>
                }
              />
              <Route
                path="/trading-app-development"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <TradingAppDevelopmentPage />
                  </>
                }
              />
              <Route
                path="/payin-payout-software-development"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <PayinPayoutSoftwarePage />
                  </>
                }
              />
              <Route
                path="/for-llm"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <ForLlmPage />
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
                path="/placement-programs"
                element={<PlacementProgramsPage />}
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
                path="/:salesperson/:service"
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
                  <RedesignShell>
                    <BuildYourTechCompanyLanding />
                  </RedesignShell>
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

              <Route
                path="/fintech-founder"
                element={
                  <>
                    <FloatingWhatsAppButton />
                    <FintechLanding />
                  </>
                }
              />
              <Route
                path="/fintech-landing"
                element={
                  useNewFintechLanding ? (
                    <RedesignShell>
                      <RedesignFintechLanding />
                    </RedesignShell>
                  ) : (
                    <>
                      <FloatingWhatsAppButton />
                      <FintechLanding />
                    </>
                  )
                }
              />
              <Route
                path="/founder-partnership"
                element={
                  <RedesignShell>
                    <FounderPartnershipApplication />
                  </RedesignShell>
                }
              />
              <Route
                path="/automation/:slug"
                element={
                  <RedesignShell>
                    <AutomationCaseStudy />
                  </RedesignShell>
                }
              />
              <Route
                path="/healthcare-landing"
                element={
                  useNewHealthcareLanding ? (
                    <RedesignShell>
                      <RedesignHealthcareLanding />
                    </RedesignShell>
                  ) : (
                    <>
                      <FloatingWhatsAppButton />
                      <HealthcareLanding />
                    </>
                  )
                }
              />

              <Route
                path="/rsb-fintech-founder"
                element={
                  <ReshabLandingPage />
                }
              />
              <Route
                path="/dsn-fintech-founder"
                element={
                  <DarshanLandingPage />
                }
              />
              <Route
                path="/kvy-fintech-founder"
                element={
                  <KavyaLandingPage />
                }
              />
              <Route
                path="/mhn-fintech-founder"
                element={
                  <MahinLandingPage />
                }
              />
              <Route
                path="/mgh-fintech-founder"
                element={
                  <MeghanaLandingPage />
                }
              />
              <Route path="/new-homepage-preview" element={<NewHomepagePreview />} />

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
                path="/admin/reshab-leads"
                element={
                  <ProtectedRoute>
                    <ReshabLeads />
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
                path="/admin/placement-applications"
                element={
                  <ProtectedRoute>
                    <PlacementProgramApplications />
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
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
