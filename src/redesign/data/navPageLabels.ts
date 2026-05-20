/** Short labels for the redesign nav when not on the homepage. */
export const NAV_PAGE_LABELS: Record<string, string> = {
  "/build-your-tech-company": "Build your tech company",
  "/founder-partnership": "Founder application",
  "/fintech-landing": "Fintech",
  "/healthcare-landing": "Healthcare",
  "/startup-launch": "Startup launch",
};

export function getNavPageLabel(pathname: string): string | null {
  return NAV_PAGE_LABELS[pathname] ?? null;
}
