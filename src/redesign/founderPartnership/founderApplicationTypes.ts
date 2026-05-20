/** Scene step identifiers — order matches SCENE_ORDER in config */
export type FounderSceneId =
  | "hero"
  | "identity"
  | "building"
  | "ideaOrigin"
  | "blockers"
  | "noCode"
  | "technicalSupport"
  | "marketUnderstanding"
  | "validation"
  | "commitment"
  | "timeline"
  | "budget"
  | "partnership"
  | "vision3Year"
  | "founderMindset"
  | "psychStake"
  | "psychConviction"
  | "milestone"
  | "queue"
  | "aboutCompany";

export type FounderPhaseId =
  | "identity"
  | "reality"
  | "business"
  | "investment"
  | "psychology"
  | "close";

export type FounderArchetype = "operator" | "builder" | "dreamer" | "researcher";

export type FounderPartnerFit = "high" | "medium" | "low";

export type FounderProfile = {
  archetype: FounderArchetype;
  maturityScore: number;
  urgencyScore: number;
  mindsetScore: number;
  partnerFit: FounderPartnerFit;
};

export type FounderApplicationFormState = {
  name: string;
  email: string;
  phone: string;
  phoneCountry: string;
  buildingType: string;
  buildingTypeOther: string;
  ideaOrigin: string;
  launchBlockers: string[];
  exploredNoCode: "" | "yes" | "no";
  technicalSupport: string;
  revenueModel: string;
  validationStage: string;
  commitmentLevel: number;
  timeline: string;
  budgetInr: string;
  partnershipTypes: string[];
  vision3Year: string;
  founderMindset: string;
  psychStake: string;
  psychConviction: string;
};

export type FounderApplicationPayload = FounderApplicationFormState & {
  form_version: "v2.2";
  founder_profile: FounderProfile;
  utm?: Record<string, string>;
  referrer?: string;
};

export type FounderApplicationSubmitInput = FounderApplicationFormState & {
  sourcePage: string;
};
