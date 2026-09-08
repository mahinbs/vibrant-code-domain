import { useMemo, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SiteBackground } from "../components/SiteBackground";
import { Nav } from "../components/Nav";
import { whatsappHref, site } from "../data/site";
import {
  formatInr,
  getPlan,
  getRazorpayKeyId,
  gstAmountInr,
  PAY_PLANS,
  totalInr,
  type PayPlanId,
} from "../lib/razorpayPlans";

const NAV_CTA = { label: "WhatsApp us", href: whatsappHref } as const;

const fieldClass =
  "w-full rounded-[10px] border border-white/15 bg-black/40 px-3.5 py-2.5 text-[14px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-purple/60";

const labelClass = "mb-1.5 block text-[12px] font-medium text-white/55";

type CheckoutForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  gstin: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>('script[src*="checkout.razorpay.com"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(true));
      existing.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function AcquisitionPay() {
  const [planId, setPlanId] = useState<PayPlanId>("yearly");
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    email: "",
    phone: "",
    company: "",
    gstin: "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const plan = useMemo(() => getPlan(planId), [planId]);
  const gst = gstAmountInr(plan.baseInr);
  const total = totalInr(plan.baseInr);
  const keyId = getRazorpayKeyId();

  const setField = (key: keyof CheckoutForm) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Name, email, and phone are required.");
      return;
    }

    if (!keyId) {
      setNotice(
        "Checkout UI is ready. Add VITE_RAZORPAY_KEY_ID (and server secrets) to enable live Razorpay. See the checklist below the form.",
      );
      return;
    }

    setBusy(true);
    try {
      // Placeholder: replace with Supabase edge function create-order.
      // const order = await createRazorpayOrder({ planId, ...form });
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error("Could not load Razorpay Checkout.");
      }

      setNotice(
        "Razorpay key is set, but create-order / verify endpoints are still placeholders. Wire the edge functions next, then payments will open here.",
      );

      // Example options once order API returns { id, amount, currency }:
      // const rzp = new window.Razorpay({
      //   key: keyId,
      //   amount: order.amount,
      //   currency: "INR",
      //   name: site.brand,
      //   description: `AI Client Acquisition — ${plan.label}`,
      //   order_id: order.id,
      //   prefill: { name: form.name, email: form.email, contact: form.phone },
      //   handler: (response) => { verify + redirect /pay/success },
      // });
      // rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment could not start.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Pay · AI Client Acquisition System · Boostmysites</title>
        <meta
          name="description"
          content="Pay for the AI Client Acquisition System in India. Monthly ₹33,333 + GST or yearly ₹99,999 + GST via Razorpay."
        />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <SiteBackground />
      <Nav
        links={[
          { label: "How it works", href: "/#demo" },
          { label: "Features", href: "/#features" },
        ]}
        cta={NAV_CTA}
        whatsappHref={whatsappHref}
      />

      <main className="relative z-10 mx-auto w-full max-w-[1100px] px-5 pb-20 pt-8 md:px-10 md:pb-28 md:pt-12">
        <div className="mb-8 max-w-[640px] md:mb-10">
          <p className="acq-eyebrow impact-highlight inline-flex w-fit items-center rounded-full border border-purple/50 bg-black/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em] backdrop-blur-[5px]">
            India · Razorpay
          </p>
          <h1 className="mt-4 text-[32px] font-medium leading-[1.08] -tracking-[0.04em] text-white max-md:text-[28px] md:text-[44px]">
            Start your <span className="impact-highlight">client acquisition</span> stack
          </h1>
          <p className="mt-3 font-mono text-[14px] leading-relaxed tracking-[0.04em] text-white/60 md:text-[15px]">
            Choose a plan. Prices below are exclusive of GST. You pay the total (base + 18% GST) on Razorpay.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10">
          {/* Plans */}
          <div className="flex flex-col gap-4 order-2 lg:order-1">
            {PAY_PLANS.map((p) => {
              const selected = p.id === planId;
              const pGst = gstAmountInr(p.baseInr);
              const pTotal = totalInr(p.baseInr);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlanId(p.id)}
                  className={[
                    "relative rounded-[16px] border p-5 text-left transition-colors md:p-6",
                    selected
                      ? "border-purple/60 bg-[rgba(72,118,255,0.10)]"
                      : "border-white/12 bg-black/30 hover:border-white/25",
                  ].join(" ")}
                >
                  {p.badge ? (
                    <span className="impact-highlight absolute right-4 top-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">
                      {p.badge}
                    </span>
                  ) : null}
                  <div className="flex items-start gap-3">
                    <span
                      className={[
                        "mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border",
                        selected ? "border-purple bg-purple" : "border-white/30",
                      ].join(" ")}
                      aria-hidden
                    >
                      {selected ? <span className="size-1.5 rounded-full bg-white" /> : null}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.12em] text-white/50">
                        {p.label}
                      </p>
                      <p className="mt-1 text-[28px] font-medium tracking-[-0.02em] text-white md:text-[32px]">
                        {formatInr(p.baseInr)}
                        <span className="ml-2 text-[14px] font-normal text-white/45">+ GST</span>
                      </p>
                      <p className="mt-1 font-mono text-[12px] tracking-[0.04em] text-white/50">
                        GST {formatInr(pGst)} · Total {formatInr(pTotal)}
                      </p>
                      <p className="mt-3 text-[14px] leading-relaxed text-white/65">{p.blurb}</p>
                      <ul className="mt-3 space-y-1.5">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex gap-2 text-[13px] text-white/55">
                            <span className="impact-highlight shrink-0">—</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Checkout */}
          <div className="order-1 rounded-[16px] border border-white/12 bg-black/40 p-5 md:p-6 lg:sticky lg:top-24 lg:order-2 lg:self-start">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Checkout
            </p>
            <p className="mt-2 text-[18px] font-medium text-white">
              {plan.label} · {formatInr(total)}
            </p>
            <dl className="mt-4 space-y-2 border-y border-white/[0.08] py-4 font-mono text-[13px]">
              <div className="flex justify-between gap-4 text-white/55">
                <dt>Base</dt>
                <dd className="text-white/80">{formatInr(plan.baseInr)}</dd>
              </div>
              <div className="flex justify-between gap-4 text-white/55">
                <dt>GST (18%)</dt>
                <dd className="text-white/80">{formatInr(gst)}</dd>
              </div>
              <div className="flex justify-between gap-4 text-[14px] font-semibold text-white">
                <dt>Total payable</dt>
                <dd className="impact-highlight">{formatInr(total)}</dd>
              </div>
            </dl>

            <form className="mt-5 flex flex-col gap-3.5" onSubmit={onSubmit}>
              <div>
                <label className={labelClass} htmlFor="pay-name">
                  Full name *
                </label>
                <input
                  id="pay-name"
                  className={fieldClass}
                  value={form.name}
                  onChange={(e) => setField("name")(e.target.value)}
                  placeholder="Jane Doe"
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="pay-email">
                  Work email *
                </label>
                <input
                  id="pay-email"
                  type="email"
                  className={fieldClass}
                  value={form.email}
                  onChange={(e) => setField("email")(e.target.value)}
                  placeholder="jane@company.com"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="pay-phone">
                  WhatsApp / phone *
                </label>
                <input
                  id="pay-phone"
                  type="tel"
                  className={fieldClass}
                  value={form.phone}
                  onChange={(e) => setField("phone")(e.target.value)}
                  placeholder="98765 43210"
                  autoComplete="tel"
                  required
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="pay-company">
                  Company (optional)
                </label>
                <input
                  id="pay-company"
                  className={fieldClass}
                  value={form.company}
                  onChange={(e) => setField("company")(e.target.value)}
                  placeholder="Acme Pvt Ltd"
                  autoComplete="organization"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="pay-gstin">
                  GSTIN (optional)
                </label>
                <input
                  id="pay-gstin"
                  className={fieldClass}
                  value={form.gstin}
                  onChange={(e) => setField("gstin")(e.target.value.toUpperCase())}
                  placeholder="29ABCDE1234F1Z5"
                  autoComplete="off"
                />
              </div>

              {error ? (
                <p className="rounded-[10px] border border-red-400/40 bg-red-400/10 px-3 py-2 text-[13px] text-red-300">
                  {error}
                </p>
              ) : null}
              {notice ? (
                <p className="rounded-[10px] border border-purple/40 bg-purple/10 px-3 py-2 text-[13px] text-white/80">
                  {notice}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={busy}
                className="btn-gloss relative mt-1 inline-flex w-full items-center justify-center overflow-hidden rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3.5 text-[15px] font-semibold text-white disabled:opacity-60"
              >
                <span className="relative z-[2]">
                  {busy ? "Starting checkout…" : `Pay ${formatInr(total)}`}
                </span>
              </button>

              <p className="text-center font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
                UPI · Cards · Netbanking · Razorpay
              </p>
            </form>

            <div className="mt-6 rounded-[12px] border border-dashed border-white/15 bg-white/[0.02] p-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                Placeholders — send these next
              </p>
              <ul className="mt-2 space-y-1.5 text-[12px] leading-snug text-white/50">
                <li>
                  <code className="text-white/70">VITE_RAZORPAY_KEY_ID</code> — public Key ID
                </li>
                <li>
                  <code className="text-white/70">RAZORPAY_KEY_SECRET</code> — server only
                </li>
                <li>
                  <code className="text-white/70">RAZORPAY_WEBHOOK_SECRET</code> — server only
                </li>
                <li>Company GSTIN + legal name (for invoice)</li>
              </ul>
              <p className="mt-2 text-[11px] text-white/35">
                Key status: {keyId ? "public key detected" : "public key not set (using placeholder flow)"}
              </p>
            </div>

            <p className="mt-4 text-[12px] text-white/40">
              Questions?{" "}
              <a href={whatsappHref} className="text-white/70 underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
                WhatsApp {site.brand}
              </a>
              {" · "}
              <Link to="/" className="text-white/70 underline-offset-2 hover:underline">
                Back to product
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
