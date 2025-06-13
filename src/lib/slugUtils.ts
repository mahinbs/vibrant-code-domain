
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

export const generateProjectSlug = (project: {
  title: string;
  client: string;
  industry: string;
  technologies: string[];
}): string => {
  const titleSlug = generateSlug(project.title);
  const industrySlug = generateSlug(project.industry);
  const mainTech = project.technologies.slice(0, 2).map(tech => generateSlug(tech)).join('-');
  
  return `${titleSlug}-${industrySlug}-${mainTech}`;
};

export const generateBlogSlug = (blog: {
  title: string;
  category: string;
  publishedDate: string;
  tags: string[];
}): string => {
  const titleSlug = generateSlug(blog.title);
  const categorySlug = generateSlug(blog.category);
  const year = new Date(blog.publishedDate).getFullYear();
  const mainTag = blog.tags[0] ? generateSlug(blog.tags[0]) : '';
  
  return `${titleSlug}-${categorySlug}-${mainTag}-${year}`;
};

export const extractIdFromSlug = (slug: string): string => {
  // For backwards compatibility, if it's just an ID, return it
  if (!slug.includes('-')) {
    return slug;
  }
  
  // Try to find project by matching the slug directly first
  // This is more reliable than extracting parts
  return slug;
};
