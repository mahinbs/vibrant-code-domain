# Email Marketing — deploy

## Database

```bash
supabase db push
```

Migration: `supabase/migrations/20260709120000_email_marketing.sql`

Sequence builder v2: `supabase/migrations/20260710120000_sequence_builder_v2.sql` (run in SQL Editor if `db push` fails)

## Edge function secrets

```bash
supabase secrets set \
  RESEND_API_KEY=re_xxx \
  GEMINI_API_KEY=xxx

# Optional legacy (no longer used for drafts/research):
# ANTHROPIC_API_KEY=sk-ant-xxx

# IMAP only if using em-check-replies (deprecated — prefer Resend inbound):
# IMAP_HOST=imap.secureserver.net IMAP_USER=ceo@boostmysites.com IMAP_PASSWORD=...
```

## Deploy functions

From the repo root (CLI — do not paste single files in the Dashboard):

```bash
./scripts/deploy-email-functions.sh
```

New functions: `em-send-reply`, `em-draft-reply`

## Resend webhook

Point Resend webhooks to:

`https://upxsbhsamorhvnfebvor.supabase.co/functions/v1/em-resend-webhook`

Events: include `email.received` plus outbound events (`email.sent`, `email.delivered`, `email.opened`, `email.clicked`, `email.bounced`, `email.complained`)

## Receiving (free plan)

Use your Resend `@xxxx.resend.app` address as **Reply-to** in admin Settings (one custom domain slot stays on `boostmysites.com` for sending).

## Cron schedules (Supabase Dashboard → Edge Functions → Schedules)

| Function | Cron |
|---|---|
| `em-send-queue` | `*/15 * * * *` |
| `em-process-sequences` | `0 * * * *` |

`em-check-replies` (IMAP) is optional/legacy — disable if using Resend inbound.

## Optional: clean duplicate thread rows

If blast sends show both `queued@system` and `ceo@` for the same email:

```sql
DELETE FROM em_email_messages m
USING em_email_messages sent
WHERE m.from_email = 'queued@system'
  AND m.send_id IS NOT NULL
  AND sent.send_id = m.send_id
  AND sent.from_email != 'queued@system'
  AND sent.direction = 'outbound';
```

## Calendly webhook

`https://upxsbhsamorhvnfebvor.supabase.co/functions/v1/em-cal-webhook`

## Admin setup

1. Log in at `/admin/login` (Supabase Auth session required for RLS).
2. Open **Email Marketing → Settings**.
3. Link or add domain `boostmysites.com`, add sender `ceo@`.
4. Set **Reply-to** to your `@xxxx.resend.app` inbox address.
5. Fill **AI knowledge base** for reply drafts.
6. Send test email, reply from Gmail, check **Activity → Replies**.

## Unsubscribe URL in emails

`https://boostmysites.com/unsubscribe?e={base64(email)}`
