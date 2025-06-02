
import { useParams, Navigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostContent from '@/components/blog/BlogPostContent';
import BlogPostSidebar from '@/components/blog/BlogPostSidebar';
import RelatedPosts from '@/components/blog/RelatedPosts';
import { getCombinedBlogs, onBlogsChange, findBlog } from '@/services/blogDataService';
import { formatPlainTextContent } from '@/lib/contentUtils';
import { BlogPost } from '@/data/blogs';

const BlogPostPage = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const blogsData = await getCombinedBlogs();
        setBlogs(blogsData);
        
        if (blogId) {
          const foundPost = await findBlog(blogId);
          setPost(foundPost);
        }
      } catch (error) {
        console.error('Error loading blog data:', error);
        setBlogs([]);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    const cleanup = onBlogsChange(() => {
      loadData();
    });
    return cleanup;
  }, [blogId]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogs
      .filter(p => p.id !== post.id && p.category === post.category)
      .slice(0, 3);
  }, [post, blogs]);

  const formattedContent = useMemo(() => {
    if (!post?.content) {
      console.log('formattedContent - No post content available');
      return '';
    }
    console.log('formattedContent - Processing content:', post.content);
    const formatted = formatPlainTextContent(post.content);
    console.log('formattedContent - Final formatted content:', formatted);
    return formatted;
  }, [post?.content]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading blog post...</div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <article className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <BlogPostHeader post={post} />
          <BlogPostContent post={post} formattedContent={formattedContent} />
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-3/4" />
              <BlogPostSidebar post={post} />
            </div>
          </div>
          <RelatedPosts relatedPosts={relatedPosts} />
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
