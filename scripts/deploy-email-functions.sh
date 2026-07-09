#!/usr/bin/env bash
# Deploy all Email Marketing edge functions to Supabase.
# Requires: npx supabase login (once) OR SUPABASE_ACCESS_TOKEN in env.
set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT_REF="${SUPABASE_PROJECT_REF:-upxsbhsamorhvnfebvor}"

# Sync shared lib into each function (keeps lib/ in sync with _shared/em/)
for fn in supabase/functions/em-*/; do
  fn_name=$(basename "$fn")
  mkdir -p "${fn}lib"
  cp supabase/functions/_shared/em/util.ts "${fn}lib/util.ts"
  if [[ "$fn_name" == "em-manage-domain" || "$fn_name" == "em-send-queue" ]]; then
    cp supabase/functions/_shared/em/resend.ts "${fn}lib/resend.ts"
  fi
done

FUNCTIONS=(
  em-manage-domain
  em-resend-webhook
  em-send-queue
  em-process-sequences
  em-check-replies
  em-sync-inbound-lead
  em-research-company
  em-draft-email
  em-cal-webhook
  em-unsubscribe
)

for name in "${FUNCTIONS[@]}"; do
  echo "Deploying $name..."
  npx supabase functions deploy "$name" --project-ref "$PROJECT_REF"
done

echo "Done. Set secrets in Dashboard if not already:"
echo "  RESEND_API_KEY, ANTHROPIC_API_KEY, IMAP_HOST, IMAP_USER, IMAP_PASSWORD"
