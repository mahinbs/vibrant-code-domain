
import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogCategories from '@/components/blog/BlogCategories';
import BlogSearch from '@/components/blog/BlogSearch';
import TestimonialsSection from '@/components/TestimonialsSection';
import { getCombinedBlogs, onBlogsChange } from '@/services/blogDataService';
import { BlogPost } from '@/data/blogs';

const BlogsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data when component mounts
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const blogsData = await getCombinedBlogs();
        setBlogs(blogsData);
      } catch (error) {
        console.error('Error loading blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
    
    const cleanup = onBlogsChange(() => {
      loadBlogs();
    });
    return cleanup;
  }, []);

  const filteredPosts = useMemo(() => {
    let filtered = blogs;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <BlogHero />
      
      <section className="py-20">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-white">Loading blogs...</div>
            </div>
          ) : (
            <>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
                <BlogCategories
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
                <BlogSearch onSearch={setSearchQuery} />
              </div>
              
              <BlogGrid posts={filteredPosts} showFeatured={selectedCategory === 'All' && !searchQuery} />
            </>
          )}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      <Footer />
    </div>
  );
};

export default BlogsPage;
