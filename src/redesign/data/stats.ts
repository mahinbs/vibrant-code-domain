export type Stat = {
  value: string;
  label: string;
  sublabel?: string;
};

export const stats: Stat[] = [
  { value: "40,000+", label: "Hours automated", sublabel: "Given back to teams" },
  { value: "120+", label: "Workflows shipped", sublabel: "Live & maintained" },
  { value: "98%", label: "Client retention", sublabel: "They keep scaling" },
  { value: "24/7", label: "Always-on", sublabel: "Runs while you sleep" },
  { value: "<90 days", label: "To ROI", sublabel: "For most clients" },
];

export const trustBadges = [
  { value: "4.9/5", label: "Average rating" },
  { value: "40,000+", label: "Hours automated" },
  { value: "24hr", label: "Audit turnaround" },
] as const;
