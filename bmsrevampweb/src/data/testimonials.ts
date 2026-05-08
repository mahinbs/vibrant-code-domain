export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  metric: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Boostmysites transformed our business with their development services. Attention to detail and team velocity exceeded our expectations.",
    name: "Sarah Johnson",
    role: "Founder, TechStart Solutions",
    metric: "300% ROI in 6 months",
  },
  {
    quote:
      "Outstanding work. The team delivered exactly what we needed, communicated through every sprint and shipped on time.",
    name: "Michael Chen",
    role: "Head of Product, Digital Commerce Pro",
    metric: "50% efficiency gain",
  },
  {
    quote:
      "Professional, reliable and incredibly talented. They understood our vision and shipped it better than we imagined.",
    name: "Lisa Rodriguez",
    role: "CEO, Growth Marketing Agency",
    metric: "40% cost reduction",
  },
];
