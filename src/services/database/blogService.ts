
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/data/blogs';
import { DatabaseBlogPost } from './types';
import { transformDbBlogToBlogPost } from './transformers';
import { generateBlogSlug } from '@/lib/slugUtils';

const buildSlug = (blog: DatabaseBlogPost): string => {
  if (blog.slug && blog.slug.trim().length > 0) return blog.slug.trim();
  return generateBlogSlug({
    title: blog.title,
    category: blog.category || 'general',
    publishedDate: blog.publishedDate,
    tags: blog.tags || [],
  });
};

export const blogService = {
  getBlogs: async (): Promise<BlogPost[]> => {
    console.log('BlogService - Getting blogs from database...');
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('published_date', { ascending: false });

      if (error) {
        console.error('BlogService - Error retrieving blogs:', error);
        throw error;
      }

      console.log('BlogService - Blogs retrieved:', data);
      return (data || []).map(transformDbBlogToBlogPost);
    } catch (error) {
      console.error('BlogService - Error getting blogs:', error);
      return [];
    }
  },

  saveBlog: async (blog: DatabaseBlogPost): Promise<BlogPost> => {
    console.log('BlogService - Saving blog:', blog);

    const slug = buildSlug(blog);
    const basePayload = {
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      author: blog.author,
      published_date: blog.publishedDate,
      reading_time: blog.readingTime,
      tags: blog.tags,
      image: blog.featuredImage,
      category: blog.category || null,
      slug,
      meta_description: blog.metaDescription || null,
      is_published: blog.isPublished ?? true,
    };

    try {
      if (blog.id) {
        const { data, error } = await supabase
          .from('blogs')
          .update(basePayload)
          .eq('id', blog.id)
          .select()
          .single();

        if (error) throw error;
        console.log('BlogService - Blog updated:', data);
        return transformDbBlogToBlogPost(data);
      }

      const { data, error } = await supabase
        .from('blogs')
        .insert(basePayload)
        .select()
        .single();

      if (error) throw error;
      console.log('BlogService - Blog created:', data);
      return transformDbBlogToBlogPost(data);
    } catch (error) {
      console.error('BlogService - Error saving blog:', error);
      throw error;
    }
  },

  deleteBlog: async (id: string): Promise<void> => {
    console.log('BlogService - Deleting blog with id:', id);

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      console.log('BlogService - Blog deleted successfully');
    } catch (error) {
      console.error('BlogService - Error deleting blog:', error);
      throw error;
    }
  }
};
