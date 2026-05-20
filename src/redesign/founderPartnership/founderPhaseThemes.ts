import type { FounderPhaseId } from "./founderApplicationTypes";

export type PhaseTheme = {
  wash: string;
  accent: string;
};

/** Ambient wash per chapter — applied over SiteBackground */
export const FOUNDER_PHASE_THEMES: Record<FounderPhaseId, PhaseTheme> = {
  identity: {
    wash: "radial-gradient(55% 45% at 50% 20%, rgba(14, 26, 52, 0.85) 0%, rgba(0, 0, 0, 0) 70%)",
    accent: "rgba(92, 138, 255, 0.12)",
  },
  reality: {
    wash: "radial-gradient(50% 40% at 50% 25%, rgba(22, 48, 90, 0.75) 0%, rgba(0, 0, 0, 0) 72%)",
    accent: "rgba(72, 118, 255, 0.14)",
  },
  business: {
    wash: "radial-gradient(48% 42% at 50% 22%, rgba(28, 44, 88, 0.8) 0%, rgba(0, 0, 0, 0) 68%)",
    accent: "rgba(108, 148, 255, 0.16)",
  },
  investment: {
    wash: "radial-gradient(52% 44% at 50% 24%, rgba(36, 32, 64, 0.75) 0%, rgba(212, 175, 55, 0.06) 45%, rgba(0, 0, 0, 0) 72%)",
    accent: "rgba(212, 175, 55, 0.1)",
  },
  psychology: {
    wash: "radial-gradient(55% 48% at 50% 30%, rgba(40, 36, 72, 0.65) 0%, rgba(0, 0, 0, 0) 75%)",
    accent: "rgba(140, 120, 255, 0.12)",
  },
  close: {
    wash: "radial-gradient(60% 50% at 50% 35%, rgba(22, 36, 74, 0.9) 0%, rgba(72, 118, 255, 0.08) 40%, rgba(0, 0, 0, 0) 78%)",
    accent: "rgba(72, 118, 255, 0.18)",
  },
};
