
import { supabase } from '@/integrations/supabase/client';
import { BlogPost } from '@/data/blogs';
import { DatabaseBlogPost } from './types';
import { transformDbBlogToBlogPost } from './transformers';

export const blogService = {
  getBlogs: async (): Promise<BlogPost[]> => {
    console.log('BlogService - Getting blogs from database...');
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
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
    
    try {
      if (blog.id) {
        // Update existing blog
        const { data, error } = await supabase
          .from('blogs')
          .update({
            title: blog.title,
            content: blog.content,
            excerpt: blog.excerpt,
            author: blog.author,
            published_date: blog.publishedDate,
            reading_time: blog.readingTime,
            tags: blog.tags,
            image: blog.featuredImage
          })
          .eq('id', blog.id)
          .select()
          .single();

        if (error) throw error;
        console.log('BlogService - Blog updated:', data);
        return transformDbBlogToBlogPost(data);
      } else {
        // Create new blog
        const { data, error } = await supabase
          .from('blogs')
          .insert({
            title: blog.title,
            content: blog.content,
            excerpt: blog.excerpt,
            author: blog.author,
            published_date: blog.publishedDate,
            reading_time: blog.readingTime,
            tags: blog.tags,
            image: blog.featuredImage
          })
          .select()
          .single();

        if (error) throw error;
        console.log('BlogService - Blog created:', data);
        return transformDbBlogToBlogPost(data);
      }
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
