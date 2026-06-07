export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  metric: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We were drowning in manual order processing. Boostmysites automated the whole thing in three weeks. We've reclaimed two full days a week and haven't looked back.",
    name: "Priya Nair",
    role: "Founder, Craftline Goods",
    metric: "2 days/week reclaimed",
  },
  {
    quote:
      "Our leads used to sit for hours. Now they get a response in under a minute, and our close rate jumped 28%. It paid for itself in the first month.",
    name: "Marcus Bennett",
    role: "Sales Director, Vantage Realty",
    metric: "+28% close rate",
  },
  {
    quote:
      "Honestly the best money we've spent this year. It's like quietly adding staff who never sleep and never make mistakes.",
    name: "Elena Sokolova",
    role: "Operations Lead, Northwind Logistics",
    metric: "Zero-error operations",
  },
];
