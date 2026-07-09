# Email Marketing — deploy

## Database

```bash
supabase db push
```

Migration: `supabase/migrations/20260709120000_email_marketing.sql`

## Edge function secrets

```bash
supabase secrets set \
  RESEND_API_KEY=re_xxx \
  ANTHROPIC_API_KEY=sk-ant-xxx \
  IMAP_HOST=imap.gmail.com \
  IMAP_PORT=993 \
  IMAP_USER=replies@boostmysites.com \
  IMAP_PASSWORD=app-password
```

## Deploy functions

```bash
supabase functions deploy em-manage-domain
supabase functions deploy em-resend-webhook
supabase functions deploy em-send-queue
supabase functions deploy em-process-sequences
supabase functions deploy em-check-replies
supabase functions deploy em-sync-inbound-lead
supabase functions deploy em-research-company
supabase functions deploy em-draft-email
supabase functions deploy em-cal-webhook
supabase functions deploy em-unsubscribe
```

## Resend webhook

Point Resend webhooks to:

`https://upxsbhsamorhvnfebvor.supabase.co/functions/v1/em-resend-webhook`

Events: `email.sent`, `email.delivered`, `email.opened`, `email.clicked`, `email.bounced`, `email.complained`

## Cron schedules (Supabase Dashboard → Edge Functions → Schedules)

| Function | Cron |
|---|---|
| `em-send-queue` | `*/15 * * * *` |
| `em-process-sequences` | `0 * * * *` |
| `em-check-replies` | `*/15 * * * *` |

## Calendly webhook

`https://upxsbhsamorhvnfebvor.supabase.co/functions/v1/em-cal-webhook`

## Admin setup

1. Log in at `/admin/login` (Supabase Auth session required for RLS).
2. Open **Email Marketing → Settings**.
3. Add domain `boostmysites.com`, paste DNS records, verify.
4. Add senders (`reshab@`, `team@`).
5. Send test email.
6. **Sync from Reshab leads** on Leads page for existing inbound contacts.

## Unsubscribe URL in emails

`https://boostmysites.com/unsubscribe?e={base64(email)}`
