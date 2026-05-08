import type { CSSProperties } from "react";
import fintechHealthcareSectionHtml from "../assets/fintech_healthcare_section.html?raw";

export function FintechHealthcareSection() {
  const revampOrigin =
    typeof window !== "undefined" ? window.location.origin : "";
  const sectionHtml = fintechHealthcareSectionHtml
    .replace(/href="\/fintech-landing"/g, `href="${revampOrigin}/fintech-landing"`)
    .replace(
      /href="\/healthcare-landing"/g,
      `href="${revampOrigin}/healthcare-landing"`,
    );

  return (
    <section
      className="w-full max-w-[1920px] overflow-x-hidden px-10 pb-10 max-md:px-5"
      style={
        {
          background:
            "radial-gradient(50% 40% at 50% 30%, var(--color-dark-purple) 0%, rgba(0,0,0,0) 100%)",
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
