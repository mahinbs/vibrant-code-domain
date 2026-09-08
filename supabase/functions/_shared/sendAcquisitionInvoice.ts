import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { buildGstInvoice, getSeller } from "./gstInvoice.ts";
import { sendBillingEmail } from "./billingResend.ts";

type PaymentRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  gstin: string | null;
  plan_id: string;
  base_inr: number;
  invoice_number: string | null;
  invoice_sent_at: string | null;
};

/** Idempotent: assign invoice number + email HTML GST invoice once per paid row. */
export async function maybeSendGstInvoice(
  supabase: SupabaseClient,
  orderId: string,
): Promise<{ sent: boolean; reason?: string }> {
  const { data: row, error } = await supabase
    .from("acquisition_payments")
    .select(
      "id, name, email, phone, company, gstin, plan_id, base_inr, invoice_number, invoice_sent_at",
    )
    .eq("razorpay_order_id", orderId)
    .maybeSingle();

  if (error) {
    console.error("[gst-invoice] load", error);
    return { sent: false, reason: error.message };
  }
  if (!row) return { sent: false, reason: "payment row missing" };

  const payment = row as PaymentRow;
  if (payment.invoice_sent_at) return { sent: false, reason: "already sent" };

  const seller = getSeller();
  if (!seller) {
    console.error("[gst-invoice] BMS_SELLER_GSTIN missing — skip send");
    return { sent: false, reason: "BMS_SELLER_GSTIN missing" };
  }

  let invoiceNumber = payment.invoice_number;
  if (!invoiceNumber) {
    const { data: nextNo, error: seqErr } = await supabase.rpc(
      "next_acquisition_invoice_number",
    );
    if (seqErr || !nextNo) {
      console.error("[gst-invoice] sequence", seqErr);
      return { sent: false, reason: seqErr?.message ?? "sequence failed" };
    }
    invoiceNumber = String(nextNo);

    const { error: lockErr } = await supabase
      .from("acquisition_payments")
      .update({
        invoice_number: invoiceNumber,
        updated_at: new Date().toISOString(),
      })
      .eq("id", payment.id)
      .is("invoice_sent_at", null);

    if (lockErr) {
      console.error("[gst-invoice] assign number", lockErr);
      return { sent: false, reason: lockErr.message };
    }
  }

  const planLabel = payment.plan_id === "yearly" ? "1 year" : "1 month";
  const built = buildGstInvoice({
    invoiceNumber,
    seller,
    buyer: {
      name: payment.name,
      email: payment.email,
      phone: payment.phone,
      company: payment.company,
      gstin: payment.gstin,
      stateCode: null,
    },
    planLabel,
    baseInr: payment.base_inr,
  });

  await sendBillingEmail({
    to: payment.email,
    subject: `Tax Invoice ${invoiceNumber} — Boostmysites`,
    html: built.html,
    text: `Tax Invoice ${invoiceNumber} for AI Client Acquisition System (${planLabel}). Total ${built.total}.`,
  });

  const { error: markErr } = await supabase
    .from("acquisition_payments")
    .update({
      invoice_sent_at: new Date().toISOString(),
      invoice_number: invoiceNumber,
      updated_at: new Date().toISOString(),
    })
    .eq("id", payment.id)
    .is("invoice_sent_at", null);

  if (markErr) {
    console.error("[gst-invoice] mark sent", markErr);
    return { sent: false, reason: markErr.message };
  }

  return { sent: true };
}
