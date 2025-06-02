
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { BlogPost } from '@/data/blogs';

interface BlogPostHeaderProps {
  post: BlogPost;
}

const BlogPostHeader = ({ post }: BlogPostHeaderProps) => {
  return (
    <>
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
    </>
  );
};

export default BlogPostHeader;
