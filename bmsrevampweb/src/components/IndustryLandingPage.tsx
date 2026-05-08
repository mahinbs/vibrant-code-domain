import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { SiteBackground } from "./SiteBackground";
import { workCaseStudyUrl } from "../lib/mainSiteWorkUrl";
import { ProjectContactForm } from "./ProjectContactForm";
import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabaseClient";
import { filterPortfolioByVertical, normalizeBackendPortfolio } from "../lib/backendPortfolio";

type SectionCard = {
  title: string;
  body: string;
};

type CaseStudy = {
  title: string;
  category: string;
  impact: string;
  stack: string[];
  businessResult: string;
  slug?: string;
  image?: string;
  gradient?: string;
};

type BuildItem = {
  title: string;
  description: string;
};

type FaqGroup = {
  category: string;
  questions: string[];
};

type Props = {
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  socialProofItems: string[];
  trustIndicators: string[];
  trustedByHeading: string;
  trustedBySubheading: string;
  trustedByGroups: string[];
  capabilityTitle: string;
  capabilityCards: SectionCard[];
  buildItems: BuildItem[];
  differentiatorTitle: string;
  differentiatorItems: string[];
  scaleTitle: string;
  scaleItems: string[];
  caseStudies: CaseStudy[];
  portfolioVertical?: "fintech" | "healthcare";
  whyChooseTitle: string;
  whyChooseItems: string[];
  processTitle: string;
  processSteps: { title: string; body: string }[];
  faqGroups: FaqGroup[];
  finalTitle: string;
  finalSubtitle: string;
  formHeading: string;
  formSubheading: string;
};

const MORPH_WORDS = ["fintech", "stock_market", "platform", "payment_gateways", "lending_platforms"];
const MORPH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!<>/{}[]";

function MorphingWordAnimation() {
  const [text, setText] = useState("");

  useEffect(() => {
    let cancelled = false;
    let timer: number | null = null;
    const intervals = new Set<number>();

    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    const typeIn = (target: string) =>
      new Promise<void>((resolve) => {
        let i = 0;
        setText("");
        const id = window.setInterval(() => {
          if (cancelled) {
            window.clearInterval(id);
            intervals.delete(id);
            resolve();
            return;
          }
          i += 1;
          setText(target.slice(0, i));
          if (i >= target.length) {
            window.clearInterval(id);
            intervals.delete(id);
            resolve();
          }
        }, 60);
        intervals.add(id);
      });

    const deleteOut = (target: string) =>
      new Promise<void>((resolve) => {
        let i = target.length;
        const id = window.setInterval(() => {
          if (cancelled) {
            window.clearInterval(id);
            intervals.delete(id);
            resolve();
            return;
          }
          i -= 1;
          setText(target.slice(0, Math.max(0, i)));
          if (i <= 0) {
            window.clearInterval(id);
            intervals.delete(id);
            resolve();
          }
        }, 38);
        intervals.add(id);
      });

    const scrambleIn = (target: string) =>
      new Promise<void>((resolve) => {
        const maxLen = target.length;
        let frame = 0;
        const totalFrames = 18;
        const id = window.setInterval(() => {
          if (cancelled) {
            window.clearInterval(id);
            intervals.delete(id);
            resolve();
            return;
          }
          frame += 1;
          const progress = frame / totalFrames;
          let result = "";
          for (let i = 0; i < maxLen; i += 1) {
            if (Math.random() < progress * 1.4 || frame > totalFrames - 3) {
              result += target[i];
            } else {
              result += MORPH_CHARS[Math.floor(Math.random() * MORPH_CHARS.length)];
            }
          }
          setText(result);
          if (frame >= totalFrames) {
            window.clearInterval(id);
            intervals.delete(id);
            setText(target);
            resolve();
          }
        }, 40);
        intervals.add(id);
      });

    const run = async () => {
      let current = 0;
      while (!cancelled) {
        const word = MORPH_WORDS[current];
        await typeIn(word);
        if (cancelled) return;
        await sleep(1200);
        if (cancelled) return;
        await deleteOut(word);
        if (cancelled) return;
        await sleep(120);
        if (cancelled) return;
        current = (current + 1) % MORPH_WORDS.length;
        await scrambleIn(MORPH_WORDS[current]);
        if (cancelled) return;
        await sleep(240);
      }
    };

    timer = window.setTimeout(() => {
      void run();
    }, 400);

    return () => {
      cancelled = true;
      if (timer !== null) {
        window.clearTimeout(timer);
      }
      intervals.forEach((id) => window.clearInterval(id));
      intervals.clear();
    };
  }, []);

  return (
    <div className="hidden xl:flex min-h-[220px] items-center justify-center">
      <p className="sr-only">Morphing text animation cycling through fintech product categories</p>
      <div className="flex items-center font-mono">
        <span className="mr-1 select-none text-[20px] text-white/60">&gt;</span>
        <span className="min-w-[2ch] text-[30px] font-medium tracking-[-0.02em] text-white">{text}</span>
        <span className="ml-1 inline-block h-[32px] w-[3px] rounded-[1px] bg-white animate-[morph-blink_1s_step-end_infinite]" />
      </div>
    </div>
  );
}

function ProcessStepIcon({ title }: { title: string }) {
  const normalized = title.toLowerCase();

  if (normalized.includes("discover")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M20 20l-4.2-4.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized.includes("design")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <path d="M4 16l8-8 4 4-8 8H4v-4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M13.8 6.2l2-2a1.8 1.8 0 1 1 2.6 2.6l-2 2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (normalized.includes("build")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <path
          d="M9.6 5a4.8 4.8 0 0 0 6.6 6.6L20 15.4l-3.4 3.4-3.8-3.8A4.8 4.8 0 1 1 9.6 5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
      <path d="M12 3l7 4v5c0 5-3.4 8-7 9-3.6-1-7-4-7-9V7l7-4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.5 12.5l1.8 1.8 3.4-3.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BuildItemIcon({ title }: { title: string }) {
  const normalized = title.toLowerCase();

  if (normalized.includes("wallet")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <rect x="3" y="6" width="18" height="12" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M15 12h6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16.5" cy="12" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (normalized.includes("payment")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <rect x="3" y="5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 10h18" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (normalized.includes("lending") || normalized.includes("loan")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9.5 9.2h3.1a1.7 1.7 0 0 1 0 3.4h-1.2a1.7 1.7 0 0 0 0 3.4h3.1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (normalized.includes("settlement")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <path d="M4 8h9a3 3 0 1 1 0 6H4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M14 14l2.5-2.5L14 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (normalized.includes("expense")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <path d="M7 4h10v16l-2.5-1.8L12 20l-2.5-1.8L7 20V4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (normalized.includes("insurance")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <path d="M12 3l7 4v5c0 5-3.4 8-7 9-3.6-1-7-4-7-9V7l7-4z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (normalized.includes("investment") || normalized.includes("dashboard")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <path d="M4 19V5M4 19h16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7 15l3-3 2.5 2.5L17 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (normalized.includes("bank")) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
        <path d="M4 9h16M6 9v8M10 9v8M14 9v8M18 9v8M3 17h18M12 4l8 3H4l8-3z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8v8M8 12h8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SectionTitle({
  children,
  watermark,
  titleClassName,
  watermarkClassName,
  containerClassName,
  hideTitle = false,
}: {
  children: string;
  watermark?: string;
  titleClassName?: string;
  watermarkClassName?: string;
  containerClassName?: string;
  hideTitle?: boolean;
}) {
  if (watermark) {
    return (
      <div className={`relative min-h-[136px] overflow-hidden pb-2 max-md:min-h-[110px] ${containerClassName ?? ""}`}>
        <p
          aria-hidden
          className={`pointer-events-none absolute left-0 top-[-8px] z-0 w-full select-none text-left font-bold uppercase leading-[0.86] tracking-[0.02em] opacity-[0.24] max-md:opacity-[0.2] ${watermarkClassName ?? ""}`}
          style={{
            fontSize: "clamp(2.2rem, min(10vw, 8.8rem), 8.8rem)",
            backgroundImage:
              "linear-gradient(180deg, rgb(140, 178, 255) 0%, rgb(88, 132, 255) 28%, rgb(48, 88, 210) 58%, rgb(18, 32, 72) 88%, rgb(8, 14, 36) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {watermark}
        </p>
        {!hideTitle ? (
          <h2
            className={`relative z-[2] mt-[clamp(1.9rem,6.1vw,4.4rem)] max-w-[760px] text-left text-[28px] font-medium -tracking-[0.02em] text-white md:text-[34px] ${titleClassName ?? ""}`}
          >
            {children}
          </h2>
        ) : null}
      </div>
    );
  }

  return (
    <h2 className="text-[28px] font-medium -tracking-[0.02em] text-white md:text-[34px]">
      {children}
    </h2>
  );
}

export function IndustryLandingPage({
  eyebrow,
  heroTitle,
  heroSubtitle,
  socialProofItems,
  trustIndicators,
  capabilityTitle,
  capabilityCards,
  buildItems,
  differentiatorTitle,
  differentiatorItems,
  scaleTitle,
  scaleItems,
  caseStudies,
  portfolioVertical,
  whyChooseTitle,
  whyChooseItems,
  processTitle,
  processSteps,
  faqGroups,
  finalTitle,
  finalSubtitle,
  formHeading,
  formSubheading,
}: Props) {
  const [backendCaseStudies, setBackendCaseStudies] = useState<CaseStudy[]>([]);

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCaseStudies = async () => {
      const { data, error } = await supabase.from("portfolios").select("*").order("created_at", { ascending: false });
      if (error || !data || !isMounted) return;

      const normalized = normalizeBackendPortfolio(data as Record<string, unknown>[]);
      const verticalItems = portfolioVertical ? filterPortfolioByVertical(normalized, portfolioVertical) : normalized;
      const chosen = verticalItems.slice(0, 3).map((item) => ({
        title: item.title,
        category: item.industry,
        impact: item.outcome,
        stack: item.stack.length > 0 ? item.stack : ["Web", "Product", "Engineering"],
        businessResult: item.outcome,
        slug: item.slug,
        image: item.image,
        gradient: item.gradient,
      }));

      if (isMounted) setBackendCaseStudies(chosen);
    };

    void fetchCaseStudies();

    return () => {
      isMounted = false;
    };
  }, [portfolioVertical]);

  const displayCaseStudies = backendCaseStudies.length > 0 ? backendCaseStudies : caseStudies;

  return (
    <>
      <SiteBackground />
      <Nav />
      <main className="relative z-10 mx-auto flex w-full max-w-[min(1920px,96vw)] flex-col items-center px-5 pb-[80px] pt-[120px] md:px-10">
        <section
          className="relative w-full overflow-hidden rounded-[20px] border border-white/15 p-6 md:p-10"
          style={{
            background:
              "radial-gradient(108% 100% at 100% 100.6%, var(--color-purple) 12.8%, rgb(8,16,40) 69.1%, #000 98.2%)",
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.67)_64.5%,#000_100%)]" />
          <div className="relative z-[2] flex flex-col gap-6">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px] xl:items-center">
              <div className="flex flex-col gap-6">
                <p className="inline-flex w-fit items-center rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/80">
                  {eyebrow}
                </p>
                <h1 className="max-w-4xl text-[36px] font-medium leading-[1.05] -tracking-[0.03em] text-white md:text-[62px]">
                  {heroTitle}
                </h1>
                <p className="max-w-3xl text-[16px] leading-[1.5] text-white/75 md:text-[20px]">{heroSubtitle}</p>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="btn-gloss relative overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-sm font-medium text-white"
                  >
                    Book free consultation
                  </button>
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="rounded-[10px] border border-white/15 bg-black/40 px-5 py-3 text-sm font-medium text-white/90 transition-colors hover:bg-black/60 hover:text-white"
                  >
                    Talk on WhatsApp
                  </button>
                </div>
              </div>
              <MorphingWordAnimation />
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-white/65">
              {socialProofItems.map((item, index) => (
                <div key={item} className="flex items-center gap-4">
                  <span>{item}</span>
                  {index !== socialProofItems.length - 1 ? <span className="text-white/35">•</span> : null}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {trustIndicators.map((item) => (
                <div
                  key={item}
                  className="rounded-[10px] border border-white/12 bg-black/35 px-3 py-2 text-[12px] leading-[1.35] text-white/85"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 w-full">
          <SectionTitle>Fintech Capabilities</SectionTitle>
          <div className="mt-0 overflow-hidden pb-2">
            <div className="build-marquee-track flex w-max gap-3 pr-2">
              {[...buildItems, ...buildItems].map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="group relative w-[300px] shrink-0 overflow-hidden rounded-[10px] border border-white/12 bg-black/35 px-4 py-4 transition-colors hover:border-white/30 md:w-[320px]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(120% 120% at 0% 0%, rgba(92,138,255,0.2) 0%, rgba(92,138,255,0.06) 40%, rgba(0,0,0,0) 70%)",
                    }}
                  />
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-[linear-gradient(145deg,rgba(92,138,255,0.2),rgba(92,138,255,0.05))] text-white/85">
                      <BuildItemIcon title={item.title} />
                    </span>
                    <p className="relative z-[1] text-[14px] font-medium text-white">{item.title}</p>
                  </div>
                  <p className="relative z-[1] mt-2 text-[12px] leading-[1.45] text-white/60 group-hover:text-white/75">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 w-full">
          <SectionTitle watermark="OUR WORKS" watermarkClassName="mt-[30px] mb-[30px]" hideTitle>
            Our Works
          </SectionTitle>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {displayCaseStudies.map((card) => (
              <article
                key={card.title}
                className="group relative overflow-hidden rounded-[14px] border border-white/12 bg-black/35 backdrop-blur-[8px]"
              >
                <div className="relative h-[210px] w-full overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-[1.04]"
                    style={
                      card.image
                        ? {
                            backgroundImage: `url(${card.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : {
                            background:
                              card.gradient ??
                              "radial-gradient(120% 100% at 0% 0%, rgba(72,118,255,0.48), rgba(0,0,0,0.85) 70%)",
                          }
                    }
                  />
                  <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.72)_80%,rgba(0,0,0,0.92)_100%)]" />
                  <div className="absolute left-4 top-4 z-[2]">
                    <span className="rounded-full border border-white/15 bg-black/45 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur-[3px]">
                      {card.category}
                    </span>
                  </div>
                </div>

                <div className="relative z-[2] p-5">
                  <h3 className="text-[19px] font-medium text-white">{card.title}</h3>
                  <p className="mt-2 text-[15px] font-medium text-white/90">{card.impact}</p>
                  <p className="mt-2 text-[13px] text-white/65">{card.businessResult}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {card.stack.map((tech) => (
                      <span key={tech} className="rounded-md border border-white/12 bg-black/35 px-2 py-1 text-[11px] text-white/75">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {card.slug ? (
                    <a
                      href={workCaseStudyUrl(card.slug)}
                      target="_top"
                      rel="noopener"
                      className="mt-4 inline-flex items-center rounded-[10px] border border-[#4b78ff]/70 bg-[linear-gradient(180deg,#2f5eff_0%,#254dcf_100%)] px-3 py-2 text-[12px] font-semibold text-white shadow-[inset_0_0_8px_2px_rgba(255,255,255,0.18)]"
                    >
                      View case study
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={scrollToForm}
              className="btn-gloss relative overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-sm font-medium text-white"
            >
              Start your project
            </button>
          </div>
        </section>

        <section className="mt-6 w-full rounded-[16px] border border-white/12 bg-black/35 p-6 backdrop-blur-[8px]">
          <SectionTitle>{processTitle}</SectionTitle>
          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">
            {processSteps.map((step, index) => (
              <div key={step.title} className="contents">
                <div className="flex-1 rounded-[10px] border border-white/12 bg-black/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[linear-gradient(145deg,rgba(92,138,255,0.2),rgba(92,138,255,0.05))] text-white/85">
                      <ProcessStepIcon title={step.title} />
                    </span>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-white/45">0{index + 1}</p>
                  </div>
                  <p className="mt-2 text-[15px] font-medium text-white">{step.title}</p>
                  <p className="mt-2 text-[13px] text-white/65">{step.body}</p>
                </div>
                {index !== processSteps.length - 1 ? (
                  <div className="hidden items-center justify-center md:flex">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/70">
                      →
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <ProjectContactForm formHeading={formHeading} formSubheading={formSubheading} />

        <section className="mt-6 w-full">
          <SectionTitle
            watermark="OUR EXPERTISE"
            titleClassName="mt-[90px] text-right ml-[470px]"
            watermarkClassName="mt-[20px] mb-[20px]"
            containerClassName="m-0 pb-0"
            hideTitle
          >
            {capabilityTitle}
          </SectionTitle>
          <div className="mt-0 grid gap-4 md:grid-cols-2">
            {capabilityCards.map((card) => (
              <article
                key={card.title}
                className="group relative overflow-hidden rounded-[14px] border border-white/12 bg-black/35 p-5 backdrop-blur-[8px] transition-all hover:-translate-y-1 hover:border-white/30"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-[linear-gradient(140deg,rgba(92,138,255,0.22),transparent_55%)]" />
                <p className="relative z-[1] text-[11px] uppercase tracking-[0.14em] text-purple/70">{card.title}</p>
                <p className="relative z-[1] mt-3 text-[15px] leading-[1.55] text-white/75">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 w-full">
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="rounded-[16px] border border-white/12 bg-black/35 p-6 backdrop-blur-[8px]">
              <SectionTitle>{differentiatorTitle}</SectionTitle>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {differentiatorItems.map((item) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden rounded-[10px] border border-white/12 bg-black/30 px-4 py-3 text-[14px] text-white/85"
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(120% 120% at 0% 0%, rgba(92,138,255,0.18) 0%, rgba(92,138,255,0.05) 42%, rgba(0,0,0,0) 72%)",
                      }}
                    />
                    <span className="relative z-[1]">✦ {item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[16px] border border-white/12 bg-[radial-gradient(circle_at_top,rgba(92,138,255,0.2),rgba(0,0,0,0.55)_55%)] p-6 backdrop-blur-[8px]">
              <SectionTitle>{scaleTitle}</SectionTitle>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {scaleItems.map((item) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden rounded-[10px] border border-white/12 bg-black/35 px-4 py-3 text-[13px] text-white/85"
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(120% 120% at 0% 0%, rgba(92,138,255,0.2) 0%, rgba(92,138,255,0.06) 40%, rgba(0,0,0,0) 70%)",
                      }}
                    />
                    <span className="relative z-[1]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 w-full rounded-[16px] border border-white/12 bg-black/35 p-6 backdrop-blur-[8px]">
          <SectionTitle>{whyChooseTitle}</SectionTitle>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {whyChooseItems.map((item) => (
              <p key={item} className="rounded-[10px] border border-white/12 bg-black/30 px-4 py-3 text-[14px] text-white/85">
                ✦ {item}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-6 w-full rounded-[16px] border border-white/12 bg-black/35 p-6 backdrop-blur-[8px]">
          <SectionTitle>FAQ</SectionTitle>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {faqGroups.map((group) => (
              <div key={group.category} className="rounded-[12px] border border-white/12 bg-black/30 p-4">
                <p className="text-[12px] uppercase tracking-[0.12em] text-purple/70">{group.category}</p>
                <div className="mt-2 space-y-2">
                  {group.questions.map((question) => (
                    <details key={question} className="rounded-[10px] border border-white/10 bg-black/35 px-3 py-2">
                      <summary className="cursor-pointer text-[13px] font-medium text-white/90">{question}</summary>
                      <p className="mt-2 text-[12px] text-white/65">
                        We align architecture, compliance, and sprint execution to your timeline and operational needs.
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 w-full rounded-[16px] border border-white/12 bg-[radial-gradient(circle_at_top,rgba(92,138,255,0.2),rgba(0,0,0,0.55)_55%)] p-6 text-center backdrop-blur-[8px]">
          <h2 className="text-[34px] font-medium -tracking-[0.02em] text-white md:text-[44px]">{finalTitle}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-white/70">{finalSubtitle}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={scrollToForm}
              className="btn-gloss relative overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-sm font-medium text-white"
            >
              Get proposal in 24 hours
            </button>
            <button
              type="button"
              onClick={scrollToForm}
              className="rounded-[10px] border border-white/15 bg-black/40 px-5 py-3 text-sm font-medium text-white/90"
            >
              Schedule consultation
            </button>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
