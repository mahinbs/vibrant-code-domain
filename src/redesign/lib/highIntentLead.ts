/**
 * High-intent lead form payload (homepage + fintech/healthcare landings + services modal).
 * Value strings are stable keys for scoring + admin JSON display.
 */
export type HighIntentLeadPayload = {
  industry: string;
  whatBuilding: string;
  projectStage: string;
  userScale: string;
  complianceNeeds: string[];
  timeline: string;
  /** INR budget band (stable keys for scoring). */
  budgetInr: string;
  decisionRole: string;
  /** Optional; empty string when skipped */
  technicalChallenge: string;
  company?: string;
  website?: string;
};

export type HighIntentLeadSubmitInput = {
  name: string;
  email: string;
  phone: string;
  sourcePage: string;
  /** When opened from homepage Services modal — stored inside payload JSON */
  serviceModal?: { id: string; title: string };
} & HighIntentLeadPayload;
