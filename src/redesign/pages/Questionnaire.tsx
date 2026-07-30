import { Helmet } from "react-helmet-async";

const FORM_EMBED =
  "https://docs.google.com/forms/d/e/1FAIpQLSe8TH01Cmn0Y4bxn8DzY6EnSBUWCajh9ozE2DFXo7-GphZqtw/viewform?embedded=true";
const FORM_LINK = "https://forms.gle/iso1a65n49Te4swY6";

/** Branded, link-only wrapper around the AI Automation Discovery questionnaire. */
export default function Questionnaire() {
  return (
    <div className="min-h-screen bg-[#06070c] text-white">
      <Helmet>
        <title>AI Automation Discovery Questionnaire | Boostmysites</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta
          name="description"
          content="Tell us about your business so we can map the automations that will save you the most time and money."
        />
      </Helmet>

      <header className="mx-auto flex w-full max-w-[860px] items-center justify-between px-5 py-5">
        <a href="/" className="flex items-center gap-2">
          <img src="/bms-logo.png" alt="Boostmysites" className="size-8 rounded-lg bg-white p-1" />
          <span className="text-sm font-semibold">Boostmysites</span>
        </a>
        <a
          href={FORM_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-white/15 px-3 py-1.5 text-[13px] text-white/70 hover:text-white"
        >
          Open in new tab ↗
        </a>
      </header>

      <main className="mx-auto w-full max-w-[860px] px-5 pb-16">
        <div className="mb-6 text-center">
          <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-purple">
            Discovery
          </p>
          <h1 className="text-[32px] font-medium -tracking-[0.03em] leading-[1.1] md:text-[42px]">
            AI Automation <span className="impact-highlight">Discovery Questionnaire</span>
          </h1>
          <p className="mx-auto mt-3 max-w-[560px] text-[15px] text-white/60">
            A few quick questions about how your business runs today. Your answers help us map the
            automations that will save you the most time and money — and prep your free audit.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/12 bg-white">
          <iframe
            src={FORM_EMBED}
            title="AI Automation Discovery Questionnaire"
            className="h-[80vh] min-h-[640px] w-full border-0"
            loading="lazy"
          >
            Loading…
          </iframe>
        </div>

        <p className="mt-4 text-center text-[12px] text-white/40">
          Trouble loading the form?{" "}
          <a href={FORM_LINK} target="_blank" rel="noopener noreferrer" className="text-[#7aa2ff] hover:underline">
            Open it in a new tab ↗
          </a>
        </p>
      </main>
    </div>
  );
}
