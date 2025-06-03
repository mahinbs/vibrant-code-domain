
import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/blogs';
import { Calendar, Clock, User } from 'lucide-react';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  return (
    <Link 
      to={`/blog/${post.id}`}
      className={`group block ${featured ? 'md:col-span-2' : ''}`}
    >
      <article className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
        <div className={`relative ${featured ? 'h-64' : 'h-48'} overflow-hidden`}>
          <OptimizedImage
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="bg-cyan-500 text-black px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>
          {post.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Featured
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
          
          <h3 className={`font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
            {post.title}
          </h3>
          
          <p className="text-gray-300 mb-4 line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-white text-sm font-medium">{post.author.name}</p>
                <p className="text-gray-400 text-xs">{post.author.bio}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
