/** Short labels for the redesign nav when not on the homepage. */
export const NAV_PAGE_LABELS: Record<string, string> = {
  "/fintech-landing": "Fintech",
  "/healthcare-landing": "Healthcare",
  "/business-automation": "AI Automation",
  "/personal-automation": "Personal Automation",
};

export function getNavPageLabel(pathname: string): string | null {
  return NAV_PAGE_LABELS[pathname] ?? null;
}
