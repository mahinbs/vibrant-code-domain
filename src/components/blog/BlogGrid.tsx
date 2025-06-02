
import { BlogPost } from '@/data/blogs';
import BlogCard from './BlogCard';

interface BlogGridProps {
  posts: BlogPost[];
  showFeatured?: boolean;
}

const BlogGrid = ({ posts, showFeatured = true }: BlogGridProps) => {
  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <div className="space-y-12">
      {showFeatured && featuredPosts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} featured />
            ))}
          </div>
        </div>
      )}
      
      {regularPosts.length > 0 && (
        <div>
          {showFeatured && <h2 className="text-2xl font-bold text-white mb-8">Latest Posts</h2>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      )}
      
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No blog posts found.</p>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;
