export type EmHelpContent = {
  title: string;
  steps: string[];
  tip?: string;
  warning?: string;
};

export const emailMarketingHelp: Record<string, EmHelpContent> = {
  overview: {
    title: "Getting started",
    steps: [
      "Go to **Settings** and add your domain (boostmysites.com).",
      "Copy the DNS records into GoDaddy. Wait until the domain shows **verified**.",
      "Add senders (reshab@, team@) and click **Send test**.",
      "Go to **Sequences** and pick or create a cold email flow.",
      "Go to **Import**, upload your CSV, and pick which sequence to use.",
      "Check **Activity** to see sent emails and replies.",
    ],
    tip: "If domain says not_configured, you still need to finish steps 1–2 in Settings.",
  },
  settings: {
    title: "Domain setup",
    steps: [
      "Type your domain and click **Add domain**.",
      "Copy the DKIM, SPF, and MX records into GoDaddy.",
      "Do **not** change the root @ MX records (those are for ceo@ email).",
      "Click **Verify** and wait 5–30 minutes.",
      "Add the email addresses you want to send from.",
      "Set **Reply-to** to ceo@boostmysites.com and click **Save**.",
      "Click **Send test** to yourself to confirm it works.",
    ],
    warning: "Keep Resend “Enable Receiving” OFF. Replies go to your GoDaddy inbox, not Resend.",
  },
  sequences: {
    title: "Email sequences",
    steps: [
      "Click **New sequence** (example: Real estate cold).",
      "Click the sequence name to open the builder.",
      "Add steps: opener → case study → follow-up → breakup.",
      "Set **delay** (how many days to wait between emails).",
      "Pick **Template**, **AI**, or **Case study** for each step.",
      "Click **Save step** on each one, then use **Import** to add leads.",
    ],
  },
  sequenceBuilder: {
    title: "Build your sequence",
    steps: [
      "**Step 1:** AI opener — delay 0 days, sends right away.",
      "**Step 2:** Case study — delay +3 days, only if they did not reply.",
      "**Step 3:** AI follow-up or template breakup email.",
      "Click **Preview AI draft** to see what the AI will write.",
      "Click **Add step** for more follow-ups (no limit).",
      "When done, go to **Import** and enroll leads into this sequence.",
    ],
  },
  import: {
    title: "Import leads",
    steps: [
      "Make a CSV with columns: email, name, company.",
      "Choose **Cold outreach** (or Blast only if you do not want a sequence).",
      "Pick **which sequence** to enroll them in.",
      "Paste your CSV into the box.",
      "Click **Import & enroll**.",
      "Open **Leads** to see them, then **Activity** for sends (cron runs every ~15 min).",
    ],
  },
  leads: {
    title: "Your leads",
    steps: [
      "Click **Sync from Reshab leads** to pull inbound form contacts.",
      "Click a name to see their full email thread.",
      "Check the boxes next to leads, pick a sequence, click **Bulk enroll**.",
      "Use the pipeline filter: cold, inbound, or blast only.",
    ],
    tip: "No leads yet? Go to Import and upload a CSV.",
  },
  leadDetail: {
    title: "Lead detail",
    steps: [
      "See **Sequence enrollment** — which step they are on.",
      "Use the dropdown and **Enroll** to put them in a different sequence.",
      "Click **Pause** to stop emails temporarily, or **Resume** to continue.",
      "Read the **Email thread** below — includes AI drafts and replies.",
      "Click **AI research** for cold leads before the first email goes out.",
    ],
  },
  campaigns: {
    title: "Campaigns (blasts)",
    steps: [
      "A **blast** is a one-time email to many people — not a follow-up sequence.",
      "Click **New blast** to write subject and body.",
      "Choose who receives it (pipeline filter).",
      "Blasts run separately — they do not reset sequence timers.",
    ],
    tip: "For cold outreach with follow-ups, use Sequences + Import instead.",
  },
  campaignNew: {
    title: "New blast",
    steps: [
      "Give your blast a name.",
      "Write the **subject** and **body**.",
      "Pick who gets it (cold, inbound, or all).",
      "Click **Create & send** when ready.",
    ],
  },
  campaignDetail: {
    title: "Campaign detail",
    steps: [
      "See who received this blast and whether it was sent.",
      "Click **Export CSV** to download the send log.",
      "Check **Activity** for opens and replies across all emails.",
    ],
  },
  activity: {
    title: "Activity",
    steps: [
      "**Sent** tab shows emails that went out.",
      "**Replies** tab shows people who wrote back.",
      "Click **Check replies (IMAP)** to pull new replies from ceo@ inbox.",
      "Click **Process send queue** to send waiting emails (usually automatic).",
      "Click **View thread** on a reply to see the full conversation.",
    ],
    tip: "Only click the manual buttons if cron has not run yet or you are testing.",
  },
};

export function getHelpKeyFromPath(pathname: string): string {
  if (pathname === "/admin/email-marketing") return "overview";
  if (pathname === "/admin/email-marketing/settings") return "settings";
  if (pathname === "/admin/email-marketing/import") return "import";
  if (pathname === "/admin/email-marketing/activity") return "activity";
  if (pathname === "/admin/email-marketing/leads") return "leads";
  if (/^\/admin\/email-marketing\/leads\/[^/]+$/.test(pathname)) return "leadDetail";
  if (pathname === "/admin/email-marketing/campaigns") return "campaigns";
  if (pathname === "/admin/email-marketing/campaigns/new") return "campaignNew";
  if (/^\/admin\/email-marketing\/campaigns\/[^/]+$/.test(pathname)) return "campaignDetail";
  if (pathname === "/admin/email-marketing/sequences") return "sequences";
  if (/^\/admin\/email-marketing\/sequences\/[^/]+$/.test(pathname)) return "sequenceBuilder";
  return "overview";
}
