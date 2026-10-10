/**
 * Minimum daily ad budget for the enquiry form, shown in the visitor's currency.
 * The base is ₹300 a day; other countries get a rounded local equivalent
 * (roughly ₹300 at current rates, rounded up to a friendly number).
 */

export type Budget = { country: string; label: string };

const BUDGETS: Record<string, string> = {
  IN: "₹300",
  US: "$4",
  CA: "C$5",
  AU: "A$6",
  GB: "£3",
  DE: "€4",
  FR: "€4",
  AE: "AED 15",
  SA: "SAR 15",
  SG: "S$5",
  ZA: "R65",
  NG: "₦5,500",
};

export function budgetFor(country: string): Budget {
  return { country, label: BUDGETS[country] ?? BUDGETS.US };
}

const ZONES: [RegExp, string][] = [
  [/^Asia\/(Kolkata|Calcutta)$/, "IN"],
  [/^Asia\/Dubai$/, "AE"],
  [/^Asia\/Riyadh$/, "SA"],
  [/^Asia\/Singapore$/, "SG"],
  [/^Europe\/London$/, "GB"],
  [/^Europe\/Berlin$/, "DE"],
  [/^Europe\/Paris$/, "FR"],
  [/^Africa\/Johannesburg$/, "ZA"],
  [/^Africa\/Lagos$/, "NG"],
  [/^Australia\//, "AU"],
  [/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Montreal)$/, "CA"],
  [/^America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Detroit|Boise|Indiana\/.+)$/, "US"],
  [/^Pacific\/Honolulu$/, "US"],
];

/** Best guess at the country the visitor is viewing from, using their time zone. */
export function guessCountry(): string | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    for (const [re, code] of ZONES) if (re.test(tz)) return code;
  } catch {
    /* no Intl: fall back to the phone picker */
  }
  return null;
}
