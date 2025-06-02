
import { blogsData, BlogPost } from '@/data/blogs';
import { adminDataService } from './adminDataService';

export const getCombinedBlogs = (): BlogPost[] => {
  // Get admin blogs from localStorage
  const adminBlogs = adminDataService.getBlogs();
  
  // Combine static blogs with admin blogs
  return [...blogsData, ...adminBlogs];
};

export const findBlog = (blogId: string): BlogPost | null => {
  const allBlogs = getCombinedBlogs();
  return allBlogs.find(blog => blog.id === blogId) || null;
};

// Listen for localStorage changes and provide refresh capability
export const onBlogsChange = (callback: () => void) => {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'admin_blogs') {
      callback();
    }
  };
  
  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('focus', callback);
  
  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('focus', callback);
  };
};
