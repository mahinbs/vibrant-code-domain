import { useState, type FormEvent } from "react";
import { site } from "../data/site";
import { PhoneInput, DEFAULT_COUNTRY, dialFor } from "./PhoneInput";
import { CheckIcon, WhatsAppIcon } from "./icons";
import { submitStrategyCallLead } from "../lib/submitLead";

/**
 * Compact one-step audit form (homepage) — distinct from the multi-step
 * LeadForm used on /business-automation. Name, email, WhatsApp (flag dial
 * codes) and an optional "what do you want to automate" note.
 */
export function QuickAuditForm({ sourcePage }: { sourcePage: string }) {
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
      sourcePage,
      requirement: form.requirement,
    });
    if (res.ok) setStatus("success");
    else {
      setStatus("error");
      setError(res.error ?? "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    const msg = `Hi Boostmysites 👋 I just booked a free automation audit.

Name: ${form.name || "-"}
Email: ${form.email || "-"}
WhatsApp: ${form.phone || "-"}
Want to automate: ${form.requirement.trim() || "-"}

When can we talk?`;
    const waHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    return (
      <div className="flex w-full max-w-[520px] flex-col items-center gap-4 rounded-[14px] border border-[#25D366]/40 bg-[#1d9e75]/10 p-7 text-center">
        <div className="flex size-11 items-center justify-center rounded-full bg-[#1d9e75]/30">
          <CheckIcon className="size-5 text-white" />
        </div>
        <h3 className="text-xl font-medium text-white">You&apos;re in! 🎉</h3>
        <p className="text-sm leading-relaxed text-white/75">
          <span className="font-semibold text-white">Want it sorted today?</span> Message us on
          WhatsApp — your details are already filled in, just hit send.
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-transform hover:scale-[1.02] active:scale-95"
        >
          <WhatsAppIcon className="size-5 fill-white" />
          Continue on WhatsApp →
        </a>
        <p className="text-[12px] text-white/45">We reply within 24 hours either way.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full max-w-[520px] flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        <input
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          placeholder="Full name"
          autoComplete="name"
          className="w-full rounded-lg border border-white/15 bg-black/40 p-3.5 text-sm text-white placeholder:text-white/40 backdrop-blur-[5px] focus:border-white/40 focus:outline-none"
        />
        <input
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          type="email"
          placeholder="Work email"
          autoComplete="email"
          className="w-full rounded-lg border border-white/15 bg-black/40 p-3.5 text-sm text-white placeholder:text-white/40 backdrop-blur-[5px] focus:border-white/40 focus:outline-none"
        />
      </div>
      <PhoneInput
        countryCode={countryCode}
        nationalNumber={nationalNumber}
        onCountryChange={(c) => updatePhone(c, nationalNumber)}
        onNumberChange={(n) => updatePhone(countryCode, n)}
      />
      <textarea
        value={form.requirement}
        onChange={(e) => setForm((p) => ({ ...p, requirement: e.target.value }))}
        placeholder="What do you want to automate? (optional)"
        rows={3}
        className="w-full resize-none rounded-lg border border-white/15 bg-black/40 p-3.5 text-sm text-white placeholder:text-white/40 backdrop-blur-[5px] focus:border-white/40 focus:outline-none"
      />
      {error ? <p className="text-[13px] text-red-300/90">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-gloss relative mt-1 inline-flex items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-white/20 bg-purple/80 px-5 py-[15px] text-sm font-semibold text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.2)] disabled:opacity-60"
      >
        <span className="relative z-[2]">
          {status === "submitting" ? "Booking…" : "Book my free automation audit"}
        </span>
      </button>
      <p className="text-center text-[12px] text-white/45">
        Free audit · 30 minutes · No sales pitch
      </p>
    </form>
  );
}
