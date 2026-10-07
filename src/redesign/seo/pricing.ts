import { site } from "../data/site";

/**
 * Every price shown on boostmysites.com comes from here. Checkout and credit
 * packs live on boostmysites.in (the product); this site only informs.
 */
export const PRICING = {
  teaser: "From ₹33,333 a month + GST, or US$199 a month",
  creditsNote:
    "Every plan loads prepaid AI Growth Credits that are drawn down for agreed work. Ad spend is separate: you pay the platforms directly from your own ad accounts.",
  signupUrl: site.productUrl,
  plans: {
    INR: [
      {
        id: "monthly",
        name: "Monthly",
        price: "₹33,333",
        unit: "a month + GST",
        blurb: "The full acquisition stack, month to month. Pause before the next cycle.",
      },
      {
        id: "yearly",
        name: "Yearly",
        price: "₹89,999",
        unit: "a year + GST",
        blurb: "Twelve months of the full stack for less than three months of the monthly plan.",
        badge: "Best value",
      },
    ],
    USD: [
      {
        id: "monthly",
        name: "Monthly",
        price: "US$199",
        unit: "a month",
        blurb: "The full acquisition stack, billed monthly in USD.",
      },
      {
        id: "yearly",
        name: "Yearly",
        price: "US$999",
        unit: "a year",
        blurb: "Twelve months of the full stack, billed once in USD.",
        badge: "Best value",
      },
    ],
  },
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
    "Onboarding: we scan your website, connect your ad accounts and CRM, and run the pre-flight check — you sign in to your own accounts",
    "An ad-health baseline and fix list in the first days",
    "Support on WhatsApp: +91 96329 53355",
  ],
} as const;
