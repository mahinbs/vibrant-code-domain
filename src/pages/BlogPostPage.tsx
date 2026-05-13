
import { useParams, Navigate } from 'react-router-dom';
import { useMemo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostContent from '@/components/blog/BlogPostContent';
import BlogPostSidebar from '@/components/blog/BlogPostSidebar';
import RelatedPosts from '@/components/blog/RelatedPosts';
import JsonLd from '@/components/seo/JsonLd';
import { BRAND } from '@/lib/seo/brand';
import { getCombinedBlogs, onBlogsChange, findBlog } from '@/services/blogDataService';
import { formatPlainTextContent } from '@/lib/contentUtils';
import { extractIdFromSlug } from '@/lib/slugUtils';
import { BlogPost } from '@/data/blogs';

// Feature flag (env-driven) lets us disable the new Helmet/JSON-LD block in a
// hurry if anything regresses. Defaults to ON.
const BLOG_SEO_V2_ENABLED =
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env
    ?.VITE_BLOG_SEO_V2 !== 'false';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const blogsData = await getCombinedBlogs();
        setBlogs(blogsData);

        if (slug) {
          const blogId = extractIdFromSlug(slug);

          let foundPost = blogsData.find(blog => blog.slug === slug);

          if (!foundPost) {
            foundPost = await findBlog(blogId);
          }

          if (foundPost) {
            const normalizedPost = {
              ...foundPost,
              publishedDate: foundPost.publishedDate || foundPost.published_date,
              readingTime: foundPost.readingTime || foundPost.reading_time
            };

            setPost(normalizedPost);

            if (normalizedPost.slug && slug !== normalizedPost.slug && !slug.includes('-')) {
              window.history.replaceState(null, '', `/blog/${normalizedPost.slug}`);
            }
          }
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
  }, [slug]);

  // Legacy fallback — preserved so anything that read document.title before
  // continues to work even when the Helmet block is disabled.
  useEffect(() => {
    if (post && !BLOG_SEO_V2_ENABLED) {
      document.title = `${post.title} | Boostmysites Blog`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content',
          `${post.excerpt} Published in ${post.category} category. Tags: ${post.tags.join(', ')}.`
        );
      }
    }
  }, [post]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogs
      .filter(p => p.id !== post.id && p.category === post.category)
      .slice(0, 3);
  }, [post, blogs]);

  const formattedContent = useMemo(() => {
    if (!post?.content) return '';
    return formatPlainTextContent(post.content);
  }, [post?.content]);

  const blogPostingJsonLd = useMemo(() => {
    if (!post) return null;
    const canonical = `${BRAND.siteUrl}/blog/${post.slug}`;
    const publishedIso = post.publishedDate || post.published_date || undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      headline: post.title,
      description: post.metaDescription || post.excerpt,
      image: post.featuredImage ? [post.featuredImage] : undefined,
      datePublished: publishedIso,
      dateModified: publishedIso,
      author: {
        '@type': 'Person',
        name: post.author?.name || BRAND.name,
        description: post.author?.bio || undefined,
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${BRAND.siteUrl}/#organization`,
        name: BRAND.name,
        logo: {
          '@type': 'ImageObject',
          url: BRAND.logoUrl,
        },
      },
      keywords: (post.tags || []).join(', '),
      articleSection: post.category,
      url: canonical,
      inLanguage: 'en',
    };
  }, [post]);

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

  const canonical = `${BRAND.siteUrl}/blog/${post.slug}`;
  const description = post.metaDescription && post.metaDescription.trim().length > 0
    ? post.metaDescription
    : post.excerpt;
  const ogImage = post.featuredImage || BRAND.defaultOgImage;

  return (
    <div className="min-h-screen bg-black">
      {BLOG_SEO_V2_ENABLED && (
        <>
          <Helmet>
            <title>{`${post.title} | ${BRAND.name}`}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content={BRAND.name} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            {post.author?.name && <meta name="author" content={post.author.name} />}
            {(post.tags || []).map((tag) => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
          </Helmet>
          {blogPostingJsonLd && (
            <JsonLd data={blogPostingJsonLd} id={`blogposting-${post.slug}`} />
          )}
        </>
      )}

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
