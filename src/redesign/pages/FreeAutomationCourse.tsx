import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SiteBackground } from "../components/SiteBackground";
import { CheckIcon, ArrowRightIcon } from "../components/icons";
import { submitStrategyCallLead } from "../lib/submitLead";

/** Branded keywords we nudge visitors to search on Google. */
const KEYWORDS = [
  "Boostmysites Portfolio",
  "Boostmysites Career",
  "Boostmysites Fees",
  "Boostmysites AI Automation",
] as const;

const googleSearch = (q: string) =>
  `https://www.google.com/search?q=${encodeURIComponent(q)}`;

const LESSONS = [
  "Map the busywork worth automating (and what to leave alone)",
  "Capture & auto-qualify leads from forms, ads and DMs",
  "Make your CRM update itself + never-miss follow-ups",
  "Build an AI support assistant trained on your business",
  "Auto-process invoices, contracts & forms with AI",
  "Live dashboards that build themselves before Monday",
] as const;

export default function FreeAutomationCourse() {
  const [started, setStarted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [searchedCount, setSearchedCount] = useState(0);

  // Keyword popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [kwIndex, setKwIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Guaranteed noindex + title (link-only page) even if global meta overrides Helmet.
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Free AI Automation Course — Boostmysites";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    meta.setAttribute("data-course-noindex", "true");
    document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      document.querySelectorAll('meta[data-course-noindex="true"]').forEach((m) => m.remove());
    };
  }, []);

  const begin = () => {
    setStarted(true);
    // First nudge shortly after the form opens, then it recurs.
    window.setTimeout(() => setPopupOpen(true), 1500);
    document.getElementById("course-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Recurring popups while filling the form (until they submit).
  useEffect(() => {
    if (!started || status === "success") return;
    timerRef.current = window.setInterval(() => {
      setPopupOpen(true);
    }, 11000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [started, status]);

  const closePopup = () => {
    setPopupOpen(false);
    setKwIndex((i) => (i + 1) % KEYWORDS.length);
  };

  const onSearch = () => {
    window.open(googleSearch(KEYWORDS[kwIndex]), "_blank", "noopener");
    setSearchedCount((c) => c + 1);
    closePopup();
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) return setError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Enter a valid email.");
    if (form.phone.replace(/\D/g, "").length < 7) return setError("Enter a valid WhatsApp number.");

    setStatus("submitting");
    const res = await submitStrategyCallLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      sourcePage: "free-ai-automation-course",
    });
    if (res.ok) {
      setStatus("success");
      if (timerRef.current) window.clearInterval(timerRef.current);
      setPopupOpen(false);
    } else {
      setStatus("error");
      setError(res.error ?? "Something went wrong. Please try again.");
    }
  }

  const onChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  return (
    <>
      <Helmet>
        <title>Free AI Automation Course — Boostmysites</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Get the free Boostmysites AI Automation course." />
      </Helmet>

      <SiteBackground />

      {/* Minimal brand header (no nav links — keep them on this page) */}
      <header className="relative z-10 mx-auto flex w-full max-w-[1100px] items-center justify-between px-5 py-5 md:px-10">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-[10px] bg-white p-1">
            <img src="/bms-logo.png" alt="Boostmysites" className="size-full object-contain" />
          </span>
          <span className="text-[15px] font-semibold text-white">Boostmysites</span>
        </Link>
        <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-purple">
          Free course
        </span>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center px-5 pb-20 md:px-10">
        {/* Hero */}
        <section className="w-full pt-8 text-center md:pt-14">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#4b78ff]/40 bg-[#4b78ff]/15 px-4 py-1.5 text-[12px] font-medium text-[#cdd9ff]">
            🎁 100% Free · No payment required
          </p>
          <h1 className="mx-auto max-w-[860px] text-[40px] font-medium leading-[1.04] -tracking-[0.04em] text-white md:text-[64px]">
            The Free{" "}
            <span className="text-gradient">AI Automation</span> Course
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-lg leading-[1.5] text-white/70 max-md:text-base">
            Learn how growing businesses automate lead capture, support, reporting and
            operations — and get hours back every week. Self-paced, no fluff, free.
          </p>
          <button
            type="button"
            onClick={begin}
            className="btn-gloss relative mt-8 inline-flex items-center gap-2 overflow-hidden rounded-[12px] border border-white/20 bg-purple/80 px-7 py-4 text-base font-semibold text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-[2]">Get the course — free</span>
            <ArrowRightIcon className="relative z-[2] size-[16px]" />
          </button>
        </section>

        {/* What you'll learn */}
        <section className="mt-16 w-full max-w-[820px]">
          <h2 className="mb-6 text-center text-[24px] font-medium text-white md:text-[30px]">
            What you&apos;ll learn
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {LESSONS.map((l) => (
              <div
                key={l}
                className="flex items-start gap-3 rounded-[14px] border border-white/10 p-4"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)" }}
              >
                <CheckIcon className="mt-1 size-[15px] shrink-0 text-[#5dcaa5]" />
                <span className="text-[15px] text-white/80">{l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section id="course-form" className="mt-16 w-full max-w-[460px]">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 rounded-[18px] border border-[#5dcaa5]/40 bg-[#1d9e75]/10 p-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#1d9e75]/30">
                <CheckIcon className="size-6 text-white" />
              </div>
              <h3 className="text-xl font-medium text-white">You&apos;re in! 🎉</h3>
              <p className="text-sm text-white/70">
                Check your email &amp; WhatsApp — your free AI Automation course is on its way.
              </p>
            </div>
          ) : (
            <div
              className="rounded-[18px] border border-white/12 p-6 md:p-8"
              style={{ background: "linear-gradient(180deg, rgba(18,38,96,.45) 0%, rgba(0,0,0,.9) 100%)" }}
            >
              <h2 className="text-center text-xl font-medium text-white">
                {started ? "Almost there — claim your access" : "Sign up to get instant access"}
              </h2>
              <p className="mt-1 text-center text-sm text-white/55">Free forever. We&apos;ll send it to you.</p>

              {!started ? (
                <button
                  type="button"
                  onClick={begin}
                  className="btn-gloss relative mt-5 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/80 px-5 py-3.5 text-sm font-semibold text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]"
                >
                  <span className="relative z-[2]">Start — get the course</span>
                  <ArrowRightIcon className="relative z-[2] size-[14px]" />
                </button>
              ) : (
                <form onSubmit={onSubmit} noValidate className="mt-5 flex flex-col gap-3">
                  <input
                    value={form.name}
                    onChange={onChange("name")}
                    placeholder="Full name"
                    autoComplete="name"
                    className="w-full rounded-lg border border-white/15 bg-black/40 p-3.5 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                  />
                  <input
                    value={form.email}
                    onChange={onChange("email")}
                    type="email"
                    placeholder="Work email"
                    autoComplete="email"
                    className="w-full rounded-lg border border-white/15 bg-black/40 p-3.5 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                  />
                  <input
                    value={form.phone}
                    onChange={onChange("phone")}
                    type="tel"
                    placeholder="WhatsApp number (+91…)"
                    autoComplete="tel"
                    className="w-full rounded-lg border border-white/15 bg-black/40 p-3.5 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                  />
                  {error ? <p className="text-[13px] text-red-300/90">{error}</p> : null}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-gloss relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/80 px-5 py-3.5 text-sm font-semibold text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)] disabled:opacity-60"
                  >
                    <span className="relative z-[2]">
                      {status === "submitting" ? "Submitting…" : "Send me the free course"}
                    </span>
                  </button>
                  {searchedCount > 0 ? (
                    <p className="text-center text-[12px] text-[#5dcaa5]">
                      ✓ {searchedCount} search{searchedCount > 1 ? "es" : ""} done — thanks for the boost!
                    </p>
                  ) : null}
                </form>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Recurring keyword-search popup */}
      {popupOpen && status !== "success" ? (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-[3px]">
          <div
            className="relative w-full max-w-[420px] overflow-hidden rounded-[18px] border border-[#4b78ff]/40 p-7 text-center"
            style={{ background: "radial-gradient(120% 100% at 50% 0%, rgba(72,118,255,0.35), rgba(0,0,0,0.92) 70%)" }}
          >
            <button
              type="button"
              onClick={closePopup}
              aria-label="Close"
              className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 hover:bg-black/60"
            >
              ×
            </button>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#cdd9ff]">
              One quick step to unlock
            </p>
            <h3 className="mt-3 text-[22px] font-medium leading-snug text-white">
              Search this on Google 👇
            </h3>
            <div className="mt-4 rounded-xl border border-white/15 bg-black/50 px-4 py-3 text-lg font-semibold text-white">
              “{KEYWORDS[kwIndex]}”
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-white/65">
              It helps us verify you&apos;re real and bumps your spot in the course queue.
            </p>
            <a
              href={googleSearch(KEYWORDS[kwIndex])}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onSearch}
              className="btn-gloss relative mt-5 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-[#4b78ff]/70 bg-[linear-gradient(180deg,#2f5eff_0%,#254dcf_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[inset_0_0_8px_2px_rgba(255,255,255,0.18)]"
            >
              <span className="relative z-[2]">🔍 Search “{KEYWORDS[kwIndex]}” on Google</span>
            </a>
            <button
              type="button"
              onClick={closePopup}
              className="mt-3 text-[12px] text-white/45 underline-offset-2 hover:text-white/70 hover:underline"
            >
              Maybe later
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
