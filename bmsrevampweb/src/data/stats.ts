export type Stat = {
  value: string;
  label: string;
  sublabel?: string;
};

export const stats: Stat[] = [
  { value: "500+", label: "Projects delivered", sublabel: "Across 56+ cities" },
  { value: "230+", label: "Experts on staff", sublabel: "Devs, designers, AI" },
  { value: "7+", label: "Years building", sublabel: "Trusted since 2017" },
  { value: "24/7", label: "Support", sublabel: "Across 5 time zones" },
  { value: "2", label: "Regulated verticals", sublabel: "Fintech & Healthcare" },
];

export const trustBadges = [
  { value: "4.9/5", label: "Average rating" },
  { value: "500+", label: "Projects shipped" },
  { value: "24hr", label: "Response guarantee" },
] as const;
