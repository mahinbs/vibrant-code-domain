# Founder Partnership — Recovery emails & edge function

## Edge function location

- Source: `supabase/functions/send-founder-application-recovery/index.ts`
- Templates: `supabase/functions/send-founder-application-recovery/templates.ts`
- Config: `supabase/config.toml` → `[functions.send-founder-application-recovery]`

## Database migrations

Apply in order:

1. `supabase/migrations/20260519180000_founder_application_drafts.sql`
2. `supabase/migrations/20260520120000_founder_draft_reminders.sql`

```bash
supabase db push
```

## Deploy

```bash
supabase functions deploy send-founder-application-recovery
supabase secrets set SITE_ORIGIN=https://boostmysites.com
```

## Schedule (cron)

There is no cron in the repo. In Supabase Dashboard:

1. Edge Functions → `send-founder-application-recovery` → **Schedules**
2. Add cron: `*/30 * * * *` (every 30 minutes) or `0 * * * *` (hourly)

Or invoke manually:

```bash
curl -X POST "https://<PROJECT_REF>.supabase.co/functions/v1/send-founder-application-recovery" \
  -H "Authorization: Bearer <SUPABASE_ANON_OR_SERVICE_ROLE_KEY>"
```

## Email ladder

| Tier | When | Tone |
|------|------|------|
| R1 | 1h idle, `reminder_count = 0` | Gentle nudge |
| R2 | 24h after R1 | Personalized (building, progress) |
| R3 | 48h after R2 | Urgency / selective partnership |
| R4 ego | 7d idle, `reminder_count >= 3`, once | Firm selective close (ego_email_sent_at) |

Emails send via `https://send-mail-redirect-boostmysites.vercel.app/send-email` (plain text).

Resume link: `{SITE_ORIGIN}/founder-partnership?resume={resume_token}`

## On-site resume

Returning users see **FounderResumeOverview** (progress %, saved answers, Continue / Start over).

- **Continue** → restores form and step
- **Start over** → marks draft `abandoned`, clears tokens, returns to hero

## Test matrix

1. Start application, enter email on identity, advance → draft saved
2. Open `?resume=<token>` → overview modal with correct chips
3. Continue → same step and answers
4. Start over → hero, empty form
5. Backdate `updated_at` in DB, set `reminder_count`, invoke function → correct tier subject
6. Complete application → no further emails (`status = completed`)
7. Hero typewriter plays once per browser session; other scenes show instant headlines
