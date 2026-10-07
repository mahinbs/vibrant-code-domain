import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Navigate, useParams } from "react-router-dom";
import QRCode from "qrcode";
import { submitStrategyCallLead } from "../lib/submitLead";
import { trackMetaConversion } from "@/lib/analytics/metaConversion";
import { SeoShell, absUrl } from "./SeoShell";
import { FaqSection, GLOSS, HubGrid, RelatedLinks, Section, SeoHero, faqJsonLd } from "./blocks";
import type { Faq } from "./types";

/* ------------------------------- helpers ------------------------------- */

type Currency = "INR" | "USD";
const fmt = (n: number, c: Currency) =>
  new Intl.NumberFormat(c === "INR" ? "en-IN" : "en-US", { style: "currency", currency: c, maximumFractionDigits: 0 }).format(
    Number.isFinite(n) ? Math.max(0, Math.round(n)) : 0,
  );
const num = (v: string) => {
  const n = parseFloat(v.replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const INPUT =
  "w-full rounded-[10px] border border-white/15 bg-black/50 px-3.5 py-3 text-[15px] text-white placeholder:text-white/35 focus:border-purple/70 focus:outline-none";
const LABEL = "mb-1.5 block text-[13.5px] font-medium text-white/75";

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className={LABEL}>{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-[12.5px] text-white/45">{hint}</span> : null}
    </label>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[16px] border border-white/12 p-5 md:p-7" style={{ background: GLOSS }}>
      {children}
    </div>
  );
}

function Stat({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="rounded-[12px] border border-white/10 bg-black/40 p-4">
      <p className="text-[12.5px] uppercase tracking-[0.08em] text-white/50">{label}</p>
      <p className={`mt-1 font-medium ${strong ? "impact-highlight text-[28px]" : "text-[22px] text-white"}`}>{value}</p>
    </div>
  );
}

function CurrencyToggle({ value, onChange }: { value: Currency; onChange: (c: Currency) => void }) {
  return (
    <div role="radiogroup" aria-label="Currency" className="inline-flex rounded-full border border-white/15 bg-black/50 p-1">
      {(["INR", "USD"] as const).map((c) => (
        <button
          key={c}
          type="button"
          role="radio"
          aria-checked={value === c}
          onClick={() => onChange(c)}
          className={`rounded-full px-4 py-1.5 text-[13.5px] font-medium ${value === c ? "bg-purple/70 text-white" : "text-white/60"}`}
        >
          {c === "INR" ? "₹ INR" : "$ USD"}
        </button>
      ))}
    </div>
  );
}

/**
 * WhatsApp-number capture under every tool. Writes a lead (source "tool:<slug>")
 * to the CRM with the tool's result attached, alerts the team on Telegram and
 * fires the Meta Lead event.
 */
function ToolLeadCapture({ slug, summary, cta }: { slug: string; summary: string; cta: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 8) {
      setError("Enter your name and a WhatsApp number with country code.");
      return;
    }
    setState("sending");
    setError("");
    const sourcePage = `tool:${slug}`;
    const res = await submitStrategyCallLead({ name, email: "", phone, sourcePage, requirement: summary, consent_whatsapp: true, consent_at: new Date().toISOString() });
    if (res.ok) {
      trackMetaConversion({ eventName: "Lead", phone, sourcePage });
      setState("done");
    } else {
      setState("error");
      setError(res.error ?? "Something went wrong. Try again or WhatsApp us.");
    }
  }

  if (state === "done") {
    return (
      <Panel>
        <p className="text-[18px] font-medium text-white">Thanks, {name.split(" ")[0]}. Your result is with our team.</p>
        <p className="mt-2 text-[14.5px] text-white/65">Our team will WhatsApp you the full plan.</p>
      </Panel>
    );
  }
  return (
    <Panel>
      <p className="text-[18px] font-medium text-white">{cta}</p>
      <p className="mt-1.5 text-[14px] text-white/60">Leave your WhatsApp number and our team will send you the full plan built on these numbers. No spam.</p>
      <form onSubmit={onSubmit} className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <input className={INPUT} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-label="Your name" />
        <input className={INPUT} placeholder="WhatsApp number, e.g. +91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" inputMode="tel" aria-label="WhatsApp number" />
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn-gloss rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3 text-[15px] font-semibold text-white disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send me the plan"}
        </button>
      </form>
      {error ? <p className="mt-3 text-[13.5px] text-red-300">{error}</p> : null}
      <p className="mt-3 text-[12px] text-white/40">By sending, you agree we can contact you on WhatsApp about this plan. See our privacy policy.</p>
    </Panel>
  );
}

/* ------------------------- Ad budget calculator ------------------------ */

function AdBudgetTool() {
  const [cur, setCur] = useState<Currency>("INR");
  const [clients, setClients] = useState("10");
  const [close, setClose] = useState("10");
  const [cpl, setCpl] = useState("400");
  const [deal, setDeal] = useState("50000");

  useEffect(() => {
    // Sensible starting assumptions per currency; the user should replace them with their own numbers.
    setCpl(cur === "INR" ? "400" : "25");
    setDeal(cur === "INR" ? "50000" : "1500");
  }, [cur]);

  const r = useMemo(() => {
    const c = num(clients);
    const rate = Math.min(Math.max(num(close), 0.1), 100) / 100;
    const leads = Math.ceil(c / rate);
    const budget = leads * num(cpl);
    const revenue = c * num(deal);
    return { leads, budget, revenue, daily: budget / 30, roas: budget > 0 ? revenue / budget : 0 };
  }, [clients, close, cpl, deal]);

  const summary = `Ad budget calculator: ${clients} clients/month, ${close}% close rate, CPL ${fmt(num(cpl), cur)}, deal ${fmt(num(deal), cur)} → ${r.leads} leads, budget ${fmt(r.budget, cur)}/month`;

  return (
    <>
      <Panel>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[16px] font-medium text-white">Your numbers</p>
          <CurrencyToggle value={cur} onChange={setCur} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="New clients you want each month">
            <input className={INPUT} inputMode="numeric" value={clients} onChange={(e) => setClients(e.target.value)} />
          </Field>
          <Field label="Close rate: % of leads that become clients" hint="Not sure? Count last month's leads and deals. 5–20% is common for enquiry-based businesses.">
            <input className={INPUT} inputMode="decimal" value={close} onChange={(e) => setClose(e.target.value)} />
          </Field>
          <Field label="Expected cost per lead" hint="A starting assumption. Use your own past cost per lead if you have it.">
            <input className={INPUT} inputMode="decimal" value={cpl} onChange={(e) => setCpl(e.target.value)} />
          </Field>
          <Field label="Average value of one client">
            <input className={INPUT} inputMode="decimal" value={deal} onChange={(e) => setDeal(e.target.value)} />
          </Field>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Monthly ad budget" value={fmt(r.budget, cur)} strong />
          <Stat label="About a day" value={fmt(r.daily, cur)} />
          <Stat label="Leads needed" value={String(r.leads)} />
          <Stat label="Revenue per ₹/$ spent" value={r.roas ? `${r.roas.toFixed(1)}×` : "—"} />
        </div>
        <p className="mt-4 text-[13px] text-white/45">
          An estimate, not a promise. Your real cost per lead depends on your market, offer and creative, and it changes week to week.
        </p>
      </Panel>
      <div className="mt-6">
        <ToolLeadCapture slug="ad-budget-calculator" summary={summary} cta="Want this split across Meta, Google and LinkedIn for your business?" />
      </div>
    </>
  );
}

/* ----------------------- Lead response calculator ---------------------- */

const RESPONSE_BUCKETS = [
  { id: "5m", label: "Under 5 minutes", loss: 0 },
  { id: "30m", label: "5 to 30 minutes", loss: 10 },
  { id: "2h", label: "30 minutes to 2 hours", loss: 25 },
  { id: "day", label: "Same day", loss: 40 },
  { id: "next", label: "Next day or later", loss: 60 },
];

function LeadResponseTool() {
  const [cur, setCur] = useState<Currency>("INR");
  const [leads, setLeads] = useState("200");
  const [bucket, setBucket] = useState("day");
  const [loss, setLoss] = useState("40");
  const [close, setClose] = useState("10");
  const [deal, setDeal] = useState("50000");

  useEffect(() => setDeal(cur === "INR" ? "50000" : "1500"), [cur]);

  const r = useMemo(() => {
    const lost = Math.round(num(leads) * (Math.min(num(loss), 100) / 100));
    const clientsLost = lost * (Math.min(num(close), 100) / 100);
    return { lost, clientsLost, revenue: clientsLost * num(deal) };
  }, [leads, loss, close, deal]);

  const summary = `Lead response calculator: ${leads} leads/month, reply time "${RESPONSE_BUCKETS.find((b) => b.id === bucket)?.label}", assumed loss ${loss}% → ${r.lost} leads lost, ~${r.clientsLost.toFixed(1)} clients, ${fmt(r.revenue, cur)}/month`;

  return (
    <>
      <Panel>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[16px] font-medium text-white">Your numbers</p>
          <CurrencyToggle value={cur} onChange={setCur} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Leads you get each month">
            <input className={INPUT} inputMode="numeric" value={leads} onChange={(e) => setLeads(e.target.value)} />
          </Field>
          <Field label="How fast you usually reply to a new lead">
            <select
              className={INPUT}
              value={bucket}
              onChange={(e) => {
                setBucket(e.target.value);
                const b = RESPONSE_BUCKETS.find((x) => x.id === e.target.value);
                if (b) setLoss(String(b.loss));
              }}
            >
              {RESPONSE_BUCKETS.map((b) => (
                <option key={b.id} value={b.id} className="bg-black">
                  {b.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="% of leads that go cold at that speed" hint="Our starting assumption for your reply time. Change it to match what you see.">
            <input className={INPUT} inputMode="decimal" value={loss} onChange={(e) => setLoss(e.target.value)} />
          </Field>
          <Field label="Close rate: % of leads that become clients">
            <input className={INPUT} inputMode="decimal" value={close} onChange={(e) => setClose(e.target.value)} />
          </Field>
          <Field label="Average value of one client">
            <input className={INPUT} inputMode="decimal" value={deal} onChange={(e) => setDeal(e.target.value)} />
          </Field>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Stat label="Revenue lost a month" value={fmt(r.revenue, cur)} strong />
          <Stat label="Leads going cold" value={String(r.lost)} />
          <Stat label="Clients lost" value={r.clientsLost.toFixed(1)} />
        </div>
        <p className="mt-4 text-[13px] text-white/45">An estimate based on the assumptions above. Track your own reply times to make it exact.</p>
      </Panel>
      <div className="mt-6">
        <ToolLeadCapture slug="lead-response-calculator" summary={summary} cta="Want every lead answered on WhatsApp automatically?" />
      </div>
    </>
  );
}

/* ----------------------- WhatsApp link generator ---------------------- */

function WhatsAppLinkTool() {
  const [cc, setCc] = useState("91");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("Hi, I saw your ad and would like to know more.");
  const [qr, setQr] = useState("");
  const [copied, setCopied] = useState(false);

  const digits = `${cc.replace(/\D/g, "")}${phone.replace(/\D/g, "").replace(/^0+/, "")}`;
  const valid = phone.replace(/\D/g, "").length >= 6;
  const link = valid ? `https://wa.me/${digits}${msg.trim() ? `?text=${encodeURIComponent(msg.trim())}` : ""}` : "";

  useEffect(() => {
    if (!link) {
      setQr("");
      return;
    }
    QRCode.toDataURL(link, { width: 480, margin: 2 }).then(setQr).catch(() => setQr(""));
  }, [link]);

  return (
    <>
      <Panel>
        <div className="grid gap-4 md:grid-cols-[120px_1fr]">
          <Field label="Country code">
            <input className={INPUT} inputMode="numeric" value={cc} onChange={(e) => setCc(e.target.value)} aria-label="Country code" />
          </Field>
          <Field label="WhatsApp number">
            <input className={INPUT} inputMode="tel" placeholder="98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Pre-filled message (optional)" hint="The text your customer sees ready to send when they tap the link.">
            <textarea className={`${INPUT} min-h-[90px]`} value={msg} onChange={(e) => setMsg(e.target.value)} />
          </Field>
        </div>
        {link ? (
          <div className="mt-6 grid gap-5 md:grid-cols-[1fr_200px] md:items-start">
            <div>
              <p className={LABEL}>Your link</p>
              <p className="break-all rounded-[10px] border border-white/10 bg-black/50 p-3 font-mono text-[13.5px] text-white">{link}</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(link).then(() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1800);
                    });
                  }}
                  className="rounded-[10px] border border-white/20 bg-purple/70 px-4 py-2.5 text-[14px] font-semibold text-white"
                >
                  {copied ? "Copied" : "Copy link"}
                </button>
                <a href={link} target="_blank" rel="noopener noreferrer" className="rounded-[10px] border border-white/15 px-4 py-2.5 text-[14px] text-white/85">
                  Test it
                </a>
                {qr ? (
                  <a href={qr} download="whatsapp-qr.png" className="rounded-[10px] border border-white/15 px-4 py-2.5 text-[14px] text-white/85">
                    Download QR code
                  </a>
                ) : null}
              </div>
            </div>
            {qr ? <img src={qr} alt="QR code that opens your WhatsApp chat" width={200} height={200} className="rounded-[12px] bg-white p-2" /> : null}
          </div>
        ) : (
          <p className="mt-5 text-[13.5px] text-white/45">Enter your number to get the link and QR code.</p>
        )}
      </Panel>
      <div className="mt-6">
        <ToolLeadCapture
          slug="whatsapp-link-generator"
          summary={`WhatsApp link generator used${valid ? ` for +${digits}` : ""}`}
          cta="Want leads who click this link answered automatically, day and night?"
        />
      </div>
    </>
  );
}

/* -------------------------- Ad copy generator -------------------------- */

function AdCopyTool() {
  const [biz, setBiz] = useState("");
  const [offer, setOffer] = useState("");
  const [who, setWho] = useState("");
  const [where, setWhere] = useState("");
  const [proof, setProof] = useState("");
  const [copied, setCopied] = useState<number | null>(null);

  const b = biz.trim() || "your business";
  const o = offer.trim() || "your offer";
  const w = who.trim() || "people like you";
  const loc = where.trim();
  const inLoc = loc ? ` in ${loc}` : "";
  const p = proof.trim();

  const variants = [
    {
      frame: "Problem → solution",
      headline: `${w[0].toUpperCase()}${w.slice(1)}${inLoc}: stop guessing`,
      text: `Tired of options that don't fit? ${b} offers ${o}${inLoc}.${p ? ` ${p}.` : ""} Message us on WhatsApp and get a straight answer today.`,
    },
    {
      frame: "Direct offer",
      headline: `${o[0].toUpperCase()}${o.slice(1)}${inLoc}`,
      text: `${b} helps ${w} with ${o}.${p ? ` ${p}.` : ""} Tap to chat on WhatsApp. We reply with prices and availability.`,
    },
    {
      frame: "Question hook",
      headline: `Looking for ${o}${inLoc}?`,
      text: `${w[0].toUpperCase()}${w.slice(1)} choose ${b} because we make it simple.${p ? ` ${p}.` : ""} Send us a message and we'll tell you what fits your budget.`,
    },
    {
      frame: "Proof first",
      headline: p ? p : `Why ${w} pick ${b}`,
      text: `${o[0].toUpperCase()}${o.slice(1)} from ${b}${inLoc}. Clear pricing, quick replies, no pressure. Tap "Send message" to start.`,
    },
    {
      frame: "Urgency without hype",
      headline: `Book ${o} this week${inLoc}`,
      text: `Slots with ${b} fill up. Message us now to check this week's availability for ${o}.${p ? ` ${p}.` : ""}`,
    },
  ];
  const ready = biz.trim() && offer.trim();
  const summary = `Ad copy generator: business "${biz}", offer "${offer}", audience "${who}", location "${where}"`;

  return (
    <>
      <Panel>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Business name">
            <input className={INPUT} value={biz} onChange={(e) => setBiz(e.target.value)} placeholder="e.g. Sunrise Interiors" />
          </Field>
          <Field label="What you sell (the offer)">
            <input className={INPUT} value={offer} onChange={(e) => setOffer(e.target.value)} placeholder="e.g. modular kitchens" />
          </Field>
          <Field label="Who it's for">
            <input className={INPUT} value={who} onChange={(e) => setWho(e.target.value)} placeholder="e.g. new home owners" />
          </Field>
          <Field label="City or area (optional)">
            <input className={INPUT} value={where} onChange={(e) => setWhere(e.target.value)} placeholder="e.g. Whitefield, Bengaluru" />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="One true proof point (optional)" hint="Something you can prove: years in business, projects done, a rating. Never invent one — platforms reject misleading ads.">
            <input className={INPUT} value={proof} onChange={(e) => setProof(e.target.value)} placeholder="e.g. 120+ kitchens delivered since 2019" />
          </Field>
        </div>
      </Panel>
      {ready ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {variants.map((v, i) => (
            <Panel key={v.frame}>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/45">{v.frame}</p>
              <p className="mt-2 text-[17px] font-medium text-white">{v.headline}</p>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/70">{v.text}</p>
              <button
                type="button"
                className="mt-4 rounded-[10px] border border-white/15 px-3.5 py-2 text-[13.5px] text-white/85"
                onClick={() => {
                  navigator.clipboard?.writeText(`${v.headline}\n\n${v.text}`).then(() => {
                    setCopied(i);
                    setTimeout(() => setCopied(null), 1800);
                  });
                }}
              >
                {copied === i ? "Copied" : "Copy"}
              </button>
            </Panel>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-[13.5px] text-white/45">Fill in the business name and offer to see five ad variations.</p>
      )}
      <div className="mt-6">
        <ToolLeadCapture slug="ad-copy-generator" summary={summary} cta="Want these tested across Meta, Google and LinkedIn for you?" />
      </div>
    </>
  );
}

/* ------------------------------ tool pages ----------------------------- */

type ToolDef = {
  slug: string;
  name: string;
  card: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  how: string[];
  faqs: Faq[];
  related: { label: string; href: string }[];
  Tool: () => JSX.Element;
};

export const TOOLS: ToolDef[] = [
  {
    slug: "ad-budget-calculator",
    name: "Ad budget calculator",
    card: "Work out the monthly ad budget you need from the number of clients you want.",
    title: "Ad budget calculator: how much to spend on ads",
    description: "Free ad budget calculator. Enter the clients you want, your close rate and cost per lead to see the monthly and daily ad budget you need.",
    h1: "Ad budget calculator",
    intro:
      "Your monthly ad budget = clients you want ÷ close rate × cost per lead. Enter your numbers below to see the budget, the leads you need and what each rupee or dollar brings back.",
    how: [
      "Start from the outcome, not the budget. If you want 10 new clients and one in ten leads becomes a client, you need 100 leads. If a lead costs ₹400, that is ₹40,000 of ad spend a month.",
      "The two numbers that move the answer most are your close rate and your cost per lead. Faster follow-up raises the close rate; better targeting and creative lower the cost per lead. Both are what the acquisition system works on every 20 minutes.",
      "Treat the result as a starting budget for the first month. After two to four weeks you will have your real cost per lead, and you can plug that back in.",
    ],
    faqs: [
      { q: "How much should a small business spend on ads?", a: "Work backwards from the clients you need: clients ÷ close rate × cost per lead. Spending less than that usually means too few leads to judge what works." },
      { q: "What is a normal cost per lead?", a: "It varies a lot by industry, city, platform and offer. Use your own past numbers where you can, and re-run the calculator after the first few weeks of real data." },
      { q: "Is ad spend included in your price?", a: "No. Ad spend is paid directly to the platforms from your own ad accounts. You buy credits from us for what the system does, such as building a campaign or following up a lead." },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "Pricing", href: "/pricing" },
      { label: "Lead response calculator", href: "/tools/lead-response-calculator" },
    ],
    Tool: AdBudgetTool,
  },
  {
    slug: "lead-response-calculator",
    name: "Lead response calculator",
    card: "See how many leads and how much revenue slow replies cost you each month.",
    title: "Lead response time calculator: cost of slow replies",
    description: "Free calculator: see how many leads go cold and how much revenue you lose each month because of slow replies to new enquiries.",
    h1: "Lead response time calculator",
    intro:
      "The slower you reply to a new lead, the more of them go cold or buy elsewhere. Enter your monthly leads, reply speed and deal value to see the revenue slow replies cost you.",
    how: [
      "A lead who just filled your form is comparing options right now. Every hour you wait, more of them have already spoken to someone else.",
      "The calculator multiplies your monthly leads by the share that go cold at your reply speed, then by your close rate and deal value. The cold-lead percentages are our starting assumptions; change them to match what you see.",
      "The fix is not working longer hours. It is an automatic first reply on WhatsApp the moment a lead arrives, with a person stepping in once the lead is warm.",
    ],
    faqs: [
      { q: "How fast should I reply to a new lead?", a: "As fast as you can, ideally within minutes while the person is still on their phone. An automatic WhatsApp reply makes that possible at any hour." },
      { q: "Where do the percentages come from?", a: "They are starting assumptions for each reply speed, not measured figures for your business. Edit the percentage field to match your own data." },
      { q: "Can replies be automatic without sounding robotic?", a: "Yes. The first reply asks a short, relevant question about what the lead wants, and your team takes over once the lead is ready to talk." },
    ],
    related: [
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "Leads and CRM", href: "/services/leads-crm" },
      { label: "WhatsApp link generator", href: "/tools/whatsapp-link-generator" },
    ],
    Tool: LeadResponseTool,
  },
  {
    slug: "whatsapp-link-generator",
    name: "WhatsApp link generator",
    card: "Create a wa.me link and QR code that opens a chat with your number and a ready message.",
    title: "WhatsApp link generator with QR code | Free",
    description: "Create a free wa.me click-to-chat link with a pre-filled message, plus a QR code you can download for ads, posters and your website.",
    h1: "WhatsApp link and QR code generator",
    intro:
      "A WhatsApp link (wa.me) opens a chat with your number, with a message already typed. Enter your number and message below to get the link and a QR code to download.",
    how: [
      "The link format is https://wa.me/ followed by your full number with country code and no spaces, plus ?text= and your message. The tool builds it for you and encodes the message correctly.",
      "Use the link on your website, Instagram bio, Google Business Profile and click-to-WhatsApp ads. Print the QR code on posters, visiting cards and shop counters.",
      "Change the pre-filled message for each place you use it, for example \"Hi, I saw your Instagram post\", so you know where each chat came from.",
    ],
    faqs: [
      { q: "Is the WhatsApp link free?", a: "Yes. wa.me links are a free WhatsApp feature and work with both WhatsApp and WhatsApp Business numbers." },
      { q: "Do I include the country code?", a: "Yes. Enter the country code separately (91 for India, 971 for the UAE, 44 for the UK, 1 for the USA) and the number without a leading zero." },
      { q: "Is my number stored?", a: "No. The link and QR code are generated in your browser. We only receive your details if you choose to send them in the form below." },
    ],
    related: [
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "Lead response calculator", href: "/tools/lead-response-calculator" },
      { label: "Ad copy generator", href: "/tools/ad-copy-generator" },
    ],
    Tool: WhatsAppLinkTool,
  },
  {
    slug: "ad-copy-generator",
    name: "Ad copy generator",
    card: "Get five ready-to-test ad variations from your business, offer and audience.",
    title: "Free ad copy generator for Facebook and Google ads",
    description: "Free ad copy generator: enter your business, offer and audience to get five headline and text variations to test on Meta and Google ads.",
    h1: "Ad copy generator",
    intro:
      "Good ad copy names the offer, the audience and one true reason to act. Fill in four short fields and get five variations, each built on a different proven angle, ready to test.",
    how: [
      "Each variation uses a different angle: problem then solution, a direct offer, a question hook, proof first, and urgency without hype. Testing several angles shows you what your market responds to.",
      "Edit the copy before you use it. Add your real prices, dates and details, and only use proof points you can show.",
      "In the acquisition system, AI writes and rotates these variations for you and moves budget to the ones that bring leads.",
    ],
    faqs: [
      { q: "How many ad variations should I test?", a: "Three to five per audience is a good start. Fewer and you learn little; many more and each one gets too little budget to judge." },
      { q: "Can I use this copy for Google ads?", a: "Yes, but Google headlines are limited to 30 characters, so shorten the headline. The text works as a description." },
      { q: "Is the copy written by AI?", a: "This free tool uses proven copy templates filled with your details. Inside the full system, our AI writes and tests the copy for you." },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "Ad budget calculator", href: "/tools/ad-budget-calculator" },
      { label: "WhatsApp link generator", href: "/tools/whatsapp-link-generator" },
    ],
    Tool: AdCopyTool,
  },
];

export function ToolPage({ tool }: { tool: ToolDef }) {
  const path = `/tools/${tool.slug}`;
  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url: absUrl(path),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: tool.description,
  };
  const { Tool } = tool;
  return (
    <SeoShell
      title={tool.title}
      description={tool.description}
      path={path}
      crumbs={[{ label: "Free tools", href: "/tools" }, { label: tool.name, href: path }]}
      jsonLd={[app, faqJsonLd(tool.faqs)]}
    >
      <SeoHero eyebrow="Free tool" h1={tool.h1} intro={tool.intro} actions={<></>} />
      <Section>
        <Tool />
      </Section>
      <Section narrow>
        <h2 className="text-[26px] font-medium leading-[1.15] text-white md:text-[32px]">How it works</h2>
        <div className="mt-5 space-y-4">
          {tool.how.map((h) => (
            <p key={h.slice(0, 24)} className="text-[15px] leading-[1.7] text-white/70 md:text-[16px]">
              {h}
            </p>
          ))}
        </div>
      </Section>
      <FaqSection faqs={tool.faqs} />
      <RelatedLinks links={tool.related} heading="Keep reading" />
    </SeoShell>
  );
}

export function ToolRoute() {
  const { slug } = useParams<{ slug: string }>();
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) return <Navigate to="/tools" replace />;
  return <ToolPage tool={tool} />;
}

export function ToolsHubPage() {
  return (
    <SeoShell
      title="Free marketing tools | BoostMySites"
      description="Free tools for growing businesses: ad budget calculator, lead response calculator, WhatsApp link and QR generator, and ad copy generator."
      path="/tools"
      crumbs={[{ label: "Free tools", href: "/tools" }]}
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Free marketing tools",
          itemListElement: TOOLS.map((t, i) => ({ "@type": "ListItem", position: i + 1, url: absUrl(`/tools/${t.slug}`), name: t.name })),
        },
      ]}
    >
      <SeoHero
        eyebrow="Free tools"
        h1="Free tools to plan your ads and follow-ups"
        intro="Quick calculators and generators for budgets, lead follow-up, WhatsApp links and ad copy. Free to use, no sign-up."
        actions={<></>}
      />
      <Section>
        <HubGrid cards={TOOLS.map((t) => ({ title: t.name, summary: t.card, href: `/tools/${t.slug}`, meta: "Free tool" }))} />
        <p className="mt-6 text-[14px] text-white/50">Coming soon: a free website audit that checks your site for the things that stop visitors becoming leads.</p>
      </Section>
    </SeoShell>
  );
}

export default ToolRoute;
