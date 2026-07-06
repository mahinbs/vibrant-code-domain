import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import { useReshabLeadConversionPageLoad } from "@/lib/analytics/useReshabLeadConversion";
import { SiteBackground } from "../components/SiteBackground";
import { Nav } from "../components/Nav";
import { ReportView } from "../components/automationScore/ReportView";
import { businessAutomationWhatsappHref } from "../data/businessAutomationContent";
import {
  readAutomationScoreState,
  reportFromStoredState,
} from "../lib/automationScoreStorage";

export default function AutomationScoreReport() {
  const stored = readAutomationScoreState();
  const payload = stored ? reportFromStoredState(stored) : null;

  useReshabLeadConversionPageLoad("automation-score-report", Boolean(payload));

  if (!payload) {
    return <Navigate to="/automation-score" replace />;
  }

  const { report, firstName } = payload;

  return (
    <>
      <Helmet>
        <title>Your Automation Report | Boostmysites</title>
        <meta
          name="description"
          content="Your personalized automation score report — hours lost, monthly cost, and what to automate first."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <SiteBackground />
      <Nav links={[]} whatsappHref={businessAutomationWhatsappHref} />
      <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center px-4 pb-20 pt-4">
        <section
          className="relative flex w-full max-w-[1400px] flex-col items-center overflow-hidden rounded-[20px] border border-white/15 px-4 py-6 md:px-10 md:py-10"
          style={{
            background:
              "radial-gradient(108% 100% at 100% 100.6%, var(--color-purple) 12.8%, rgb(8,16,40) 69.1%, #000 98.2%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-left-top bg-repeat opacity-60 bg-[length:400px_auto]"
            style={{ backgroundImage: "url(/textures/stars.svg)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[2]"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 64.5%, rgba(0,0,0,0.85) 100%)",
            }}
          />
          <div className="relative z-[5] flex w-full max-w-[1400px] flex-col items-center py-4 md:py-8">
            <div className="flex w-full max-w-[720px] flex-col items-center">
              <ReportView report={report} firstName={firstName} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
