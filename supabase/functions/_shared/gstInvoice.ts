/**
 * GST tax invoice HTML for AI Client Acquisition payments.
 * Tax rules mirror src/pages/admin/InvoiceGenerator.tsx (18%, intra default).
 */

export const SAC_CODE = "998314";
export const GST_RATE_PCT = 18;

export type InvoiceSeller = {
  legalName: string;
  address: string;
  gstin: string;
  stateName: string;
  stateCode: string;
  email: string;
  phone: string;
};

export type InvoiceBuyer = {
  name: string;
  email: string;
  phone: string;
  company: string | null;
  gstin: string | null;
  stateCode: string | null;
};

export type InvoiceLine = {
  description: string;
  sac: string;
  qty: number;
  rateInr: number;
};

export type BuiltInvoice = {
  invoiceNumber: string;
  invoiceDate: string;
  seller: InvoiceSeller;
  buyer: InvoiceBuyer;
  line: InvoiceLine;
  taxable: number;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
  isIntraState: boolean;
  amountWords: string;
  html: string;
};

export function getSeller(): InvoiceSeller | null {
  const gstin = Deno.env.get("BMS_SELLER_GSTIN")?.trim() ?? "";
  if (!gstin) return null;
  return {
    legalName:
      Deno.env.get("BMS_SELLER_LEGAL_NAME")?.trim() ||
      "Triple Seven Boostmysites AI Solutions Private Limited",
    address: Deno.env.get("BMS_SELLER_ADDRESS")?.trim() || "Bengaluru, Karnataka, India",
    gstin,
    stateName: "Karnataka",
    stateCode: "29",
    email: Deno.env.get("BMS_SELLER_EMAIL")?.trim() || "support@boostmysites.com",
    phone: Deno.env.get("BMS_SELLER_PHONE")?.trim() || "+91 96329 53355",
  };
}

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function fmtINR(n: number): string {
  return (
    "₹" +
    (Number.isFinite(n) ? n : 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

function fmtDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function amountInWords(num: number): string {
  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);
  const words = (n: number): string => {
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
      "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
      "Eighteen", "Nineteen",
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    if (n === 0) return "";
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + words(n % 100) : "");
    if (n < 100000) return words(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + words(n % 1000) : "");
    if (n < 10000000) {
      return words(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + words(n % 100000) : "");
    }
    return words(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + words(n % 10000000) : "");
  };
  let out = words(rupees) || "Zero";
  out += " Rupees";
  if (paise) out += " and " + words(paise) + " Paise";
  return out + " Only";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildGstInvoice(input: {
  invoiceNumber: string;
  seller: InvoiceSeller;
  buyer: InvoiceBuyer;
  planLabel: string;
  baseInr: number;
  invoiceDate?: string;
}): BuiltInvoice {
  const invoiceDate = input.invoiceDate ?? todayISO();
  const line: InvoiceLine = {
    description: `AI Client Acquisition System — ${input.planLabel}`,
    sac: SAC_CODE,
    qty: 1,
    rateInr: input.baseInr,
  };
  const taxable = line.qty * line.rateInr;
  const taxTotal = Math.round(taxable * (GST_RATE_PCT / 100));
  const buyerCode = (input.buyer.stateCode ?? "").trim();
  const sellerCode = input.seller.stateCode.trim();
  // Match InvoiceGenerator: unknown buyer state → intra
  const isIntraState = !buyerCode || buyerCode === sellerCode;
  const cgst = isIntraState ? taxTotal / 2 : 0;
  const sgst = isIntraState ? taxTotal / 2 : 0;
  const igst = isIntraState ? 0 : taxTotal;
  const total = taxable + taxTotal;
  const amountWords = amountInWords(total);

  const buyerName = escapeHtml(input.buyer.company || input.buyer.name);
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Tax Invoice ${escapeHtml(input.invoiceNumber)}</title></head>
<body style="margin:0;padding:24px;background:#f4f4f5;font-family:Arial,Helvetica,sans-serif;color:#111;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e4e4e7;padding:28px;">
    <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#71717a;">Tax Invoice</p>
    <h1 style="margin:0 0 20px;font-size:22px;font-weight:600;">${escapeHtml(input.seller.legalName)}</h1>
    <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
      <tr>
        <td style="vertical-align:top;width:50%;padding-right:12px;">
          <strong>From</strong><br/>
          ${escapeHtml(input.seller.address)}<br/>
          GSTIN: ${escapeHtml(input.seller.gstin)}<br/>
          ${escapeHtml(input.seller.stateName)} (${escapeHtml(input.seller.stateCode)})<br/>
          ${escapeHtml(input.seller.email)} · ${escapeHtml(input.seller.phone)}
        </td>
        <td style="vertical-align:top;width:50%;">
          <strong>Bill to</strong><br/>
          ${buyerName}<br/>
          ${escapeHtml(input.buyer.name)}<br/>
          ${escapeHtml(input.buyer.email)} · ${escapeHtml(input.buyer.phone)}
          ${input.buyer.gstin ? `<br/>GSTIN: ${escapeHtml(input.buyer.gstin)}` : ""}
        </td>
      </tr>
    </table>
    <p style="font-size:13px;margin:0 0 16px;">
      <strong>Invoice No:</strong> ${escapeHtml(input.invoiceNumber)} &nbsp;·&nbsp;
      <strong>Date:</strong> ${escapeHtml(fmtDate(invoiceDate))}
    </p>
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <thead>
        <tr style="background:#f4f4f5;text-align:left;">
          <th style="padding:8px;border:1px solid #e4e4e7;">Description</th>
          <th style="padding:8px;border:1px solid #e4e4e7;">SAC</th>
          <th style="padding:8px;border:1px solid #e4e4e7;text-align:right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:8px;border:1px solid #e4e4e7;">${escapeHtml(line.description)}</td>
          <td style="padding:8px;border:1px solid #e4e4e7;">${escapeHtml(line.sac)}</td>
          <td style="padding:8px;border:1px solid #e4e4e7;text-align:right;">${fmtINR(taxable)}</td>
        </tr>
      </tbody>
    </table>
    <table style="width:100%;max-width:280px;margin-left:auto;margin-top:12px;font-size:13px;border-collapse:collapse;">
      <tr><td style="padding:4px 0;">Taxable</td><td style="text-align:right;">${fmtINR(taxable)}</td></tr>
      ${
        isIntraState
          ? `<tr><td style="padding:4px 0;">CGST (9%)</td><td style="text-align:right;">${fmtINR(cgst)}</td></tr>
             <tr><td style="padding:4px 0;">SGST (9%)</td><td style="text-align:right;">${fmtINR(sgst)}</td></tr>`
          : `<tr><td style="padding:4px 0;">IGST (18%)</td><td style="text-align:right;">${fmtINR(igst)}</td></tr>`
      }
      <tr><td style="padding:8px 0;font-weight:700;border-top:1px solid #e4e4e7;">Total</td><td style="padding:8px 0;text-align:right;font-weight:700;border-top:1px solid #e4e4e7;">${fmtINR(total)}</td></tr>
    </table>
    <p style="margin:16px 0 0;font-size:12px;color:#52525b;"><em>${escapeHtml(amountWords)}</em></p>
    <p style="margin:20px 0 0;font-size:11px;color:#71717a;">Payment received via Razorpay. Services under SAC ${SAC_CODE} (IT &amp; software services). This is a computer-generated tax invoice.</p>
  </div>
</body></html>`;

  return {
    invoiceNumber: input.invoiceNumber,
    invoiceDate,
    seller: input.seller,
    buyer: input.buyer,
    line,
    taxable,
    cgst,
    sgst,
    igst,
    total,
    isIntraState,
    amountWords,
    html,
  };
}
