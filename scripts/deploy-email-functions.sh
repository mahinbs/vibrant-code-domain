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
  if [[ -f supabase/functions/_shared/em/caseStudies.ts ]]; then
  if [[ "$fn_name" == "em-process-sequences" || "$fn_name" == "em-draft-email" ]]; then
    cp supabase/functions/_shared/em/caseStudies.ts "${fn}lib/caseStudies.ts"
  fi
  fi
  if [[ -f supabase/functions/_shared/em/inboundReply.ts ]]; then
    if [[ "$fn_name" == "em-resend-webhook" || "$fn_name" == "em-manage-domain" ]]; then
      cp supabase/functions/_shared/em/inboundReply.ts "${fn}lib/inboundReply.ts"
    fi
  fi
  if [[ -f supabase/functions/_shared/em/gemini.ts ]]; then
    if [[ "$fn_name" == "em-draft-email" || "$fn_name" == "em-research-company" || "$fn_name" == "em-draft-reply" ]]; then
      cp supabase/functions/_shared/em/gemini.ts "${fn}lib/gemini.ts"
    fi
  fi
  if [[ -f supabase/functions/_shared/em/emailBody.ts ]]; then
    if [[ "$fn_name" == "em-draft-reply" ]]; then
      cp supabase/functions/_shared/em/emailBody.ts "${fn}lib/emailBody.ts"
    fi
  fi
  if [[ "$fn_name" == "em-manage-domain" || "$fn_name" == "em-send-queue" || "$fn_name" == "em-resend-webhook" || "$fn_name" == "em-send-reply" ]]; then
    cp supabase/functions/_shared/em/resend.ts "${fn}lib/resend.ts"
  fi
done

FUNCTIONS=(
  em-manage-domain
  em-resend-webhook
  em-send-queue
  em-send-reply
  em-process-sequences
  em-check-replies
  em-sync-inbound-lead
  em-research-company
  em-draft-email
  em-draft-reply
  em-cal-webhook
  em-unsubscribe
)

for name in "${FUNCTIONS[@]}"; do
  echo "Deploying $name..."
  npx supabase functions deploy "$name" --project-ref "$PROJECT_REF"
done

echo "Done. Set secrets in Dashboard if not already:"
echo "  RESEND_API_KEY, GEMINI_API_KEY, IMAP_HOST, IMAP_USER, IMAP_PASSWORD"
