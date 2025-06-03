
import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/blogs';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface RelatedPostsProps {
  relatedPosts: BlogPost[];
}

const RelatedPosts = ({ relatedPosts }: RelatedPostsProps) => {
  if (relatedPosts.length === 0) {
    return null;
  }

  return (
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
  );
};

export default RelatedPosts;
