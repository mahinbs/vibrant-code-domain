import type { ComponentType, SVGProps } from "react";
import {
  AcmeIcon,
  ApexIcon,
  CelestialIcon,
  EchoValleyIcon,
  QuantumIcon,
} from "../components/icons";

export type Logo = {
  name: string;
  /** Tailwind classes to apply to the rendered name span (font + size) */
  textClass: string;
  /** Optional leading icon component */
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  /** Optional override prefix (used by 2TWICE which has a bold "2") */
  prefix?: { text: string; className: string };
};

/**
 * Stand-in client marks. Swap with approved real client logos when available.
 * Names are intentionally generic so the ticker reads as "trusted by teams
 * across industries" rather than name-dropping unauthorised brands.
 */
export const logos: Logo[] = [
  {
    name: "Northwind",
    textClass: "font-satoshi font-bold text-base",
    Icon: AcmeIcon,
  },
  {
    name: "Forbes",
    textClass: "font-paytone text-[17px]",
  },
  {
    name: "PULSE",
    textClass: "font-panchang font-bold text-base",
  },
  {
    name: "APEX",
    textClass: "font-chillax font-bold text-base",
    Icon: ApexIcon,
  },
  {
    name: "Quantum",
    textClass: "font-switzer font-bold text-base",
    Icon: QuantumIcon,
  },
  {
    name: "Celestial",
    textClass: "font-satoshi font-bold text-base",
    Icon: CelestialIcon,
  },
  {
    name: "Echo Valley",
    textClass: "font-chillax font-semibold text-base tracking-[-0.4px]",
    Icon: EchoValleyIcon,
  },
  {
    name: "TWICE",
    textClass: "font-quantico text-[17px]",
    prefix: { text: "2", className: "font-bold" },
  },
];
