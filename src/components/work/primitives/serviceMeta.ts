import type { ComponentType, SVGProps } from "react";
import {
  AiAutomationIcon,
  AiCallIcon,
  DesignIcon,
  MobileIcon,
  SaasIcon,
  WebAppIcon,
} from "./icons";

export type ServiceId =
  | "web"
  | "saas"
  | "mobile"
  | "ai-calling"
  | "ai-automation"
  | "design";

export type ServiceMeta = {
  id: ServiceId;
  title: string;
  shortLabel: string;
  watermark: string;
  blurb: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Used for headline gradient + card sheen accents. */
  accent: string;
  cardOverlay: string;
};

export const serviceMeta: Record<ServiceId, ServiceMeta> = {
  web: {
    id: "web",
    title: "Web Applications",
    shortLabel: "Web",
    watermark: "WEB APPS",
    blurb:
      "Production-grade web platforms built with modern frameworks, designed to scale.",
    icon: WebAppIcon,
    accent: "rgba(72, 118, 255, 0.7)",
    cardOverlay:
      "radial-gradient(120% 100% at 0% 0%, rgba(72,118,255,0.48), rgba(0,0,0,0.85) 70%)",
  },
  saas: {
    id: "saas",
    title: "SaaS Platforms",
    shortLabel: "SaaS",
    watermark: "SAAS",
    blurb:
      "Multi-tenant SaaS with billing, analytics and admin baked in from day one.",
    icon: SaasIcon,
    accent: "rgba(96, 142, 255, 0.65)",
    cardOverlay:
      "radial-gradient(120% 100% at 100% 0%, rgba(96,142,255,0.34), rgba(0,0,0,0.85) 70%)",
  },
  mobile: {
    id: "mobile",
    title: "Mobile Applications",
    shortLabel: "Mobile",
    watermark: "MOBILE",
    blurb:
      "Native and cross-platform iOS / Android apps your users actually love.",
    icon: MobileIcon,
    accent: "rgba(72, 118, 255, 0.72)",
    cardOverlay:
      "radial-gradient(120% 100% at 0% 100%, rgba(72,118,255,0.52), rgba(0,0,0,0.85) 70%)",
  },
  "ai-calling": {
    id: "ai-calling",
    title: "AI Calling Agency",
    shortLabel: "AI Calling",
    watermark: "AI CALLING",
    blurb:
      "Voice AI agents that qualify leads, run support and close deals 24/7.",
    icon: AiCallIcon,
    accent: "rgba(108, 148, 255, 0.7)",
    cardOverlay:
      "radial-gradient(120% 100% at 50% 0%, rgba(108,148,255,0.45), rgba(0,0,0,0.88) 70%)",
  },
  "ai-automation": {
    id: "ai-automation",
    title: "AI Automation",
    shortLabel: "AI Automation",
    watermark: "AI OPS",
    blurb:
      "Custom AI workflows that take repetitive ops off your team's plate.",
    icon: AiAutomationIcon,
    accent: "rgba(84, 130, 255, 0.7)",
    cardOverlay:
      "radial-gradient(120% 100% at 100% 100%, rgba(84,130,255,0.4), rgba(0,0,0,0.9) 70%)",
  },
  design: {
    id: "design",
    title: "Product Design (UI/UX)",
    shortLabel: "Design",
    watermark: "DESIGN",
    blurb:
      "Interfaces that feel inevitable - clear, fast, and conversion-tuned.",
    icon: DesignIcon,
    accent: "rgba(140, 178, 255, 0.65)",
    cardOverlay:
      "radial-gradient(120% 100% at 50% 100%, rgba(22,36,74,0.78), rgba(0,0,0,0.92) 70%)",
  },
};

export const orderedServiceIds: ServiceId[] = [
  "web",
  "saas",
  "mobile",
  "ai-calling",
  "ai-automation",
  "design",
];

/**
 * Reorder a list of service ids so the focused id (if known) sits first.
 * Other ids keep their relative order. Returns a new array.
 */
export function reorderWithFocus(
  ids: ServiceId[],
  focus: ServiceId | null,
): ServiceId[] {
  if (!focus) return [...ids];
  const idx = ids.indexOf(focus);
  if (idx <= 0) return [...ids];
  const next = [...ids];
  const [removed] = next.splice(idx, 1);
  next.unshift(removed);
  return next;
}

export function isServiceId(value: string | null | undefined): value is ServiceId {
  if (!value) return false;
  return value in serviceMeta;
}

/**
 * Map raw query-string values (which may be marketing ids OR backend ids)
 * onto our internal ServiceId. Returns null if no match.
 */
export function parseFocusParam(raw: string | null): ServiceId | null {
  if (!raw) return null;
  const direct = raw.trim().toLowerCase();
  if (isServiceId(direct)) return direct;
  const backendMap: Record<string, ServiceId> = {
    "web-apps": "web",
    "mobile-apps": "mobile",
    "uxui-design": "design",
    "ux-ui-design": "design",
  };
  return backendMap[direct] ?? null;
}
