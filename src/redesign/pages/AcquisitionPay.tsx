import { useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { whatsappHref, site } from "../data/site";
import {
  formatInr,
  getPlan,
  getRazorpayKeyId,
  gstAmountInr,
  parsePayPlanId,
  PAY_PLANS,
  totalInr,
  type PayPlanId,
} from "../lib/razorpayPlans";
import { createRazorpayOrder, verifyRazorpayPayment } from "../lib/razorpayClient";

const fieldClass =
  "w-full rounded-[12px] border border-white/15 bg-white/5 px-3.5 py-2.5 text-[14px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-[#4e78ff]";

const labelClass = "mb-1.5 block text-[12px] font-medium text-white/55";

const TRUST_ITEMS = [
  "499+ businesses served",
  "Dedicated onboarding team",
  "Secure online payment via Razorpay",
  "GST invoice emailed after payment",
  "Support available after purchase",
] as const;

const NEXT_STEPS = [
  "Payment confirmation",
  "Onboarding",
  "Account setup",
  "Campaign launch",
] as const;

type CheckoutForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  gstin: string;
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: Record<string, unknown>) => void) => void;
    };
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

function PaymentMethods() {
  const methods: { label: string; node: ReactNode }[] = [
    {
      label: "UPI / GPay",
      node: (
        <svg viewBox="0 0 40 24" className="h-5 w-10" aria-hidden>
          <rect width="40" height="24" rx="4" fill="#f4f4f5" />
          <text x="20" y="15.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="#52525b" fontFamily="system-ui,sans-serif">
            UPI
          </text>
        </svg>
      ),
    },
    {
      label: "Visa",
      node: (
        <svg viewBox="0 0 40 24" className="h-5 w-10" aria-hidden>
          <rect width="40" height="24" rx="4" fill="#f4f4f5" />
          <text x="20" y="15.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1a1f71" fontFamily="system-ui,sans-serif">
            VISA
          </text>
        </svg>
      ),
    },
    {
      label: "Mastercard",
      node: (
        <svg viewBox="0 0 40 24" className="h-5 w-10" aria-hidden>
          <rect width="40" height="24" rx="4" fill="#f4f4f5" />
          <circle cx="16" cy="12" r="6" fill="#eb001b" />
          <circle cx="24" cy="12" r="6" fill="#f79e1b" opacity="0.9" />
        </svg>
      ),
    },
    {
      label: "RuPay",
      node: (
        <svg viewBox="0 0 40 24" className="h-5 w-10" aria-hidden>
          <rect width="40" height="24" rx="4" fill="#f4f4f5" />
          <text x="20" y="15.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="#097c3f" fontFamily="system-ui,sans-serif">
            RuPay
          </text>
        </svg>
      ),
    },
    {
      label: "Netbanking",
      node: (
        <svg viewBox="0 0 40 24" className="h-5 w-10" aria-hidden>
          <rect width="40" height="24" rx="4" fill="#f4f4f5" />
          <text x="20" y="15.5" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#52525b" fontFamily="system-ui,sans-serif">
            Bank
          </text>
        </svg>
      ),
    },
    {
      label: "Wallets",
      node: (
        <svg viewBox="0 0 40 24" className="h-5 w-10" aria-hidden>
          <rect width="40" height="24" rx="4" fill="#f4f4f5" />
          <rect x="10" y="7" width="20" height="11" rx="2" fill="none" stroke="#52525b" strokeWidth="1.4" />
          <path d="M22 12.5h6" stroke="#52525b" strokeWidth="1.4" />
        </svg>
      ),
    },
  ];

  return (
    <ul className="mt-4 flex flex-wrap items-center justify-center gap-2" aria-label="Accepted payment methods">
      {methods.map((m) => (
        <li key={m.label} title={m.label} className="opacity-90">
          <span className="sr-only">{m.label}</span>
          {m.node}
        </li>
      ))}
    </ul>
  );
}

export default function AcquisitionPay() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const initialPlan = parsePayPlanId(searchParams.get("plan")) ?? "yearly";
  const [planId, setPlanId] = useState<PayPlanId>(initialPlan);
  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    email: "",
    phone: "",
    company: "",
    gstin: "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plan = useMemo(() => getPlan(planId), [planId]);
  const gst = gstAmountInr(plan.baseInr);
  const total = totalInr(plan.baseInr);
  const keyId = getRazorpayKeyId();

  const setField = (key: keyof CheckoutForm) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Name, email, and phone are required.");
      return;
    }

    setBusy(true);
    try {
      const order = await createRazorpayOrder({
        planId,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim() || undefined,
        gstin: form.gstin.trim() || undefined,
      });

      const checkoutKey = order.keyId || keyId;
      if (!checkoutKey) {
        throw new Error("Razorpay Key ID is missing on the server.");
      }

      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error("Could not load Razorpay Checkout.");
      }

      const rzp = new window.Razorpay({
        key: checkoutKey,
        amount: order.amount,
        currency: order.currency,
        name: site.brand,
        description: `AI Client Acquisition — ${order.planLabel}`,
        order_id: order.orderId,
        prefill: {
          name: form.name.trim(),
          email: form.email.trim(),
          contact: form.phone.trim(),
        },
        notes: {
          plan_id: order.planId,
        },
        theme: { color: "#4e78ff" },
        handler: async (response: Record<string, string>) => {
          try {
            const verified = await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            navigate(verified.redirect || "/pay/success");
          } catch (verifyErr) {
            console.error(verifyErr);
            navigate(
              `/pay/success?order_id=${encodeURIComponent(response.razorpay_order_id)}&payment_id=${encodeURIComponent(response.razorpay_payment_id)}`,
            );
          }
        },
        modal: {
          ondismiss: () => setBusy(false),
        },
      });

      rzp.on("payment.failed", () => {
        setBusy(false);
        navigate("/pay/failed");
      });

      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment could not start.");
      setBusy(false);
    }
  }

  function scrollToPayForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const orderSummary = (
    <div className="rounded-[18px] border border-black/[0.06] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] md:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400">Your Order</p>
        {plan.badge ? (
          <span className="rounded-full bg-[#4e78ff]/10 px-2.5 py-1 text-[11px] font-semibold text-[#4e78ff]">
            {plan.badge}
          </span>
        ) : null}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-1 rounded-[12px] bg-zinc-100 p-1">
        {PAY_PLANS.map((p) => {
          const selected = p.id === planId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlanId(p.id)}
              className={[
                "rounded-[10px] px-3 py-2.5 text-[13px] font-medium transition-colors",
                selected ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-800",
              ].join(" ")}
            >
              {p.label}
              <span className="mt-0.5 block text-[11px] font-normal text-zinc-400">{formatInr(totalInr(p.baseInr))}</span>
            </button>
          );
        })}
      </div>

      <h2 className="mt-5 text-[18px] font-semibold tracking-[-0.02em] text-zinc-900">
        AI Client Acquisition — {plan.label}
      </h2>
      <p className="mt-1 text-[13px] text-zinc-500">{plan.period}</p>

      <ul className="mt-4 space-y-2.5 border-t border-zinc-100 pt-4">
        {plan.checkoutItems.map((item) => (
          <li key={item} className="flex gap-2.5 text-[14px] text-zinc-600">
            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#4e78ff]/10 text-[10px] font-bold text-[#4e78ff]">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      <dl className="mt-5 space-y-2 border-t border-zinc-100 pt-4 text-[13px]">
        <div className="flex justify-between gap-4 text-zinc-500">
          <dt>Base</dt>
          <dd className="text-zinc-800">{formatInr(plan.baseInr)}</dd>
        </div>
        <div className="flex justify-between gap-4 text-zinc-500">
          <dt>GST (18%)</dt>
          <dd className="text-zinc-800">{formatInr(gst)}</dd>
        </div>
        <div className="flex justify-between gap-4 text-[15px] font-semibold text-zinc-900">
          <dt>Total today</dt>
          <dd>{formatInr(total)}</dd>
        </div>
      </dl>
    </div>
  );

  const trustBlock = (
    <div className="rounded-[18px] border border-black/[0.06] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] md:p-6">
      <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-zinc-900">You&apos;re in safe hands</h3>
      <ul className="mt-4 space-y-2.5">
        {TRUST_ITEMS.map((item) => (
          <li key={item} className="flex gap-2.5 text-[14px] text-zinc-600">
            <span className="mt-0.5 shrink-0 text-[#4e78ff]" aria-hidden>
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  const nextSteps = (
    <div className="rounded-[18px] border border-black/[0.06] bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] md:p-6">
      <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-zinc-900">What happens next?</h3>
      <ol className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-2">
        {NEXT_STEPS.map((step, i) => (
          <li key={step} className="flex items-center gap-2 text-[13px] text-zinc-600">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[11px] font-semibold text-zinc-700">
              {i + 1}
            </span>
            {step}
            {i < NEXT_STEPS.length - 1 ? (
              <span className="hidden text-zinc-300 sm:inline" aria-hidden>
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );

  const paymentCard = (
    <div
      id="pay-card"
      className="rounded-[18px] p-5 text-white shadow-[0_20px_50px_rgba(11,18,32,0.35)] md:p-6"
      style={{ background: "linear-gradient(165deg, #121a2b 0%, #0b1220 55%, #0a101c 100%)" }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">Complete your order</p>
      <p className="mt-2 text-[15px] leading-relaxed text-white/65">
        Everything is ready. Complete the payment below to activate your service.
      </p>

      <div className="mt-5 rounded-[14px] border border-white/10 bg-white/[0.04] px-4 py-3.5">
        <p className="text-[12px] text-white/45">Amount due</p>
        <p className="mt-0.5 text-[28px] font-semibold tracking-[-0.03em] text-white md:text-[32px]">
          {formatInr(total)}
        </p>
        <p className="mt-1 text-[13px] text-white/55">
          For: AI Client Acquisition — {plan.label}
        </p>
      </div>

      <form ref={formRef} className="mt-5 flex flex-col gap-3.5" onSubmit={onSubmit}>
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
          <p className="rounded-[12px] border border-red-400/40 bg-red-400/10 px-3 py-2 text-[13px] text-red-300">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#4e78ff] px-5 py-3.5 text-[15px] font-semibold text-white transition-opacity hover:opacity-95 disabled:opacity-60"
        >
          {busy ? "Opening Razorpay…" : `Pay ${formatInr(total)} Securely →`}
        </button>

        <p className="text-center text-[12px] leading-relaxed text-white/45">
          Your payment information is encrypted and securely processed.
          <br />
          You&apos;ll receive confirmation and onboarding instructions immediately after successful payment.
        </p>

        <p className="text-center text-[11px] font-medium uppercase tracking-[0.1em] text-white/35">
          Secure checkout · Razorpay
        </p>

        <PaymentMethods />
      </form>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Pay · AI Client Acquisition System · Boostmysites</title>
        <meta
          name="description"
          content="Complete your payment for the AI Client Acquisition System. Secure checkout via Razorpay."
        />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#f7f7f5] text-zinc-900">
        <header className="border-b border-black/[0.06] bg-[#f7f7f5]/90 backdrop-blur-sm">
          <div className="mx-auto flex h-14 w-full max-w-[1100px] items-center justify-between px-5 md:h-16 md:px-10">
            <Link to="/" className="flex items-center gap-2" aria-label={`${site.brand} home`}>
              <img src="/bms-logo.png" alt="" className="h-7 w-7 object-contain" />
              <span className="text-[15px] font-semibold tracking-[-0.02em] text-zinc-900">{site.brand}</span>
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline"
            >
              WhatsApp us
            </a>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1100px] px-5 pb-28 pt-8 md:px-10 md:pb-16 md:pt-12">
          <div className="max-w-[640px]">
            <h1 className="text-[30px] font-semibold leading-[1.1] tracking-[-0.04em] text-zinc-900 max-md:text-[28px] md:text-[40px]">
              Complete Your Payment
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-zinc-500 md:text-[16px]">
              You&apos;re one step away from getting started with {site.brand}.
            </p>
            <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[12px] font-medium text-zinc-500 md:text-[13px]">
              <span>Secure Payment</span>
              <span className="text-zinc-300" aria-hidden>
                ·
              </span>
              <span>Instant Confirmation</span>
              <span className="text-zinc-300" aria-hidden>
                ·
              </span>
              <span>Dedicated Support</span>
            </p>
          </div>

          {/* Mobile: payment first */}
          <div className="mt-8 lg:hidden">{paymentCard}</div>

          <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-10">
            <div className="flex flex-col gap-5">
              {orderSummary}
              {trustBlock}
              {nextSteps}
              <p className="text-[12px] text-zinc-400">
                Questions?{" "}
                <a
                  href={whatsappHref}
                  className="text-zinc-600 underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp {site.brand}
                </a>
                {" · "}
                <Link to="/" className="text-zinc-600 underline-offset-2 hover:underline">
                  Back to product
                </Link>
              </p>
            </div>

            <div className="hidden lg:sticky lg:top-8 lg:block lg:self-start">{paymentCard}</div>
          </div>
        </main>

        {/* Mobile sticky CTA */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.08] bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-[1100px] items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] text-zinc-500">Total today</p>
              <p className="text-[17px] font-semibold tracking-[-0.02em] text-zinc-900">{formatInr(total)}</p>
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                scrollToPayForm();
                formRef.current?.requestSubmit();
              }}
              className="shrink-0 rounded-[12px] bg-[#4e78ff] px-4 py-3 text-[14px] font-semibold text-white disabled:opacity-60"
            >
              {busy ? "Opening…" : "Pay Securely →"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
