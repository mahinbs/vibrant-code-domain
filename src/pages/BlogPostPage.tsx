
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

const BlogPostPage = () => {
  const { blogId } = useParams<{ blogId: string }>();
  const [blogs, setBlogs] = useState(getCombinedBlogs());
  
  // Refresh data when component mounts or when localStorage changes
  useEffect(() => {
    const refreshData = () => {
      setBlogs(getCombinedBlogs());
    };

    const cleanup = onBlogsChange(refreshData);
    return cleanup;
  }, []);

  const post = useMemo(() => {
    console.log('BlogPostPage - Looking for blog with ID:', blogId);
    const foundPost = findBlog(blogId || '');
    console.log('BlogPostPage - Found post:', foundPost);
    if (foundPost) {
      console.log('BlogPostPage - Post content:', foundPost.content);
      console.log('BlogPostPage - Post content type:', typeof foundPost.content);
      console.log('BlogPostPage - Post content length:', foundPost.content?.length || 0);
    }
    return foundPost;
  }, [blogId, blogs]);

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
