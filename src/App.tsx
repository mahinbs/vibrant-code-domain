
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WebAppsPage from "./pages/WebAppsPage";
import SaasPage from "./pages/SaasPage";
import MobileAppsPage from "./pages/MobileAppsPage";
import AiCallingPage from "./pages/AiCallingPage";
import AiAutomationPage from "./pages/AiAutomationPage";
import Portfolio from "./pages/Portfolio";
import ReviewsPage from "./pages/ReviewsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/web-apps" element={<WebAppsPage />} />
          <Route path="/saas" element={<SaasPage />} />
          <Route path="/mobile-apps" element={<MobileAppsPage />} />
          <Route path="/ai-calling" element={<AiCallingPage />} />
          <Route path="/ai-automation" element={<AiAutomationPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
