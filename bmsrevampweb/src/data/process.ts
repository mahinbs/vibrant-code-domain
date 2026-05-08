export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Free consultation, scope mapping, and a written proposal in 24 hours.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Wireframes, UI, and clickable prototypes you can poke holes in early.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Weekly demos, transparent sprints, and code you fully own at the end.",
  },
  {
    number: "04",
    title: "Launch & support",
    description:
      "Production launch, analytics wired in, and 24/7 support after go-live.",
  },
];
