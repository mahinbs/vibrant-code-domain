
import { useParams, Navigate, Link } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCombinedBlogs, onBlogsChange, findBlog } from '@/services/blogDataService';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';
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
          {/* Back Button */}
          <Link 
            to="/blogs"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blogs
          </Link>

          {/* Article Header */}
          <header className="max-w-4xl mx-auto mb-12">
            <div className="mb-6">
              <span className="bg-cyan-500 text-black px-4 py-2 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
              
              <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                <Share2 className="h-4 w-4" />
                Share Article
              </button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
              <OptimizedImage
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Article Content */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-3/4">
                {/* Debug information for development */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="mb-4 p-4 bg-gray-800 rounded text-white text-sm">
                    <strong>Debug Info:</strong><br />
                    Raw content length: {post.content?.length || 0}<br />
                    Formatted content length: {formattedContent?.length || 0}<br />
                    Content preview: {post.content?.substring(0, 100)}...
                  </div>
                )}
                
                {formattedContent ? (
                  <div 
                    className="prose prose-lg prose-invert blog-content max-w-none"
                    dangerouslySetInnerHTML={{ __html: formattedContent }}
                  />
                ) : (
                  <div className="text-gray-400 italic p-8 text-center border border-gray-700 rounded">
                    No content available for this blog post.
                  </div>
                )}
                
                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                  <h3 className="text-white font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Sidebar */}
              <div className="lg:w-1/4">
                <div className="sticky top-32">
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <User className="h-5 w-5 text-cyan-400" />
                      <h3 className="text-white font-semibold">About the Author</h3>
                    </div>
                    <div className="text-center">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-16 h-16 rounded-full mx-auto mb-4"
                      />
                      <h4 className="text-white font-medium mb-2">{post.author.name}</h4>
                      <p className="text-gray-400 text-sm">{post.author.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="max-w-6xl mx-auto mt-20">
              <h2 className="text-3xl font-bold text-white mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="group">
                    <article className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300">
                      <div className="relative h-48 overflow-hidden">
                        <OptimizedImage
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-300 text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
