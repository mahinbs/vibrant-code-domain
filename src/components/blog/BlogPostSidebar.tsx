
import { User } from 'lucide-react';
import { BlogPost } from '@/data/blogs';

interface BlogPostSidebarProps {
  post: BlogPost;
}

const BlogPostSidebar = ({ post }: BlogPostSidebarProps) => {
  return (
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
  );
};

export default BlogPostSidebar;
