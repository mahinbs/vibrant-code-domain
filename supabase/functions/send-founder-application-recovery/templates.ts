export type ReminderTier = "r1" | "r2" | "r3" | "r4_ego";

export type DraftPayload = {
  name?: string | null;
  email?: string | null;
  current_step?: string | null;
  resume_token?: string | null;
  reminder_count?: number | null;
  updated_at?: string | null;
  payload?: Record<string, unknown> | null;
};

const BUILDING_LABELS: Record<string, string> = {
  saas: "SaaS Platform",
  "ai-product": "AI Product",
  fintech: "Fintech Startup",
  marketplace: "Marketplace",
  "mobile-app": "Mobile App",
  "internal-software": "Internal Business Software",
  healthcare: "Healthcare Platform",
  other: "your product",
};

const TIMELINE_LABELS: Record<string, string> = {
  immediately: "immediate",
  "within-30": "within 30 days",
  "1-3mo": "1–3 months",
  exploring: "exploring timelines",
  researching: "researching",
};

const BUDGET_LABELS: Record<string, string> = {
  "below-3l": "Below ₹3L",
  "3l-5l": "₹3L–₹5L",
  "5l-10l": "₹5L–₹10L",
  "10l-20l": "₹10L–₹20L",
  "20l-50l": "₹20L–₹50L",
  "custom-scale": "strategic scale",
};

function firstName(draft: DraftPayload): string {
  const fromName = (draft.name ?? "").trim().split(/\s+/)[0];
  const fromPayload = String((draft.payload as { name?: string })?.name ?? "")
    .trim()
    .split(/\s+/)[0];
  return fromName || fromPayload || "there";
}

function formField(draft: DraftPayload, key: string): string {
  const p = draft.payload ?? {};
  return String(p[key] ?? "");
}

function buildingLabel(draft: DraftPayload): string {
  const type = formField(draft, "buildingType");
  if (type === "other") {
    const other = formField(draft, "buildingTypeOther").trim();
    return other || "your venture";
  }
  return BUILDING_LABELS[type] ?? "your venture";
}

function isHighIntent(draft: DraftPayload): boolean {
  const timeline = formField(draft, "timeline");
  const budget = formField(draft, "budgetInr");
  return (
    timeline === "immediately" ||
    timeline === "within-30" ||
    budget === "10l-20l" ||
    budget === "20l-50l" ||
    budget === "custom-scale"
  );
}

function progressHint(draft: DraftPayload): string {
  const step = draft.current_step ?? "identity";
  if (["hero", "identity", "building", "ideaOrigin"].includes(step)) {
    return "You're still in the introduction — it only takes a few more minutes.";
  }
  if (
    ["blockers", "noCode", "technicalSupport", "marketUnderstanding", "validation", "commitment", "timeline"].includes(
      step,
    )
  ) {
    return "You're past the intro — the business and timeline questions are what help us assess fit.";
  }
  return "You're close to the finish — the final reflection questions take just a few minutes.";
}

export function pickTier(draft: DraftPayload, now = Date.now()): ReminderTier | null {
  const count = draft.reminder_count ?? 0;
  const updated = new Date(draft.updated_at ?? 0).getTime();
  const idleMs = now - updated;

  const HOUR = 60 * 60 * 1000;
  const DAY = 24 * HOUR;

  if (count === 0 && idleMs >= HOUR) return "r1";
  if (count === 1 && idleMs >= DAY) return "r2";
  if (count === 2 && idleMs >= 2 * DAY) return "r3";
  if (count >= 3 && idleMs >= 7 * DAY) return "r4_ego";

  return null;
}

export function buildEmail(
  draft: DraftPayload,
  tier: ReminderTier,
  resumeUrl: string,
): { subject: string; body: string } {
  const name = firstName(draft);
  const building = buildingLabel(draft);
  const timeline = TIMELINE_LABELS[formField(draft, "timeline")] ?? "your planned timeline";
  const budget = BUDGET_LABELS[formField(draft, "budgetInr")] ?? "";
  const highIntent = isHighIntent(draft);
  const footer = `\n\nContinue your application:\n${resumeUrl}\n\n— BoostMySites Founder Application`;

  switch (tier) {
    case "r1":
      return {
        subject: "Your founder application is waiting",
        body: `Hi ${name},

You started the founder application with BoostMySites. ${progressHint(draft)}

Pick up where you left off when you're ready — your progress is saved.${footer}`,
      };

    case "r2": {
      const subject = highIntent
        ? `${name}, your ${building} application needs a few more answers`
        : `You said you're building ${building} — finish your application`;
      return {
        subject,
        body: `Hi ${name},

You told us you're building ${building}. We'd like to understand your business fundamentals, timeline, and partnership goals before we review fit.

${highIntent ? "Given your timeline and investment range, completing the application helps us prioritize founder conversations." : "Founders who complete the full application get a clearer picture of execution scope and partnership structure."}${footer}`,
      };
    }

    case "r3":
      return {
        subject: highIntent
          ? "Finalize your founder application — review is selective"
          : "A few steps left on your founder application",
        body: `Hi ${name},

Founders planning to move on a ${timeline} timeline${budget ? ` with a ${budget} investment range` : ""} usually don't leave applications half-finished — the review queue moves quickly.

BoostMySites partners with a limited number of execution-ready founders each quarter. Completing your application is how we assess whether there's a fit.${footer}`,
      };

    case "r4_ego":
      return {
        subject: "Founder application — should we close yours?",
        body: `Hi ${name},

Most founders who pause at this stage don't make it to application review. That's not a judgment — it's what we see after years of working with builders at scale.

BoostMySites is selective. We take on founders who are ready to execute, not indefinitely "exploring." If ${building} is still real for you, finish the application. If not, no action needed — we'll archive your draft.

If you're serious about shipping with a dedicated execution partner, this is the last reminder we'll send.${footer}`,
      };

    default:
      return {
        subject: "Complete your founder application",
        body: `Hi ${name},\n\nContinue your application when you're ready.${footer}`,
      };
  }
}
