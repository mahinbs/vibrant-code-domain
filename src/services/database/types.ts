
export interface DatabaseProject {
  id?: string;
  title: string;
  client: string;
  serviceId: string;
  description: string;
  challenge: string;
  solution: string;
  image: string;
  liveUrl: string;
  technologies: string[];
  detailedMetrics: Array<{ label: string; value: string; description: string; }>;
  gallery: string[];
  extendedTestimonial: { quote: string; author: string; position: string; company: string; };
  timeline?: string;
  team?: string;
  industry?: string; // Added industry field
}

export interface DatabaseBlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  author: { name: string; avatar: string; bio: string; };
  publishedDate: string;
  readingTime: number;
  tags: string[];
  featuredImage: string;
  category: string;
}
