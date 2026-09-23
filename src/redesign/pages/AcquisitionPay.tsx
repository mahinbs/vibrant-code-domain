import { useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SiteBackground } from "../components/SiteBackground";
import { Nav, type NavLinkItem } from "../components/Nav";
import { whatsappHref, site } from "../data/site";
import {
  DIGITAL_USD,
  formatInr,
  formatUsd,
  getPlan,
  getRazorpayKeyId,
  gstAmountInr,
  parsePayPlanId,
  PAY_PLANS,
  totalInr,
  type PayPlanId,
} from "../lib/razorpayPlans";
import { createRazorpayOrder, verifyRazorpayPayment } from "../lib/razorpayClient";
import { createStripeCheckout } from "../lib/stripeClient";
import { useCheckoutRegion } from "../lib/checkoutRegion";

const fieldClass =
  "w-full rounded-[12px] border border-white/25 bg-white/15 px-3.5 py-2.5 text-[14px] text-white outline-none transition-colors placeholder:text-white/50 focus:border-white focus:bg-white/20";

const labelClass = "mb-1.5 block text-[12px] font-medium text-white/80";

const GLOSS =
  "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.5) 100%)";

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

const NAV_LINKS: ReadonlyArray<NavLinkItem> = [
  {
    label: "Services",
    dropdown: [
      { label: "AI Client Acquisition System", href: "/" },
      { label: "AI Automation", href: "/business-automation" },
      { label: "Digital Transformation", href: "/digital-transformation" },
    ],
  },
  { label: "How it works", href: "/#demo" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Log in", href: site.productUrl, external: true },
];

const NAV_CTA = { label: "Get my acquisition plan", href: "/#contact-form" } as const;

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

function CardMark({ label, fill = "#52525b", size = "8" }: { label: string; fill?: string; size?: string }) {
  return (
    <svg viewBox="0 0 40 24" className="h-5 w-10" aria-hidden>
      <rect width="40" height="24" rx="4" fill="#f4f4f5" />
      <text x="20" y="15.5" textAnchor="middle" fontSize={size} fontWeight="700" fill={fill} fontFamily="system-ui,sans-serif">
        {label}
      </text>
    </svg>
  );
}

function PaymentMethods({ variant }: { variant: "razorpay" | "stripe" }) {
  const methods: { label: string; node: ReactNode }[] =
    variant === "stripe"
      ? [
          { label: "Visa", node: <CardMark label="VISA" fill="#1a1f71" size="9" /> },
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
          { label: "American Express", node: <CardMark label="AMEX" fill="#2e77bc" size="7" /> },
          { label: "Apple Pay", node: <CardMark label="Apple" fill="#111" size="7" /> },
          { label: "Google Pay", node: <CardMark label="GPay" fill="#1a73e8" size="7" /> },
        ]
      : [
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
    { label: "Visa", node: <CardMark label="VISA" fill="#1a1f71" size="9" /> },
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
  const { isIndia } = useCheckoutRegion();

  const plan = useMemo(() => getPlan(planId), [planId]);
  const gst = gstAmountInr(plan.baseInr);
  const total = totalInr(plan.baseInr);
  const keyId = getRazorpayKeyId();
  const isDigital = planId === "digital";
  const useStripe = isDigital && !isIndia;
  const displayTotal = useStripe ? formatUsd(DIGITAL_USD) : formatInr(total);
  const processorName = useStripe ? "Stripe" : "Razorpay";
  const productHome = isDigital ? "/digital-transformation" : "/";
  const nextStepsItems = isDigital
    ? (["Payment confirmation", "Onboarding call", "Build kickoff", "Go live"] as const)
    : NEXT_STEPS;
  const trustItems = useStripe
    ? ([
        "499+ businesses served",
        "Dedicated onboarding team",
        "Secure online payment via Stripe",
        "Receipt emailed after payment",
        "Support available after purchase",
      ] as const)
    : TRUST_ITEMS;

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
      if (useStripe) {
        const session = await createStripeCheckout({
          planId: "digital",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          company: form.company.trim() || undefined,
        });
        window.location.assign(session.url);
        return;
      }

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
        description: `${plan.productName} · ${order.planLabel}`,
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
              `/pay/success?order_id=${encodeURIComponent(response.razorpay_order_id)}&payment_id=${encodeURIComponent(response.razorpay_payment_id)}&plan=${encodeURIComponent(planId)}`,
            );
          }
        },
        modal: {
          ondismiss: () => setBusy(false),
        },
      });

      rzp.on("payment.failed", () => {
        setBusy(false);
        navigate(`/pay/failed?plan=${encodeURIComponent(planId)}`);
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
    <div className="rounded-[18px] border border-purple/35 p-5 md:p-6" style={{ background: GLOSS }}>
      <div className="flex items-center justify-between gap-3">
        <p className="impact-highlight font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">Your Order</p>
        {plan.badge ? (
          <span className="impact-highlight font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">
            {plan.badge}
          </span>
        ) : null}
      </div>

      {!isDigital ? (
      <div className="mt-4 grid grid-cols-2 gap-1 rounded-[12px] bg-black/40 p-1">
        {PAY_PLANS.map((p) => {
          const selected = p.id === planId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlanId(p.id)}
              className={[
                "rounded-[10px] px-3 py-3 text-center transition-colors",
                selected
                  ? "pay-plan-selected text-white"
                  : "border border-transparent text-white/45 hover:text-white/75",
              ].join(" ")}
            >
              <span className="block text-[11px] font-medium uppercase tracking-[0.08em]">{p.label}</span>
              <span
                className={[
                  "mt-1.5 block text-[20px] font-semibold leading-none tracking-[-0.03em] md:text-[22px]",
                  selected ? "text-white" : "text-white/55",
                ].join(" ")}
              >
                {formatInr(p.baseInr)}
                <span className="ml-1 text-[11px] font-normal tracking-normal text-white/45">+ GST</span>
              </span>
            </button>
          );
        })}
      </div>
      ) : null}

      <h2 className="mt-5 text-[18px] font-medium -tracking-[0.02em] text-white">
        {plan.productName} · {plan.label}
      </h2>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="text-[28px] font-semibold tracking-[-0.03em] text-white md:text-[32px]">
          {useStripe ? formatUsd(DIGITAL_USD) : formatInr(plan.baseInr)}
          {useStripe ? null : <span className="ml-2 text-[13px] font-normal text-white/45">+ GST</span>}
        </p>
        <p className="impact-highlight font-mono text-[12px] tracking-[0.04em] md:text-[13px]">{plan.period}</p>
      </div>

      <dl className="mt-4 space-y-2 border-t border-purple/20 pt-4 font-mono text-[13px]">
        {useStripe ? (
          <div className="flex justify-between gap-4 text-[14px] font-semibold text-white">
            <dt>Total today</dt>
            <dd className="impact-highlight">{formatUsd(DIGITAL_USD)}</dd>
          </div>
        ) : (
          <>
            <div className="flex justify-between gap-4 text-white/50">
              <dt>Base</dt>
              <dd className="text-white/85">{formatInr(plan.baseInr)}</dd>
            </div>
            <div className="flex justify-between gap-4 text-white/50">
              <dt>GST (18%)</dt>
              <dd className="text-white/85">{formatInr(gst)}</dd>
            </div>
            <div className="flex justify-between gap-4 text-[14px] font-semibold text-white">
              <dt>Total today</dt>
              <dd className="impact-highlight">{formatInr(total)}</dd>
            </div>
          </>
        )}
      </dl>

      <ul className="mt-4 hidden space-y-2.5 border-t border-purple/20 pt-4 lg:block">
        {plan.checkoutItems.map((item) => (
          <li key={item} className="flex gap-2.5 text-[14px] text-white/75">
            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#4e78ff]/20 text-[10px] font-bold text-[#7c97ff]">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      <details className="mt-4 border-t border-purple/20 pt-3 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 text-[14px] font-medium text-white [&::-webkit-details-marker]:hidden">
          <span>What&apos;s included</span>
          <span className="impact-highlight font-mono text-[12px]">{plan.checkoutItems.length} items ↓</span>
        </summary>
        <ul className="mt-3 space-y-2.5">
          {plan.checkoutItems.map((item) => (
            <li key={item} className="flex gap-2.5 text-[14px] text-white/75">
              <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#4e78ff]/20 text-[10px] font-bold text-[#7c97ff]">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );

  const trustBlock = (
    <div className="rounded-[18px] border border-purple/25 p-5 md:p-6" style={{ background: GLOSS }}>
      <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-white">
        You&apos;re in <span className="impact-highlight">safe hands</span>
      </h3>
      <ul className="mt-4 space-y-2.5">
        {trustItems.map((item) => (
          <li key={item} className="flex gap-2.5 text-[14px] text-white/75">
            <span className="mt-0.5 shrink-0 text-[#7c97ff]" aria-hidden>
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  const nextSteps = (
    <div className="rounded-[18px] border border-purple/25 p-5 md:p-6" style={{ background: GLOSS }}>
      <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-white">
        What happens <span className="impact-highlight">next</span>?
      </h3>
      <ol className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-2">
        {nextStepsItems.map((step, i) => (
          <li key={step} className="flex items-center gap-2 text-[13px] text-white/75">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-purple/40 bg-purple/20 text-[11px] font-semibold text-[#7c97ff]">
              {i + 1}
            </span>
            {step}
            {i < nextStepsItems.length - 1 ? (
              <span className="hidden text-[#4e78ff]/60 sm:inline" aria-hidden>
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
      className="rounded-[18px] border border-white/15 bg-purple/60 p-5 text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.18)] md:p-6"
    >
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Complete your order</p>
      <p className="mt-2 hidden text-[15px] leading-relaxed text-white/80 lg:block">
        Everything is ready. Complete the payment below to activate your service.
      </p>

      <div className="mt-4 hidden rounded-[14px] border border-white/20 bg-white/15 px-4 py-3.5 lg:mt-5 lg:block">
        <p className="text-[12px] text-white/70">Amount due</p>
        <p className="mt-0.5 text-[28px] font-semibold tracking-[-0.03em] text-white md:text-[32px]">
          {displayTotal}
        </p>
        <p className="mt-1 text-[13px] text-white/80">For: {plan.productName} · {plan.label}</p>
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
            placeholder={useStripe ? "+1 555 123 4567" : "98765 43210"}
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
        {useStripe ? null : (
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
        )}

        {error ? (
          <p className="rounded-[12px] border border-white/30 bg-black/20 px-3 py-2 text-[13px] text-white">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="relative mt-1 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[12px] border border-white/80 bg-white px-5 py-3.5 text-[15px] font-semibold text-purple disabled:opacity-60"
        >
          <span className="relative z-[2]">
            {busy ? `Opening ${processorName}…` : `Pay ${displayTotal} Securely →`}
          </span>
        </button>

        <p className="text-center text-[12px] leading-relaxed text-white/80">
          By paying you agree to our{" "}
          <Link to="/terms-and-conditions" className="text-white underline underline-offset-2 hover:text-white">
            Terms and conditions
          </Link>{" "}
          and{" "}
          <Link to="/refund-policy" className="text-white underline underline-offset-2 hover:text-white">
            Refund policy
          </Link>
          . Your payment information is encrypted and securely processed.
          <br />
          You&apos;ll receive confirmation and onboarding instructions immediately after successful payment.
        </p>

        <p className="text-center text-[11px] font-medium uppercase tracking-[0.1em] text-white">
          Secure checkout · {processorName}
        </p>

        <PaymentMethods variant={useStripe ? "stripe" : "razorpay"} />
      </form>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Pay · {plan.productName} · Boostmysites</title>
        <meta
          name="description"
          content={`Complete your payment for ${plan.productName}. Secure checkout via ${processorName}.`}
        />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <SiteBackground />

      <div className="relative z-10 min-h-screen text-white">
        <Nav
          links={NAV_LINKS}
          cta={NAV_CTA}
          whatsappHref={whatsappHref}
          ctaOutsideNav
        />

        <main className="mx-auto w-full max-w-[1100px] px-5 pb-28 pt-3 md:px-10 md:pb-16 md:pt-8">
          <div className="max-w-[640px]">
            <p className="acq-eyebrow impact-highlight inline-flex w-fit items-center rounded-full border border-purple/50 bg-black/60 px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.1em] backdrop-blur-[5px]">
              {useStripe ? "International" : "India"} · Secure checkout
            </p>
            <h1 className="mt-3 text-[26px] font-medium leading-[1.08] -tracking-[0.04em] text-white md:mt-4 md:text-[40px]">
              Complete your <span className="impact-highlight">payment</span>
            </h1>
            <p className="mt-3 hidden font-mono text-[14px] leading-relaxed tracking-[0.04em] text-white/60 md:block md:text-[15px]">
              You&apos;re one step away from getting started with {site.brand}.
            </p>
            <p className="mt-4 hidden flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-white/55 md:flex md:text-[12px]">
              <span>Secure Payment</span>
              <span className="text-[#4e78ff]" aria-hidden>
                ·
              </span>
              <span>Instant Confirmation</span>
              <span className="text-[#4e78ff]" aria-hidden>
                ·
              </span>
              <span>Dedicated Support</span>
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:mt-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-10">
            <div className="order-1">{orderSummary}</div>
            <div className="order-2 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:sticky lg:top-24 lg:self-start">
              {paymentCard}
            </div>
            <div className="order-3 lg:col-start-1">{trustBlock}</div>
            <div className="order-4 lg:col-start-1">{nextSteps}</div>
            <p className="order-5 text-[12px] text-white/40 lg:col-start-1">
              Questions?{" "}
              <a
                href={whatsappHref}
                className="impact-highlight underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp {site.brand}
              </a>
              {" · "}
              <Link to={productHome} className="impact-highlight underline-offset-2 hover:underline">
                Back to product
              </Link>
            </p>
          </div>
        </main>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-purple/25 bg-black/80 px-4 py-3 backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-[1100px] items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] text-white/50">Total today</p>
              <p className="impact-highlight text-[17px] font-semibold tracking-[-0.02em]">{displayTotal}</p>
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={() => {
                scrollToPayForm();
                formRef.current?.requestSubmit();
              }}
              className="btn-gloss relative shrink-0 overflow-hidden rounded-[12px] border border-white/20 bg-purple/80 px-4 py-3 text-[14px] font-semibold text-white disabled:opacity-60"
            >
              <span className="relative z-[2]">{busy ? "Opening…" : "Pay Securely →"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
