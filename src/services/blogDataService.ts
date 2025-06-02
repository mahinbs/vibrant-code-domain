
import { blogsData, BlogPost } from '@/data/blogs';
import { adminDataService } from './adminDataService';

export const getCombinedBlogs = (): BlogPost[] => {
  console.log('BlogDataService - Getting combined blogs...');
  
  // Get admin blogs from localStorage
  const adminBlogs = adminDataService.getBlogs();
  console.log('BlogDataService - Admin blogs retrieved:', adminBlogs);
  console.log('BlogDataService - Number of admin blogs:', adminBlogs.length);
  
  console.log('BlogDataService - Static blogs data:', blogsData);
  console.log('BlogDataService - Number of static blogs:', blogsData.length);
  
  // Combine static blogs with admin blogs
  const combined = [...blogsData, ...adminBlogs];
  console.log('BlogDataService - Combined blogs:', combined);
  console.log('BlogDataService - Total combined blogs count:', combined.length);
  
  return combined;
};

export const findBlog = (blogId: string): BlogPost | null => {
  console.log('BlogDataService - Finding blog with ID:', blogId);
  const allBlogs = getCombinedBlogs();
  const found = allBlogs.find(blog => blog.id === blogId) || null;
  console.log('BlogDataService - Found blog:', found);
  return found;
};

// Listen for localStorage changes and provide refresh capability
export const onBlogsChange = (callback: () => void) => {
  const handleStorageChange = (e: StorageEvent) => {
    console.log('BlogDataService - Storage change detected:', e.key);
    if (e.key === 'admin_blogs') {
      console.log('BlogDataService - Admin blogs changed, triggering callback');
      callback();
    }
  };
  
  const handleFocus = () => {
    console.log('BlogDataService - Window focus detected, triggering callback');
    callback();
  };
  
  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('focus', handleFocus);
  
  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('focus', handleFocus);
  };
};
