import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * GST invoice generator (India). Fully client-side — no backend.
 * Company profile + invoice counter persist in localStorage so it's a
 * one-time setup. "Download PDF" uses the browser print dialog (Save as PDF),
 * with a print stylesheet that isolates the invoice sheet.
 */

type Company = {
  legalName: string;
  address: string;
  gstin: string;
  stateName: string;
  stateCode: string;
  email: string;
  phone: string;
  website: string;
  logo: string; // URL or data URI
  bankName: string;
  bankAccount: string;
  bankIfsc: string;
  upi: string;
};

type Party = {
  name: string;
  address: string;
  gstin: string;
  stateName: string;
  stateCode: string;
  email: string;
  phone: string;
};

type Item = {
  id: string;
  desc: string;
  hsn: string;
  qty: number;
  rate: number;
};

const COMPANY_KEY = "bms_invoice_company_v1";
const SEQ_KEY = "bms_invoice_seq_v1";

const DEFAULT_COMPANY: Company = {
  legalName: "Triple Seven Boostmysites AI Solutions Private Limited",
  address: "Bengaluru, Karnataka, India",
  gstin: "",
  stateName: "Karnataka",
  stateCode: "29",
  email: "support@boostmysites.com",
  phone: "+91 96329 53355",
  website: "www.boostmysites.com",
  logo: "/bms-logo.png",
  bankName: "",
  bankAccount: "",
  bankIfsc: "",
  upi: "",
};

const BLANK_PARTY: Party = {
  name: "",
  address: "",
  gstin: "",
  stateName: "",
  stateCode: "",
  email: "",
  phone: "",
};

function loadCompany(): Company {
  try {
    const raw = localStorage.getItem(COMPANY_KEY);
    if (raw) return { ...DEFAULT_COMPANY, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return DEFAULT_COMPANY;
}

function nextInvoiceNo(): string {
  let seq = 1;
  try {
    seq = parseInt(localStorage.getItem(SEQ_KEY) || "0", 10) + 1;
  } catch { /* ignore */ }
  const fy = financialYear();
  return `BMS/${fy}/${String(seq).padStart(4, "0")}`;
}

function financialYear(d = new Date()): string {
  const y = d.getFullYear();
  const m = d.getMonth(); // 0=Jan
  const startY = m >= 3 ? y : y - 1; // FY starts April
  return `${String(startY).slice(2)}-${String(startY + 1).slice(2)}`;
}

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function fmtINR(n: number): string {
  return "₹" + (Number.isFinite(n) ? n : 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/** Indian-style rupees-in-words. */
function amountInWords(num: number): string {
  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);
  const words = (n: number): string => {
    const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    if (n === 0) return "";
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + words(n % 100) : "");
    if (n < 100000) return words(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + words(n % 1000) : "");
    if (n < 10000000) return words(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + words(n % 100000) : "");
    return words(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + words(n % 10000000) : "");
  };
  let out = words(rupees) || "Zero";
  out += " Rupees";
  if (paise) out += " and " + words(paise) + " Paise";
  return out + " Only";
}

const uid = () => Math.random().toString(36).slice(2, 9);

const fieldCls =
  "w-full rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-[13px] text-slate-800 outline-none focus:border-[#4b78ff] focus:ring-1 focus:ring-[#4b78ff]/40";
const labelCls = "mb-1 block text-[11px] font-medium uppercase tracking-wide text-slate-500";

export default function InvoiceGenerator() {
  const [company, setCompany] = useState<Company>(loadCompany);
  const [party, setParty] = useState<Party>(BLANK_PARTY);
  const [items, setItems] = useState<Item[]>([{ id: uid(), desc: "", hsn: "998314", qty: 1, rate: 0 }]);
  const [invoiceNo, setInvoiceNo] = useState<string>(nextInvoiceNo);
  const [invoiceDate, setInvoiceDate] = useState<string>(todayISO);
  const [dueDate, setDueDate] = useState<string>("");
  const [placeOfSupply, setPlaceOfSupply] = useState<string>("");
  const [gstRate, setGstRate] = useState<number>(18);
  const [taxMode, setTaxMode] = useState<"auto" | "intra" | "inter" | "none">("auto");
  const [discountPct, setDiscountPct] = useState<number>(0);
  const [notes, setNotes] = useState<string>("Thank you for your business.");
  const [terms, setTerms] = useState<string>("Payment due within 7 days. Services rendered under SAC 998314 (IT & software services).");
  const [showSettings, setShowSettings] = useState<boolean>(!loadCompany().gstin);
  const [savedFlash, setSavedFlash] = useState<boolean>(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!placeOfSupply && party.stateName) setPlaceOfSupply(`${party.stateName}${party.stateCode ? ` (${party.stateCode})` : ""}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [party.stateName, party.stateCode]);

  // Intra-state (same state code) → CGST+SGST; else IGST.
  const isIntraState = useMemo(() => {
    if (taxMode === "intra") return true;
    if (taxMode === "inter") return false;
    if (taxMode === "none") return true;
    const a = company.stateCode.trim();
    const b = party.stateCode.trim();
    if (!a || !b) return true; // default to intra when unknown
    return a === b;
  }, [taxMode, company.stateCode, party.stateCode]);

  const subtotal = useMemo(() => items.reduce((s, it) => s + (it.qty || 0) * (it.rate || 0), 0), [items]);
  const discount = useMemo(() => (subtotal * (discountPct || 0)) / 100, [subtotal, discountPct]);
  const taxable = useMemo(() => Math.max(0, subtotal - discount), [subtotal, discount]);
  const taxTotal = useMemo(() => (taxMode === "none" ? 0 : (taxable * (gstRate || 0)) / 100), [taxable, gstRate, taxMode]);
  const cgst = isIntraState ? taxTotal / 2 : 0;
  const sgst = isIntraState ? taxTotal / 2 : 0;
  const igst = isIntraState ? 0 : taxTotal;
  const grandRaw = taxable + taxTotal;
  const grandTotal = useMemo(() => Math.round(grandRaw), [grandRaw]);
  const roundOff = grandTotal - grandRaw;

  function saveCompany() {
    try {
      localStorage.setItem(COMPANY_KEY, JSON.stringify(company));
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1800);
    } catch { /* ignore */ }
  }

  function onLogoUpload(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCompany((c) => ({ ...c, logo: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  function updateItem(id: string, patch: Partial<Item>) {
    setItems((arr) => arr.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  }
  function addItem() {
    setItems((arr) => [...arr, { id: uid(), desc: "", hsn: "998314", qty: 1, rate: 0 }]);
  }
  function removeItem(id: string) {
    setItems((arr) => (arr.length > 1 ? arr.filter((it) => it.id !== id) : arr));
  }

  function downloadPdf() {
    // Persist the invoice number for next time before printing.
    try {
      const seq = parseInt(localStorage.getItem(SEQ_KEY) || "0", 10) + 1;
      localStorage.setItem(SEQ_KEY, String(seq));
    } catch { /* ignore */ }
    window.print();
  }

  const setC = (patch: Partial<Company>) => setCompany((c) => ({ ...c, ...patch }));
  const setP = (patch: Partial<Party>) => setParty((p) => ({ ...p, ...patch }));

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {/* Print rules: hide everything except the invoice sheet. */}
      <style>{`
        @media print {
          body { background: #fff !important; }
          .no-print { display: none !important; }
          .invoice-sheet { box-shadow: none !important; margin: 0 !important; border-radius: 0 !important; width: 100% !important; max-width: none !important; }
          @page { size: A4; margin: 12mm; }
        }
      `}</style>

      {/* Toolbar */}
      <div className="no-print sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="rounded-md border border-slate-300 px-2.5 py-1.5 text-[13px] text-slate-600 hover:bg-slate-50">← Admin</Link>
            <h1 className="text-[15px] font-semibold">GST Invoice Generator</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowSettings((s) => !s)} className="rounded-md border border-slate-300 px-3 py-1.5 text-[13px] text-slate-700 hover:bg-slate-50">
              {showSettings ? "Hide company setup" : "Company setup"}
            </button>
            <button onClick={downloadPdf} className="rounded-md bg-[#4b78ff] px-4 py-1.5 text-[13px] font-semibold text-white hover:bg-[#3d63d8]">
              ⬇ Download PDF
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* Company setup (persisted) */}
        {showSettings ? (
          <div className="no-print mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[14px] font-semibold">Your company details <span className="font-normal text-slate-400">(saved on this device)</span></h2>
              <div className="flex items-center gap-2">
                {savedFlash ? <span className="text-[12px] font-medium text-emerald-600">✓ Saved</span> : null}
                <button onClick={saveCompany} className="rounded-md bg-slate-800 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-slate-700">Save company</button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={labelCls}>Legal / business name</label>
                <input className={fieldCls} value={company.legalName} onChange={(e) => setC({ legalName: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Registered address</label>
                <textarea className={fieldCls} rows={2} value={company.address} onChange={(e) => setC({ address: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>GSTIN</label>
                <input className={fieldCls} value={company.gstin} placeholder="29ABCDE1234F1Z5" onChange={(e) => setC({ gstin: e.target.value.toUpperCase() })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>State</label>
                  <input className={fieldCls} value={company.stateName} onChange={(e) => setC({ stateName: e.target.value })} />
                </div>
                <div>
                  <label className={labelCls}>State code</label>
                  <input className={fieldCls} value={company.stateCode} placeholder="29" onChange={(e) => setC({ stateCode: e.target.value })} />
                </div>
              </div>
              <div><label className={labelCls}>Email</label><input className={fieldCls} value={company.email} onChange={(e) => setC({ email: e.target.value })} /></div>
              <div><label className={labelCls}>Phone</label><input className={fieldCls} value={company.phone} onChange={(e) => setC({ phone: e.target.value })} /></div>
              <div><label className={labelCls}>Website</label><input className={fieldCls} value={company.website} onChange={(e) => setC({ website: e.target.value })} /></div>
              <div>
                <label className={labelCls}>Logo</label>
                <div className="flex items-center gap-2">
                  <img src={company.logo} alt="logo" className="h-9 w-9 rounded object-contain" />
                  <button onClick={() => logoInputRef.current?.click()} className="rounded-md border border-slate-300 px-2.5 py-1.5 text-[12px] hover:bg-slate-50">Upload</button>
                  <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => onLogoUpload(e.target.files?.[0])} />
                </div>
              </div>
              <div><label className={labelCls}>Bank name</label><input className={fieldCls} value={company.bankName} onChange={(e) => setC({ bankName: e.target.value })} /></div>
              <div><label className={labelCls}>Account number</label><input className={fieldCls} value={company.bankAccount} onChange={(e) => setC({ bankAccount: e.target.value })} /></div>
              <div><label className={labelCls}>IFSC</label><input className={fieldCls} value={company.bankIfsc} onChange={(e) => setC({ bankIfsc: e.target.value })} /></div>
              <div><label className={labelCls}>UPI ID</label><input className={fieldCls} value={company.upi} onChange={(e) => setC({ upi: e.target.value })} /></div>
            </div>
          </div>
        ) : null}

        {/* Editable invoice inputs */}
        <div className="no-print mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Bill to */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-[14px] font-semibold">Bill to (client)</h2>
            <div className="grid grid-cols-1 gap-3">
              <div><label className={labelCls}>Client / company name</label><input className={fieldCls} value={party.name} onChange={(e) => setP({ name: e.target.value })} /></div>
              <div><label className={labelCls}>Address</label><textarea className={fieldCls} rows={2} value={party.address} onChange={(e) => setP({ address: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>GSTIN (optional)</label><input className={fieldCls} value={party.gstin} onChange={(e) => setP({ gstin: e.target.value.toUpperCase() })} /></div>
                <div className="grid grid-cols-2 gap-2">
                  <div><label className={labelCls}>State</label><input className={fieldCls} value={party.stateName} onChange={(e) => setP({ stateName: e.target.value })} /></div>
                  <div><label className={labelCls}>Code</label><input className={fieldCls} value={party.stateCode} placeholder="29" onChange={(e) => setP({ stateCode: e.target.value })} /></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>Email</label><input className={fieldCls} value={party.email} onChange={(e) => setP({ email: e.target.value })} /></div>
                <div><label className={labelCls}>Phone</label><input className={fieldCls} value={party.phone} onChange={(e) => setP({ phone: e.target.value })} /></div>
              </div>
            </div>
          </div>

          {/* Invoice meta + tax */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-[14px] font-semibold">Invoice details</h2>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Invoice no.</label><input className={fieldCls} value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} /></div>
              <div><label className={labelCls}>Place of supply</label><input className={fieldCls} value={placeOfSupply} onChange={(e) => setPlaceOfSupply(e.target.value)} /></div>
              <div><label className={labelCls}>Invoice date</label><input type="date" className={fieldCls} value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} /></div>
              <div><label className={labelCls}>Due date</label><input type="date" className={fieldCls} value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></div>
              <div>
                <label className={labelCls}>GST rate</label>
                <select className={fieldCls} value={gstRate} onChange={(e) => setGstRate(Number(e.target.value))}>
                  {[0, 5, 12, 18, 28].map((r) => <option key={r} value={r}>{r}%</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Tax type</label>
                <select className={fieldCls} value={taxMode} onChange={(e) => setTaxMode(e.target.value as typeof taxMode)}>
                  <option value="auto">Auto (by state)</option>
                  <option value="intra">CGST + SGST</option>
                  <option value="inter">IGST</option>
                  <option value="none">No GST</option>
                </select>
              </div>
              <div><label className={labelCls}>Discount %</label><input type="number" min={0} max={100} className={fieldCls} value={discountPct} onChange={(e) => setDiscountPct(Number(e.target.value))} /></div>
              <div className="flex items-end text-[12px] text-slate-500">
                {taxMode === "none" ? "No GST applied" : isIntraState ? "Intra-state → CGST + SGST" : "Inter-state → IGST"}
              </div>
            </div>
          </div>
        </div>

        {/* Line items editor */}
        <div className="no-print mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[14px] font-semibold">Items / services</h2>
            <button onClick={addItem} className="rounded-md bg-[#4b78ff] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[#3d63d8]">+ Add row</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-slate-500">
                  <th className="pb-2 pr-2">Description</th>
                  <th className="pb-2 px-2 w-24">HSN/SAC</th>
                  <th className="pb-2 px-2 w-16">Qty</th>
                  <th className="pb-2 px-2 w-28">Rate (₹)</th>
                  <th className="pb-2 pl-2 w-28 text-right">Amount</th>
                  <th className="pb-2 w-8" />
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} className="border-t border-slate-100">
                    <td className="py-1.5 pr-2"><input className={fieldCls} value={it.desc} placeholder="e.g. AI CRM development — milestone 1" onChange={(e) => updateItem(it.id, { desc: e.target.value })} /></td>
                    <td className="py-1.5 px-2"><input className={fieldCls} value={it.hsn} onChange={(e) => updateItem(it.id, { hsn: e.target.value })} /></td>
                    <td className="py-1.5 px-2"><input type="number" min={0} className={fieldCls} value={it.qty} onChange={(e) => updateItem(it.id, { qty: Number(e.target.value) })} /></td>
                    <td className="py-1.5 px-2"><input type="number" min={0} className={fieldCls} value={it.rate} onChange={(e) => updateItem(it.id, { rate: Number(e.target.value) })} /></td>
                    <td className="py-1.5 pl-2 text-right font-medium">{fmtINR((it.qty || 0) * (it.rate || 0))}</td>
                    <td className="py-1.5 text-center"><button onClick={() => removeItem(it.id)} className="text-red-400 hover:text-red-600" title="Remove">✕</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div><label className={labelCls}>Notes</label><textarea className={fieldCls} rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
            <div><label className={labelCls}>Terms</label><textarea className={fieldCls} rows={2} value={terms} onChange={(e) => setTerms(e.target.value)} /></div>
          </div>
        </div>

        {/* ===== Printable invoice sheet ===== */}
        <div className="invoice-sheet mx-auto w-full max-w-[820px] rounded-xl bg-white p-8 text-slate-900 shadow-lg print:shadow-none">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 border-b border-slate-200 pb-5">
            <div className="flex items-start gap-3">
              <img src={company.logo} alt="Company logo" className="h-14 w-14 object-contain" />
              <div>
                <p className="text-[15px] font-bold leading-tight text-slate-900">{company.legalName}</p>
                <p className="mt-1 whitespace-pre-line text-[12px] leading-snug text-slate-500">{company.address}</p>
                <p className="mt-1 text-[12px] text-slate-500">{[company.email, company.phone, company.website].filter(Boolean).join("  •  ")}</p>
                {company.gstin ? <p className="mt-1 text-[12px] font-medium text-slate-700">GSTIN: {company.gstin}</p> : null}
              </div>
            </div>
            <div className="text-right">
              <p className="text-[22px] font-bold uppercase tracking-wide text-[#2a3d8f]">Tax Invoice</p>
              <p className="mt-1 text-[12px] text-slate-500">Invoice No.</p>
              <p className="text-[13px] font-semibold">{invoiceNo}</p>
            </div>
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 gap-6 py-5 md:grid-cols-4">
            <Meta label="Invoice date" value={fmtDate(invoiceDate)} />
            <Meta label="Due date" value={dueDate ? fmtDate(dueDate) : "—"} />
            <Meta label="Place of supply" value={placeOfSupply || "—"} />
            <Meta label="Supply type" value={taxMode === "none" ? "Non-taxable" : isIntraState ? "Intra-state" : "Inter-state"} />
          </div>

          {/* Bill to */}
          <div className="mb-5 rounded-lg bg-slate-50 p-4">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Bill to</p>
            <p className="text-[14px] font-semibold text-slate-900">{party.name || "—"}</p>
            {party.address ? <p className="mt-0.5 whitespace-pre-line text-[12px] leading-snug text-slate-600">{party.address}</p> : null}
            <p className="mt-1 text-[12px] text-slate-600">
              {party.gstin ? <>GSTIN: <span className="font-medium">{party.gstin}</span>&nbsp;&nbsp;</> : null}
              {party.stateName ? <>State: {party.stateName}{party.stateCode ? ` (${party.stateCode})` : ""}</> : null}
            </p>
            {(party.email || party.phone) ? <p className="mt-0.5 text-[12px] text-slate-500">{[party.email, party.phone].filter(Boolean).join("  •  ")}</p> : null}
          </div>

          {/* Items table */}
          <table className="w-full border-collapse text-[12.5px]">
            <thead>
              <tr className="bg-[#2a3d8f] text-left text-white">
                <th className="rounded-l-md px-3 py-2 font-semibold">#</th>
                <th className="px-3 py-2 font-semibold">Description</th>
                <th className="px-3 py-2 font-semibold">HSN/SAC</th>
                <th className="px-3 py-2 text-right font-semibold">Qty</th>
                <th className="px-3 py-2 text-right font-semibold">Rate</th>
                <th className="rounded-r-md px-3 py-2 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={it.id} className="border-b border-slate-100">
                  <td className="px-3 py-2 text-slate-500">{i + 1}</td>
                  <td className="px-3 py-2">{it.desc || "—"}</td>
                  <td className="px-3 py-2 text-slate-600">{it.hsn}</td>
                  <td className="px-3 py-2 text-right">{it.qty}</td>
                  <td className="px-3 py-2 text-right">{fmtINR(it.rate)}</td>
                  <td className="px-3 py-2 text-right font-medium">{fmtINR((it.qty || 0) * (it.rate || 0))}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="mt-5 flex flex-col gap-5 md:flex-row md:justify-between">
            <div className="max-w-[320px] text-[12px] text-slate-600">
              <p className="font-semibold text-slate-700">Amount in words</p>
              <p className="mt-0.5 italic">{amountInWords(grandTotal)}</p>
              {(company.bankName || company.bankAccount || company.upi) ? (
                <div className="mt-4">
                  <p className="font-semibold text-slate-700">Payment details</p>
                  {company.bankName ? <p>Bank: {company.bankName}</p> : null}
                  {company.bankAccount ? <p>A/c: {company.bankAccount}</p> : null}
                  {company.bankIfsc ? <p>IFSC: {company.bankIfsc}</p> : null}
                  {company.upi ? <p>UPI: {company.upi}</p> : null}
                </div>
              ) : null}
            </div>
            <div className="w-full max-w-[300px] shrink-0 text-[13px]">
              <Row label="Subtotal" value={fmtINR(subtotal)} />
              {discount > 0 ? <Row label={`Discount (${discountPct}%)`} value={"− " + fmtINR(discount)} /> : null}
              <Row label="Taxable value" value={fmtINR(taxable)} />
              {taxMode !== "none" && isIntraState ? (
                <>
                  <Row label={`CGST (${gstRate / 2}%)`} value={fmtINR(cgst)} />
                  <Row label={`SGST (${gstRate / 2}%)`} value={fmtINR(sgst)} />
                </>
              ) : null}
              {taxMode !== "none" && !isIntraState ? <Row label={`IGST (${gstRate}%)`} value={fmtINR(igst)} /> : null}
              {Math.abs(roundOff) > 0.001 ? <Row label="Round off" value={(roundOff >= 0 ? "+ " : "− ") + fmtINR(Math.abs(roundOff))} /> : null}
              <div className="mt-1 flex items-center justify-between rounded-md bg-[#2a3d8f] px-3 py-2 text-white">
                <span className="text-[13px] font-semibold">Total</span>
                <span className="text-[15px] font-bold">{fmtINR(grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-end justify-between gap-6 border-t border-slate-200 pt-4">
            <div className="max-w-[380px] text-[11.5px] text-slate-500">
              {notes ? <p className="mb-1"><span className="font-semibold text-slate-600">Notes:</span> {notes}</p> : null}
              {terms ? <p><span className="font-semibold text-slate-600">Terms:</span> {terms}</p> : null}
            </div>
            <div className="text-center">
              <div className="mb-1 h-10" />
              <p className="border-t border-slate-300 pt-1 text-[11.5px] text-slate-500">Authorised signatory</p>
              <p className="text-[11px] text-slate-400">For {company.legalName.split(" ").slice(0, 3).join(" ")}…</p>
            </div>
          </div>

          <p className="mt-5 text-center text-[10.5px] text-slate-400">This is a computer-generated invoice.</p>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-0.5 text-[13px] font-medium text-slate-800">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}
