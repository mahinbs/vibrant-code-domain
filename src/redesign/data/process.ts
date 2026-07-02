export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  illustrationSrc?: string;
  illustrationAlt?: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Free automation audit",
    description:
      "We map your workflows and find where time and money leak. You keep the plan either way.",
  },
  {
    number: "02",
    title: "We build it",
    description:
      "Our team designs and builds your automations around your existing tools — hands-off for you.",
  },
  {
    number: "03",
    title: "Go live",
    description:
      "Everything ships, gets tested against real work, and starts running quietly in the background.",
  },
  {
    number: "04",
    title: "We maintain it",
    description:
      "We monitor, fix, and improve as you grow. You just enjoy the time back.",
  },
];
