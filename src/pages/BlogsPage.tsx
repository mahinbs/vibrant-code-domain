
import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogCategories from '@/components/blog/BlogCategories';
import BlogSearch from '@/components/blog/BlogSearch';
import { blogsData } from '@/data/blogs';

const BlogsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    let filtered = blogsData;

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
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <BlogHero />
      
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
            <BlogCategories
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <BlogSearch onSearch={setSearchQuery} />
          </div>
          
          <BlogGrid posts={filteredPosts} showFeatured={selectedCategory === 'All' && !searchQuery} />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default BlogsPage;
