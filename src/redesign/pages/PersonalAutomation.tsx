import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Mail, CalendarClock, FileText, Wallet, Megaphone, ListChecks } from "lucide-react";
import { SiteBackground } from "../components/SiteBackground";
import { LazyVideo } from "../components/LazyVideo";
import { MockupBand } from "../components/MockupBand";
import { PhoneInput, DEFAULT_COUNTRY, dialFor } from "../components/PhoneInput";
import { ArrowRightIcon, CheckIcon, WhatsAppIcon, StarIcon } from "../components/icons";
import { site, whatsappHref } from "../data/site";
import { testimonials } from "../data/testimonials";
import { submitStrategyCallLead } from "../lib/submitLead";

const Footer = lazy(() => import("../components/Footer").then((m) => ({ default: m.Footer })));

const GLOSS = "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)";
const GRID_OVERLAY: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(120,145,220,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(120,145,220,.10) 1px, transparent 1px)",
  backgroundSize: "28px 28px",
};

const CARDS = [
  {
    icon: Mail,
    title: "Inbox & email",
    hook: "Stop living in your inbox.",
    desc: "Auto-sort and label what matters, draft replies in your voice, and surface only the emails that actually need you.",
    bg: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=640&q=60",
  },
  {
    icon: CalendarClock,
    title: "Calendar & scheduling",
    hook: "Never play email tag again.",
    desc: "Smart booking links, automatic reminders, prep notes before every meeting, and your week organised for you.",
    bg: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=640&q=60",
  },
  {
    icon: FileText,
    title: "Notes & knowledge",
    hook: "Capture once, find instantly.",
    desc: "Meetings transcribed and summarised, notes auto-organised, and your ideas turned into action items automatically.",
    bg: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=640&q=60",
  },
  {
    icon: Wallet,
    title: "Personal finance",
    hook: "Stop tracking receipts by hand.",
    desc: "Expenses logged and categorised from receipts and statements, with a tidy monthly summary that builds itself.",
    bg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=640&q=60",
  },
  {
    icon: Megaphone,
    title: "Content & social",
    hook: "Post consistently without the grind.",
    desc: "Draft, schedule and repurpose your content across platforms — show up everywhere without doing it manually.",
    bg: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=640&q=60",
  },
  {
    icon: ListChecks,
    title: "Tasks & follow-ups",
    hook: "Nothing slips through.",
    desc: "Tasks created from your emails and chats, follow-ups nudged on time, and the right thing routed to the right place.",
    bg: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&q=60",
  },
] as const;

const STEPS = [
  { n: "1", title: "Map your day", desc: "A free 20-minute call to find the repetitive tasks quietly eating your time." },
  { n: "2", title: "We build it", desc: "We set up the automations around the tools you already use — Gmail, Notion, Calendar, WhatsApp and more." },
  { n: "3", title: "It runs for you", desc: "Everything runs quietly in the background. We monitor and tweak it as your life changes." },
] as const;

const STATS = [
  { value: "10+ hrs", label: "saved every week" },
  { value: "100+", label: "apps we connect" },
  { value: "days", label: "to go live, not months" },
] as const;

const PROBLEMS = [
  "You spend the first hour of every day just triaging email.",
  "Booking a single call takes five back-and-forth messages.",
  "Notes and ideas are scattered across apps you never reopen.",
  "Follow-ups slip because you're juggling everything in your head.",
  "Receipts and expenses pile up until they become a weekend chore.",
] as const;


export default function PersonalAutomation() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", requirement: "" });
  const [countryCode, setCountryCode] = useState<string>(DEFAULT_COUNTRY);
  const [nationalNumber, setNationalNumber] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const updatePhone = (code: string, num: string) => {
    const cleaned = num.replace(/[^\d]/g, "");
    setCountryCode(code);
    setNationalNumber(cleaned);
    setForm((p) => ({ ...p, phone: cleaned ? `${dialFor(code)} ${cleaned}` : "" }));
    if (error) setError(null);
  };

  useEffect(() => {
    const prev = document.title;
    document.title = "Personal Workflow Automation — Boostmysites";
    return () => {
      document.title = prev;
    };
  }, []);

  const scrollToForm = () =>
    document.getElementById("start")?.scrollIntoView({ behavior: "smooth", block: "center" });

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

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
      sourcePage: "personal-automation",
      requirement: form.requirement,
    });
    if (res.ok) setStatus("success");
    else {
      setStatus("error");
      setError(res.error ?? "Something went wrong. Please try again.");
    }
  }

  // WhatsApp link pre-filled with the visitor's submitted details (used after submit).
  const waPrefilledHref = (() => {
    const msg = `Hi Boostmysites 👋 I just requested a free *Personal Automation* audit.

Name: ${form.name || "-"}
Email: ${form.email || "-"}
WhatsApp: ${form.phone || "-"}
Want to automate: ${form.requirement?.trim() || "-"}

When can we chat?`;
    return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  })();

  return (
    <>
      <Helmet>
        <title>Personal Workflow Automation — Boostmysites</title>
        <meta
          name="description"
          content="Automate your personal workflow — inbox, calendar, notes, finances and follow-ups — and get hours back every week."
        />
      </Helmet>

      <SiteBackground />

      {/* Header */}
      <div className="sticky top-0 z-40 w-full pointer-events-none pt-[max(env(safe-area-inset-top),0.35rem)] pb-1.5">
        <nav className="pointer-events-auto mx-auto flex w-[760px] max-w-[calc(100vw-20px)] items-center justify-between gap-2 rounded-[14px] border border-white/15 bg-black/85 p-2 backdrop-blur-[10px] shadow-[0_5px_20px_rgba(0,0,0,0.35)]">
          <Link to="/" className="flex items-center gap-2 pl-1">
            <span className="flex size-9 items-center justify-center rounded-[10px] bg-white p-1">
              <img src="/bms-logo.png" alt="Boostmysites" className="size-full object-contain" />
            </span>
            <span className="text-[15px] font-semibold text-white">Boostmysites</span>
          </Link>
          <button
            type="button"
            onClick={scrollToForm}
            className="btn-gloss relative inline-flex items-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-4 py-2.5 text-[13px] font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-[2]">Automate my workflow</span>
            <ArrowRightIcon className="relative z-[2] size-[13px]" />
          </button>
        </nav>
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-x-hidden pb-16 md:pb-24">
        {/* Hero */}
        <section className="flex w-full items-center justify-center px-3 pt-2 md:px-5">
          <div
            className="relative w-full max-w-[1400px] overflow-hidden rounded-[20px] border border-white/15 px-6 pb-[60px] pt-[90px] md:px-[70px] md:pb-[72px] md:pt-[110px]"
            style={{
              background:
                "radial-gradient(108% 100% at 100% 100.6%, var(--color-purple) 12.8%, rgb(8,16,40) 69.1%, #000 98.2%)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 z-[1] pointer-events-none opacity-70 bg-repeat bg-[length:400px_auto]"
              style={{ backgroundImage: "url(/textures/stars.svg)" }}
            />
            <div
              aria-hidden
              className="absolute inset-0 z-[2] pointer-events-none"
              style={{
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 64.5%, rgba(0,0,0,0.82) 100%)",
              }}
            />
            <div className="relative z-[5] grid grid-cols-[minmax(0,1fr)_400px] items-center gap-12 max-xl:grid-cols-1 max-xl:gap-10">
              <div className="flex flex-col gap-6">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3.5 py-2 text-sm font-medium text-white/90 backdrop-blur-[5px]">
                  <span className="rounded-full bg-purple px-1.5 py-1 text-[8px] font-bold uppercase tracking-[0.05em]">
                    NEW
                  </span>
                  Personal Workflow Automation
                </span>
                <h1 className="text-[44px] font-medium leading-[0.98em] -tracking-[0.05em] text-white md:text-[66px]">
                  Get your time back.
                  <span className="text-gradient"> Automate your personal busywork.</span>
                </h1>
                <p className="max-w-[620px] text-lg leading-[1.5] text-white/70 max-md:text-base">
                  Your inbox, calendar, notes, finances and follow-ups — running themselves
                  quietly in the background, so you can focus on the work (and life) that
                  actually matters.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="btn-gloss relative inline-flex items-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-[15px] text-sm font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)]"
                  >
                    <span className="relative z-[2]">Automate my workflow</span>
                    <ArrowRightIcon className="relative z-[2] size-[14px]" />
                  </button>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-black/40 px-5 py-[15px] text-sm font-medium text-white/90 backdrop-blur-[5px] transition-colors hover:bg-black/60 hover:text-white"
                  >
                    <WhatsAppIcon className="size-4 fill-white" />
                    WhatsApp us
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-sm text-white/60">
                  <span>No code</span>
                  <span className="text-white/30">·</span>
                  <span>Works with your tools</span>
                  <span className="text-white/30">·</span>
                  <span>Live in days</span>
                </div>
              </div>

              <div className="w-full max-w-[440px] justify-self-end max-xl:justify-self-center">
                <div
                  className="relative overflow-hidden rounded-[18px] border border-white/15 p-2"
                  style={{ background: GLOSS, boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}
                >
                  <div className="overflow-hidden rounded-[12px] border border-white/10">
                    <LazyVideo
                      src="/videos/mockup-1.mp4"
                      poster="/videos/mockup-1.jpg"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="w-full max-w-[1180px] px-5 py-10 md:px-10">
          <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-[14px] border border-white/10 p-5 text-center"
                style={{ background: GLOSS }}
              >
                <div className="text-3xl font-semibold text-gradient">{s.value}</div>
                <div className="mt-1 text-sm text-white/60">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Problem */}
        <section className="w-full max-w-[900px] px-5 py-12 md:px-10 md:py-16">
          <div className="mb-8 text-center">
            <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-purple">
              Sound familiar?
            </p>
            <h2 className="text-[30px] font-medium -tracking-[0.04em] leading-[1.05em] text-white md:text-[42px]">
              You didn&apos;t come this far to live in your inbox.
            </h2>
          </div>
          <div className="mx-auto flex max-w-[700px] flex-col gap-4">
            {PROBLEMS.map((p) => (
              <div key={p} className="flex items-start gap-3">
                <span className="mt-1 text-red-400/70" aria-hidden>✕</span>
                <p className="text-lg leading-relaxed text-white/75 max-md:text-base">{p}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-[640px] text-center text-lg text-white/70">
            It&apos;s not that you&apos;re disorganised — it&apos;s that the busywork was never
            yours to do. <span className="text-white font-medium">Let automation take it off your plate.</span>
          </p>
        </section>

        {/* What we automate for you */}
        <section className="w-full max-w-[1180px] px-5 py-12 md:px-10 md:py-16">
          <div className="mb-10 text-center">
            <p className="mb-3 inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-purple">
              What we automate for you
            </p>
            <h2 className="text-[34px] font-medium -tracking-[0.04em] leading-[1.05em] text-white md:text-[44px]">
              The repetitive stuff you shouldn&apos;t be doing by hand.
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
            {CARDS.map((c) => (
              <article
                key={c.title}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-[14px] border border-white/12 p-6 transition-colors hover:border-white/25"
                style={{ background: GLOSS }}
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
                  <img
                    src={c.bg}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-[0.14] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(8,12,30,0.6) 0%, rgba(3,6,16,0.9) 60%, rgba(0,0,0,0.96) 100%)",
                    }}
                  />
                </div>
                <div
                  className="relative z-[1] flex size-11 items-center justify-center rounded-[10px] border border-white/15 text-white"
                  style={{ background: "radial-gradient(120% 100% at 50% 0%, rgba(72,118,255,0.45), rgba(0,0,0,0.6))" }}
                >
                  <c.icon className="size-5" />
                </div>
                <div className="relative z-[1]">
                  <h3 className="text-xl font-medium text-white">{c.title}</h3>
                  <p className="mt-1 text-[15px] font-medium text-gradient">{c.hook}</p>
                  <p className="mt-2 text-sm leading-[1.55] text-white/65">{c.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Feature band: built around your tools */}
        <MockupBand
          src="/videos/mockup-2.mp4"
          poster="/videos/mockup-2.jpg"
          eyebrow="Built around you"
          title="Works with the apps you already use"
          text="Gmail, Outlook, Notion, Google Calendar, WhatsApp, your notes and your bank feeds — we connect them into quiet little automations that run themselves. No new app to learn."
        />

        {/* How it works */}
        <section className="w-full max-w-[1180px] px-5 py-12 md:px-10 md:py-16">
          <div className="mb-10 text-center">
            <h2 className="text-[30px] font-medium -tracking-[0.04em] text-white md:text-[40px]">
              Three steps. Zero overwhelm.
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative overflow-hidden rounded-[16px] border border-white/12 p-6" style={{ background: GLOSS }}>
                <div aria-hidden className="pointer-events-none absolute inset-0 z-0 opacity-40" style={GRID_OVERLAY} />
                <div className="relative z-[1] flex items-center justify-between">
                  <span className="text-[36px] font-semibold leading-none text-gradient">0{s.n}</span>
                  {i < STEPS.length - 1 ? <span className="text-xl text-purple/50 max-md:hidden">→</span> : <CheckIcon className="size-5 text-[#5dcaa5] max-md:hidden" />}
                </div>
                <h3 className="relative z-[1] mt-3 text-lg font-medium text-white">{s.title}</h3>
                <p className="relative z-[1] mt-2 text-[14px] leading-[1.55] text-white/65">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature band: the before */}
        <MockupBand
          src="/videos/mockup-3.mp4"
          poster="/videos/mockup-3.jpg"
          eyebrow="The before"
          title="Stop drowning in little tasks"
          text="Copy-pasting between apps, chasing replies, re-typing the same things, hunting for that one note. It adds up to hours a week — and it's exactly the kind of work automation makes disappear."
          reverse
        />

        {/* Testimonials */}
        <section className="w-full max-w-[1180px] px-5 py-12 md:px-10 md:py-16">
          <div className="mb-10 flex flex-col items-center gap-4 text-center">
            <p className="inline-flex items-center rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.1em] text-purple">
              Voices
            </p>
            <h2 className="text-[30px] font-medium -tracking-[0.04em] text-white md:text-[42px]">
              People who got their time back.
            </h2>
            <div className="flex items-center gap-2">
              <span className="flex items-center text-[#ffd166]"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></span>
              <span className="text-sm font-medium text-white">4.9/5</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            {testimonials.map((t, i) => (
              <article
                key={t.name}
                className="relative flex flex-col gap-5 overflow-hidden rounded-[14px] border border-white/12 p-7"
                style={{
                  background:
                    i === 1
                      ? "radial-gradient(120% 100% at 50% 0%, rgba(72,118,255,0.42), rgba(0,0,0,0.85) 65%)"
                      : "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)",
                }}
              >
                <div className="flex items-center gap-0.5 text-[#ffd166]"><StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon /></div>
                <p className="text-base leading-[1.5em] text-white/90">&ldquo;{t.quote}&rdquo;</p>
                <span className="self-start rounded-full border border-purple/40 bg-purple/15 px-2.5 py-1 text-[12px] font-medium text-purple">
                  {t.metric}
                </span>
                <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-3">
                  <div
                    className="flex size-10 items-center justify-center rounded-full border border-white/15 text-sm font-semibold text-white"
                    style={{ background: "radial-gradient(120% 100% at 50% 0%, rgba(96,142,255,0.42), rgba(72,118,255,0.35), rgba(0,0,0,0.6))" }}
                  >
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-medium text-white">{t.name}</span>
                    <span className="text-[12px] text-white/55">{t.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Feature band: always on */}
        <MockupBand
          src="/videos/mockup-4.mp4"
          poster="/videos/mockup-4.jpg"
          eyebrow="Always on"
          title="It runs while you live your life"
          text="Once it's set up, it just works — quietly, in the background, 24/7. We keep an eye on it and tweak it as your routine changes, so you never think about it again."
        />

        {/* Signup form */}
        <section id="start" className="w-full max-w-[520px] px-5 py-12 md:py-16">
          <div className="mb-2 flex items-center justify-center gap-2 text-[#ffd166]">
            <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
          </div>
          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 rounded-[18px] border border-[#25D366]/40 bg-[#1d9e75]/10 p-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-[#1d9e75]/30">
                <CheckIcon className="size-6 text-white" />
              </div>
              <h3 className="text-2xl font-medium text-white">You&apos;re in! 🎉</h3>
              <p className="text-[15px] leading-relaxed text-white/80">
                <span className="font-semibold text-white">Want it sorted today?</span> Message us
                on WhatsApp now — we usually reply in <span className="font-semibold text-[#5dcaa5]">a few minutes</span>.
                Your details are already filled in, just hit send.
              </p>
              <a
                href={waPrefilledHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-[12px] bg-[#25D366] px-6 py-4 text-base font-semibold text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-transform hover:scale-[1.02] active:scale-95"
              >
                <WhatsAppIcon className="size-6 fill-white" />
                Continue on WhatsApp →
              </a>
              <p className="text-[12px] text-white/45">
                Prefer email? We&apos;ll also reach out there shortly.
              </p>
            </div>
          ) : (
            <div
              className="rounded-[18px] border border-white/12 p-6 md:p-8"
              style={{ background: "linear-gradient(180deg, rgba(18,38,96,.45) 0%, rgba(0,0,0,.9) 100%)" }}
            >
              <h2 className="text-center text-[24px] font-medium text-white">
                Automate your workflow — free audit
              </h2>
              <p className="mt-1 text-center text-sm text-white/55">
                Tell us where to reach you. No cost, no commitment.
              </p>
              <form onSubmit={onSubmit} noValidate className="mt-5 flex flex-col gap-3">
                <input
                  value={form.name}
                  onChange={onChange("name")}
                  placeholder="Your name"
                  autoComplete="name"
                  className="w-full rounded-lg border border-white/15 bg-black/40 p-3.5 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                />
                <input
                  value={form.email}
                  onChange={onChange("email")}
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="w-full rounded-lg border border-white/15 bg-black/40 p-3.5 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                />
                <PhoneInput
                  countryCode={countryCode}
                  nationalNumber={nationalNumber}
                  onCountryChange={(c) => updatePhone(c, nationalNumber)}
                  onNumberChange={(n) => updatePhone(countryCode, n)}
                />
                <textarea
                  value={form.requirement}
                  onChange={(e) => setForm((p) => ({ ...p, requirement: e.target.value }))}
                  placeholder="What do you want to automate? (e.g. inbox, scheduling, invoices…)"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-white/15 bg-black/40 p-3.5 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                />
                {error ? <p className="text-[13px] text-red-300/90">{error}</p> : null}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-gloss relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/80 px-5 py-3.5 text-sm font-semibold text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)] disabled:opacity-60"
                >
                  <span className="relative z-[2]">
                    {status === "submitting" ? "Sending…" : "Get my free automation audit"}
                  </span>
                </button>
              </form>
            </div>
          )}
        </section>
      </main>

      <Suspense fallback={<div className="h-40" aria-hidden="true" />}>
        <Footer />
      </Suspense>

      {/* Floating WhatsApp button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 right-5 z-[120] flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(0,0,0,0.45)] ring-1 ring-black/10 transition-transform hover:scale-105 active:scale-95"
      >
        <WhatsAppIcon className="size-7 fill-white" />
      </a>
    </>
  );
}
