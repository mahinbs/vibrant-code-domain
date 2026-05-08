import type { CSSProperties } from "react";
import fintechHealthcareSectionHtml from "../../../fintech_healthcare_section.html?raw";

export function FintechHealthcareSection() {
  const revampOrigin =
    typeof window !== "undefined" ? window.location.origin : "";
  const sectionHtml = fintechHealthcareSectionHtml
    .replaceAll('href="/fintech-landing"', `href="${revampOrigin}/fintech-landing"`)
    .replaceAll(
      'href="/healthcare-landing"',
      `href="${revampOrigin}/healthcare-landing"`,
    );

  return (
    <section
      className="w-full max-w-[min(1920px,96vw)] px-10 pb-10 max-md:px-5"
      style={
        {
          "--color-text-primary": "#f4f7ff",
          "--color-text-secondary": "rgba(222, 229, 245, 0.72)",
          "--color-background-primary": "rgba(27, 30, 40, 0.92)",
          "--color-background-secondary": "rgba(20, 23, 31, 0.95)",
          "--color-border-secondary": "rgba(255, 255, 255, 0.24)",
          "--color-border-tertiary": "rgba(255, 255, 255, 0.14)",
          "--border-radius-lg": "16px",
          "--border-radius-md": "10px",
        } as CSSProperties
      }
      dangerouslySetInnerHTML={{ __html: sectionHtml }}
    />
  );
}
