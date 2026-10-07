import { site } from "../data/site";

/**
 * Every price shown on boostmysites.com comes from here. The product
 * (boostmysites.in) sells credit packs only — no retainer, no subscription.
 * Keep in sync with the packs on boostmysites.in/app (Billing → Buy credits).
 */
export const PRICING = {
  teaser: "Credits from ₹899 + GST or $9.99. No retainer, no subscription",
  starter: "2,500 credits cost ₹899 + GST in India or $9.99 elsewhere",
  creditsNote:
    "You buy credits once and they only move when something is done: a lead found, an invite sent, a conversation handled, a campaign built. A quiet week costs nothing, and credits never expire. Ad spend is separate and paid to the platforms from your own ad accounts.",
  /** Sign-up / buy-credits buttons go to the indexable product homepage (it has the sign-up CTA). */
  signupUrl: site.productHome,
  /** India packs, prices before 18% GST. */
  packsINR: [
    { credits: 2500, price: 899 },
    { credits: 5000, price: 1699 },
    { credits: 10000, price: 2999 },
    { credits: 25000, price: 6999, popular: true },
    { credits: 100000, price: 24999 },
    { credits: 250000, price: 54999 },
  ],
  /** Outside India: the starter pack price published on boostmysites.in; larger packs are shown at checkout. */
  usdStarter: { credits: 2500, price: 9.99 },
  /** "What a result costs" — the public catalogue on boostmysites.in. */
  actionCosts: [
    { action: "A qualified lead found for you", credits: 12 },
    { action: "A LinkedIn invite, personalised", credits: 7 },
    { action: "A WhatsApp conversation handled", credits: 10 },
    { action: "An email delivered", credits: 1 },
    { action: "An AI voice call made", credits: 60 },
    { action: "A campaign built in your ad account", credits: 150 },
    { action: "A full AI growth plan", credits: 125 },
    { action: "A lead synced to your CRM", credits: 2 },
  ],
  catalogueNote: "Prices are the current catalogue and can change; your credit history always shows what each action cost you.",
  included: [
    "Ad campaigns on Meta, Google, LinkedIn, TikTok, YouTube, Snapchat and ChatGPT ads",
    "Eight AI agents that plan, launch, optimise and follow up",
    "The 20-minute optimisation loop: 72 checks a day",
    "WhatsApp, LinkedIn and email follow-ups",
    "Leads scored, enriched and pushed into your CRM",
    "Nothing spends until you approve; pause everything in one click",
    "A plain-English report every week",
  ],
  support: [
    "A named growth manager on our team owns your account, and you can reach them",
    "They help connect your Meta and Google ad accounts, pixel, WhatsApp and calling number",
    "Short on time? They can build and launch campaigns for you. Nothing spends until you approve",
    "When an ad is rejected or a payment fails, our team gets the alert and helps you fix it",
    "Optional auto top-up when you run low, by UPI Autopay or card, with a ceiling you set",
    "Support on WhatsApp: +91 96329 53355",
  ],
} as const;

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
export const creditsLabel = (n: number) => n.toLocaleString("en-IN");
