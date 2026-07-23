import { lazy, Suspense, useState, type CSSProperties } from "react";
import { Helmet } from "react-helmet-async";
import { SiteBackground } from "../components/SiteBackground";
import { FounderVideoEmbed } from "../components/FounderVideoEmbed";
import { whatsappHref } from "../data/site";

const Footer = lazy(() => import("../components/Footer").then((m) => ({ default: m.Footer })));

const LINKEDIN = "https://in.linkedin.com/in/mahin-b-s";
const PORTRAIT = "/mahin-bs.jpg";
const ENTREPRENEUR_COVER = "/mahinbsnew.jpeg";
const TIMES_AWARD_VIDEO = "/awards/mahin-times-award.mp4";
const TIMES_AWARD_IMG = "/awards/mahin-times-award.jpg"; // poster frame
const TIMES_ARTICLE =
  "https://timesofindia.indiatimes.com/life-style/events/times-business-awards-north-2024-acknowledging-the-very-best-in-business/articleshow/109378158.cms";

const GRID_OVERLAY: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(120,145,220,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(120,145,220,.10) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

const CARD: CSSProperties = {
  background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.55) 100%)",
};

const STATS = [
  { value: "8+", label: "Years building AI products" },
  { value: "200+", label: "Businesses automated" },
  { value: "30 days", label: "Average deployment" },
  { value: "60%", label: "Average time saved" },
];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.99H5.67v8.35h2.67zM7 8.67a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.67v-4.58c0-2.45-1.31-3.59-3.06-3.59-1.41 0-2.04.78-2.39 1.32v-1.13h-2.67c.04.75 0 8.35 0 8.35h2.67v-4.66c0-.24.02-.48.09-.65.19-.48.63-.98 1.36-.98.96 0 1.34.73 1.34 1.8v4.49h2.66z" />
    </svg>
  );
}

/** Times Business Awards proof — plays the ceremony clip; emblem fallback if missing. */
function TimesAwardMedia() {
  const [ok, setOk] = useState(true);
  if (ok) {
    return (
      <video
        src={TIMES_AWARD_VIDEO}
        poster={TIMES_AWARD_IMG}
        controls
        playsInline
        preload="metadata"
        onError={() => setOk(false)}
        className="h-full w-full bg-black object-contain"
      />
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
      <span className="text-5xl">🏆</span>
      <p className="text-[15px] font-medium text-white">Times Business Awards</p>
      <p className="max-w-[220px] text-[12px] leading-snug text-white/45">
        Recognised for entrepreneurship and business impact.
      </p>
    </div>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="mb-2 inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-purple">
        {kicker}
      </p>
      <h2 className="text-[32px] font-medium -tracking-[0.03em] text-white md:text-[40px]">{title}</h2>
    </div>
  );
}

export default function FounderProfile() {
  return (
    <>
      <Helmet>
        <title>Mahin B S — Founder &amp; Chairman of Boostmysites</title>
        <meta
          name="description"
          content="Mahin B S is the Founder & Chairman of Boostmysites — featured on the cover of Entrepreneur's Startups, interviewed by Forbes, and recognised for building AI automation businesses."
        />
        <link rel="canonical" href="https://www.boostmysites.com/founder" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Mahin B S",
            jobTitle: "Founder & Chairman",
            worksFor: { "@type": "Organization", name: "Boostmysites" },
            url: "https://www.boostmysites.com/founder",
            sameAs: [LINKEDIN],
            image: `https://www.boostmysites.com${PORTRAIT}`,
          })}
        </script>
      </Helmet>

      <SiteBackground />

      {/* Top bar */}
      <header className="relative z-10 mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-5 md:px-10">
        <a href="/" className="flex items-center gap-2">
          <img src="/bms-logo.png" alt="Boostmysites" className="size-8 rounded-lg bg-white p-1" />
          <span className="text-sm font-semibold text-white">Boostmysites</span>
        </a>
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-[13px] font-medium text-white/80 hover:text-white"
        >
          <LinkedInIcon className="size-4 text-[#4b9fff]" />
          Connect
        </a>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pb-16 md:px-10">
        {/* Hero */}
        <section className="grid items-center gap-8 py-8 md:grid-cols-[300px_minmax(0,1fr)] md:gap-12 md:py-12">
          <div className="mx-auto w-full max-w-[300px] rounded-[24px] bg-gradient-to-b from-[#4b78ff]/60 to-transparent p-[3px]">
            <img
              src={PORTRAIT}
              alt="Mahin B S — Founder & Chairman, Boostmysites"
              className="aspect-[4/5] w-full rounded-[22px] object-cover object-top ring-1 ring-black/60"
            />
          </div>
          <div>
            <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-purple">
              Founder &amp; Chairman · Boostmysites
            </p>
            <h1 className="text-[44px] font-medium -tracking-[0.04em] leading-[1.02] text-white md:text-[64px]">
              Mahin <span className="impact-highlight">B S</span>
            </h1>
            <p className="mt-4 max-w-[620px] text-lg leading-relaxed text-white/70">
              Investor-entrepreneur and Founder &amp; Chairman of Boostmysites. Featured on the cover of
              <span className="text-white"> Entrepreneur&apos;s Startups</span> as &ldquo;The Growth Builder&rdquo;,
              interviewed by <span className="text-white">Forbes</span>, and honoured at the
              <span className="text-white"> Times Business Awards (North 2024)</span>. Under his leadership,
              Boostmysites has automated
              <span className="text-white"> 200+ businesses</span> — designing AI employees that run the
              repetitive work of modern companies so founders can focus on growth.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] bg-[#4b78ff] px-5 py-3 text-sm font-semibold text-white hover:bg-[#3d63d8]"
              >
                <LinkedInIcon className="size-4" /> LinkedIn profile
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] border border-white/20 bg-black/40 px-5 py-3 text-sm font-medium text-white hover:border-white/40"
              >
                Work with Boostmysites →
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-3 py-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/12 p-5" style={CARD}>
              <p className="text-3xl font-semibold text-white">{s.value}</p>
              <p className="mt-1 text-[13px] leading-snug text-white/55">{s.label}</p>
            </div>
          ))}
        </section>

        {/* Recognition */}
        <section className="py-12">
          <SectionHeading kicker="Recognition & Press" title="Featured & awarded" />
          <div className="grid gap-5 lg:grid-cols-3">
            {/* Entrepreneur cover */}
            <div className="relative overflow-hidden rounded-[18px] border border-white/12 p-3" style={CARD}>
              <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-30" style={GRID_OVERLAY} />
              <div className="relative z-[1]">
                <div className="overflow-hidden rounded-[12px] border border-white/10">
                  <img
                    src={ENTREPRENEUR_COVER}
                    alt="Mahin B S on the cover of Entrepreneur's Startups — The Growth Builder"
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover object-top"
                  />
                </div>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-purple">Entrepreneur&apos;s Startups</p>
                <p className="mt-0.5 text-[15px] font-medium text-white">Cover feature — &ldquo;The Growth Builder&rdquo;</p>
                <p className="text-[13px] text-white/50">India Edition · January 2021</p>
              </div>
            </div>

            {/* Forbes interview */}
            <div className="relative flex flex-col overflow-hidden rounded-[18px] border border-white/12 p-3" style={CARD}>
              <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-30" style={GRID_OVERLAY} />
              <div className="relative z-[1] flex h-full flex-col">
                <div className="relative aspect-video w-full overflow-hidden rounded-[12px] border border-white/10 bg-[#111318]">
                  <FounderVideoEmbed />
                </div>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-purple">
                  <span className="mr-1.5 inline-block size-1.5 rounded-full bg-[#ff4d4d] align-middle" />
                  Forbes Interview
                </p>
                <p className="mt-0.5 text-[15px] font-medium text-white">In conversation with Forbes</p>
                <p className="text-[13px] text-white/50">Empowering businesses through AI &amp; automation</p>
              </div>
            </div>

            {/* Times award + LinkedIn stacked */}
            <div className="flex flex-col gap-5">
              <div className="relative flex-1 overflow-hidden rounded-[18px] border border-white/12 p-3" style={CARD}>
                <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-30" style={GRID_OVERLAY} />
                <div className="relative z-[1] flex h-full flex-col">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[12px] border border-white/10 bg-black">
                    <TimesAwardMedia />
                  </div>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-purple">The Times Group · Award</p>
                  <p className="mt-0.5 text-[15px] font-medium text-white">Times Business Awards, North 2024</p>
                  <a
                    href={TIMES_ARTICLE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[#7aa2ff] hover:underline"
                  >
                    Featured in The Times of India ↗
                  </a>
                </div>
              </div>

              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-[18px] border border-white/12 p-5 transition-colors hover:border-white/25"
                style={CARD}
              >
                <div className="relative z-[1] flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-[#0a66c2]/20 ring-1 ring-white/10">
                    <LinkedInIcon className="size-5 text-[#4b9fff]" />
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-white">LinkedIn</p>
                    <p className="text-[13px] text-white/50 group-hover:text-white/70">in/mahin-b-s ↗</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Quote */}
        <section className="py-8">
          <div className="relative overflow-hidden rounded-[20px] border border-white/12 p-8 md:p-12" style={CARD}>
            <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-25" style={GRID_OVERLAY} />
            <blockquote className="relative z-[1]">
              <span aria-hidden className="block text-[56px] font-bold leading-[0.6] text-gradient">&ldquo;</span>
              <p className="mt-3 max-w-[820px] text-[22px] font-medium leading-relaxed text-white md:text-[28px]">
                Our mission is simple: build businesses that run themselves.
                <span className="text-gradient"> Scale with systems, not headcount.</span>
              </p>
              <p className="mt-4 text-[14px] text-white/55">— Mahin B S, Founder &amp; Chairman, Boostmysites</p>
            </blockquote>
          </div>
        </section>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
