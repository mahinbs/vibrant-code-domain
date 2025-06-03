
import { blogsData, BlogPost } from '@/data/blogs';
import { adminDataService } from './adminDataService';

export const getCombinedBlogs = async (): Promise<BlogPost[]> => {
  console.log('BlogDataService - Getting combined blogs...');
  
  try {
    // Get admin blogs from database
    const adminBlogs = await adminDataService.getBlogs();
    console.log('BlogDataService - Admin blogs retrieved:', adminBlogs);
    console.log('BlogDataService - Number of admin blogs:', adminBlogs.length);
    
    console.log('BlogDataService - Static blogs data:', blogsData);
    console.log('BlogDataService - Number of static blogs:', blogsData.length);
    
    // Combine static blogs with admin blogs
    const combined = [...blogsData, ...adminBlogs];
    console.log('BlogDataService - Combined blogs:', combined);
    console.log('BlogDataService - Total combined blogs count:', combined.length);
    
    return combined;
  } catch (error) {
    console.error('BlogDataService - Error getting combined blogs:', error);
    // Return static data as fallback
    return blogsData;
  }
};

export const findBlog = async (blogId: string): Promise<BlogPost | null> => {
  console.log('BlogDataService - Finding blog with ID:', blogId);
  try {
    const allBlogs = await getCombinedBlogs();
    const found = allBlogs.find(blog => blog.id === blogId) || null;
    console.log('BlogDataService - Found blog:', found);
    return found;
  } catch (error) {
    console.error('BlogDataService - Error finding blog:', error);
    return null;
  }
};

// For real-time updates, we'll use Supabase subscriptions instead of localStorage events
export const onBlogsChange = (callback: () => void) => {
  console.log('BlogDataService - Setting up real-time subscription for blogs');
  
  // For now, just return a cleanup function
  // Real-time subscriptions can be added later if needed
  return () => {
    console.log('BlogDataService - Cleanup function called');
  };
};
