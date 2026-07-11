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
      "Check **Inbox** to read threads and reply inline.",
    ],
    tip: "If domain says not_configured, you still need to finish steps 1–2 in Settings.",
  },
  settings: {
    title: "Domain setup",
    steps: [
      "If boostmysites.com is already verified in Resend, click **Link verified domain**.",
      "Otherwise add DNS in Resend/GoDaddy first, then link — or use **Add via Resend API** with a full-access key.",
      "Do **not** change the root @ MX records (those are for ceo@ email).",
      "Set **Reply-to** to your Resend `@xxxx.resend.app` inbox (free plan) or a custom receiving address.",
      "Fill **AI knowledge base** with services, pricing, and tone for reply drafts.",
      "Type **ceo** in Local part and click **Add sender** (not Save settings).",
      "Click **Send test** to confirm sending works.",
    ],
    warning:
      "Send-only Resend API keys cannot add domains via API — use Link verified domain. On the free plan use `.resend.app` for receiving; keep ceo@ Titan MX on root @ unchanged.",
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
      "The **workflow canvas** shows your sequence top-to-bottom. Click any node to edit it in the panel on the right.",
      "**Fork nodes** (diamond) mean opened vs not-opened branches at the same step. Select a step or fork, then **Split: opened / not opened**.",
      "**Conditions** on a single step **skip** it if not met — they do not send a different email. Use **Split** for different emails at the same position.",
      "**Delay** = wait that long after the previous send before the step runs (and before open/click is checked on branch steps).",
      "Phase 1 (days 0–30): opener → split → follow-ups. Phase 2: weekly nurture — set **+7 days** on each weekly step.",
      "Replies and unsubscribes stop the sequence automatically. Use **Import** to enroll leads when ready.",
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
      "Open **Leads** to see them, then **Inbox** for sends and replies.",
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
      "Read the **Email thread** — expand older messages or show full quotes.",
      "Use **Reply** box: write manually or **Generate AI reply**, then **Send reply**.",
      "Click **AI research** for cold leads before the first email goes out.",
      "Click **Mark as replied** if they responded outside email — stops their sequence.",
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
      "Check **Inbox** for opens and replies across all emails.",
    ],
  },
  inbox: {
    title: "Inbox",
    steps: [
      "Conversations are grouped by lead — outbound and inbound in one thread.",
      "Use **Needs reply** (default) to see who is waiting on you.",
      "Select a thread to read the full history and **reply inline**.",
      "Use **Generate AI reply** or write manually, then **Send reply**.",
      "Filter by Unread, Waiting, or Replied. Search by name, email, or subject.",
    ],
    tip: "Press / to search, j/k to move between threads, r to focus the reply box.",
  },
};

export function getHelpKeyFromPath(pathname: string): string {
  if (pathname === "/admin/email-marketing") return "overview";
  if (pathname === "/admin/email-marketing/settings") return "settings";
  if (pathname === "/admin/email-marketing/import") return "import";
  if (pathname === "/admin/email-marketing/inbox") return "inbox";
  if (pathname === "/admin/email-marketing/activity") return "inbox";
  if (pathname === "/admin/email-marketing/leads") return "leads";
  if (/^\/admin\/email-marketing\/leads\/[^/]+$/.test(pathname)) return "leadDetail";
  if (pathname === "/admin/email-marketing/campaigns") return "campaigns";
  if (pathname === "/admin/email-marketing/campaigns/new") return "campaignNew";
  if (/^\/admin\/email-marketing\/campaigns\/[^/]+$/.test(pathname)) return "campaignDetail";
  if (pathname === "/admin/email-marketing/sequences") return "sequences";
  if (/^\/admin\/email-marketing\/sequences\/[^/]+$/.test(pathname)) return "sequenceBuilder";
  return "overview";
}
