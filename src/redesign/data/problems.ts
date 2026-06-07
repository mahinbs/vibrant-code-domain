export type ProblemSolution = {
  problem: string;
  solution: string;
};

/** Trimmed from 6 to 4 and rewritten in business language: each pair is an
 *  outcome a non-technical founder would actually say, paired with the way
 *  Boostmysites delivers a fix. Edit copy here without touching layout. */
export const problems: ProblemSolution[] = [
  {
    problem: "A lead fills out a form at 9pm — and sits untouched until the next afternoon.",
    solution:
      "Leads get captured, scored and answered the moment they arrive, 24/7.",
  },
  {
    problem: "Your best people spend mornings copy-pasting between apps that don't talk.",
    solution:
      "We wire your tools together so data flows without anyone touching it.",
  },
  {
    problem: "Customers ask the same five questions, answered by hand. Again.",
    solution:
      "A custom-trained assistant resolves the repeats and escalates the rest.",
  },
  {
    problem: "The \"quick\" weekly report eats half a day, every single week.",
    solution:
      "Live dashboards build themselves before you've had your coffee.",
  },
];
