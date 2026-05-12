export type ProblemSolution = {
  problem: string;
  solution: string;
};

/** Trimmed from 6 to 4 and rewritten in business language: each pair is an
 *  outcome a non-technical founder would actually say, paired with the way
 *  Boostmysites delivers a fix. Edit copy here without touching layout. */
export const problems: ProblemSolution[] = [
  {
    problem: "Your product takes too long to launch new features.",
    solution:
      "We modernize your stack so releases ship weekly, not quarterly.",
  },
  {
    problem: "Your team wastes hours switching between disconnected systems.",
    solution:
      "We unify product, ops, and business data into one real-time view.",
  },
  {
    problem: "Too much of your business still depends on manual work.",
    solution:
      "We automate the workflows your team currently does by hand.",
  },
  {
    problem: "Mobile experience is hurting retention.",
    solution:
      "We rebuild high-performance mobile flows that lift engagement.",
  },
];
