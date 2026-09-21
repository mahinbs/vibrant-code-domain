#!/usr/bin/env bash
# Deploy Stripe digital checkout to project khxkorrvylcscyqfklxi.
# Must be logged into the Supabase org that owns boostmysites.com:
#   npx supabase login
set -euo pipefail

PROJECT_REF="${SUPABASE_PROJECT_REF:-khxkorrvylcscyqfklxi}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -f .env.local ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
fi

: "${STRIPE_SECRET_KEY:?Set STRIPE_SECRET_KEY in .env.local}"
: "${STRIPE_WEBHOOK_SECRET:?Set STRIPE_WEBHOOK_SECRET in .env.local}"

STRIPE_PRODUCT_ID="${STRIPE_PRODUCT_ID:-prod_VIfT6c7x55nw9p}"
STRIPE_PRICE_ID="${STRIPE_PRICE_ID:-price_1UI48JDKKVuJs8Adz9lMUKJZ}"

echo "Setting Stripe secrets on $PROJECT_REF …"
npx supabase secrets set --project-ref "$PROJECT_REF" \
  "STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY" \
  "STRIPE_PRODUCT_ID=$STRIPE_PRODUCT_ID" \
  "STRIPE_PRICE_ID=$STRIPE_PRICE_ID" \
  "STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET"

echo "Pushing payments migration …"
npx supabase db push --project-ref "$PROJECT_REF" --yes

echo "Deploying functions …"
npx supabase functions deploy stripe-create-checkout --project-ref "$PROJECT_REF"
npx supabase functions deploy stripe-webhook --project-ref "$PROJECT_REF"

echo "Done."
echo "Webhook: https://${PROJECT_REF}.supabase.co/functions/v1/stripe-webhook"
echo "Test: /pay?plan=digital&pay=stripe"
