#!/usr/bin/env bash
# Deploy Razorpay acquisition checkout to Supabase project khxkorrvylcscyqfklxi.
# Requires: supabase CLI logged in with access to that project, and secrets exported.
set -euo pipefail

PROJECT_REF="${SUPABASE_PROJECT_REF:-khxkorrvylcscyqfklxi}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

: "${RAZORPAY_KEY_ID:?Set RAZORPAY_KEY_ID}"
: "${RAZORPAY_KEY_SECRET:?Set RAZORPAY_KEY_SECRET}"
: "${RAZORPAY_WEBHOOK_SECRET:?Set RAZORPAY_WEBHOOK_SECRET}"

echo "Linking $PROJECT_REF …"
npx supabase link --project-ref "$PROJECT_REF"

echo "Pushing migrations …"
npx supabase db push

echo "Setting secrets …"
SECRETS=(
  "RAZORPAY_KEY_ID=$RAZORPAY_KEY_ID"
  "RAZORPAY_KEY_SECRET=$RAZORPAY_KEY_SECRET"
  "RAZORPAY_WEBHOOK_SECRET=$RAZORPAY_WEBHOOK_SECRET"
)
if [[ -n "${RESEND_API_KEY:-}" ]]; then
  SECRETS+=("RESEND_API_KEY=$RESEND_API_KEY")
fi
if [[ -n "${BMS_SELLER_GSTIN:-}" ]]; then
  SECRETS+=("BMS_SELLER_GSTIN=$BMS_SELLER_GSTIN")
fi
if [[ -n "${BMS_SELLER_LEGAL_NAME:-}" ]]; then
  SECRETS+=("BMS_SELLER_LEGAL_NAME=$BMS_SELLER_LEGAL_NAME")
fi
if [[ -n "${BMS_BILLING_FROM:-}" ]]; then
  SECRETS+=("BMS_BILLING_FROM=$BMS_BILLING_FROM")
fi
if [[ -n "${SITE_ORIGIN:-}" ]]; then
  SECRETS+=("SITE_ORIGIN=$SITE_ORIGIN")
fi

npx supabase secrets set --project-ref "$PROJECT_REF" "${SECRETS[@]}"

echo "Deploying functions …"
npx supabase functions deploy razorpay-create-order --project-ref "$PROJECT_REF"
npx supabase functions deploy razorpay-verify --project-ref "$PROJECT_REF"
npx supabase functions deploy razorpay-webhook --project-ref "$PROJECT_REF"
npx supabase functions deploy razorpay-abandon-cron --project-ref "$PROJECT_REF"

echo "Done. Also set VITE_RAZORPAY_KEY_ID=$RAZORPAY_KEY_ID in Vercel."
echo "Webhook: https://${PROJECT_REF}.supabase.co/functions/v1/razorpay-webhook"
