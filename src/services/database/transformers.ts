
import { Project } from '@/data/projects';
import { BlogPost } from '@/data/blogs';
import { generateProjectSlug, generateBlogSlug } from '@/lib/slugUtils';

// Transform database row to Project type
export const transformDbProjectToProject = (dbProject: any): Project => {
  const baseProject = {
    id: dbProject.id,
    title: dbProject.title,
    client: dbProject.client,
    serviceId: dbProject.service_id,
    description: dbProject.description,
    challenge: dbProject.challenge,
    solution: dbProject.solution,
    image: dbProject.image,
    liveUrl: dbProject.link,
    technologies: dbProject.technologies || [],
    detailedMetrics: dbProject.detailed_metrics || [],
    gallery: dbProject.gallery || [],
    extendedTestimonial: dbProject.extended_testimonial || { quote: '', author: '', position: '', company: '' },
    // Add default values for required Project fields that don't exist in DB
    metrics: {},
    timeline: '',
    team: '',
    industry: '',
    clientLogo: '',
    testimonial: dbProject.extended_testimonial?.quote || '',
    approach: [],
    techStack: [],
    features: []
  };

  // Generate slug if not present in database
  const slug = dbProject.slug || generateProjectSlug({
    title: baseProject.title,
    client: baseProject.client,
    industry: baseProject.industry,
    technologies: baseProject.technologies
  });

  return {
    ...baseProject,
    slug
  };
};

// Transform database row to BlogPost type
export const transformDbBlogToBlogPost = (dbBlog: any): BlogPost => {
  const baseBlog = {
    id: dbBlog.id,
    title: dbBlog.title,
    content: dbBlog.content,
    excerpt: dbBlog.excerpt,
    author: dbBlog.author || { name: '', avatar: '', bio: '' },
    publishedDate: dbBlog.published_date,
    readingTime: dbBlog.reading_time || 5,
    featuredImage: dbBlog.image,
    category: 'General',
    tags: dbBlog.tags || []
  };

  // Generate slug if not present in database
  const slug = dbBlog.slug || generateBlogSlug({
    title: baseBlog.title,
    category: baseBlog.category,
    publishedDate: baseBlog.publishedDate,
    tags: baseBlog.tags
  });

  return {
    ...baseBlog,
    slug
  };
};
