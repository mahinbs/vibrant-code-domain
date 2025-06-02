
import { BlogPost } from '@/data/blogs';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface BlogPostContentProps {
  post: BlogPost;
  formattedContent: string;
}

const BlogPostContent = ({ post, formattedContent }: BlogPostContentProps) => {
  return (
    <>
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
        </div>
      </div>
    </>
  );
};

export default BlogPostContent;
