
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminDataService, AdminBlogPost } from '@/services/adminDataService';
import { generateBlogSlug } from '@/lib/slugUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2 } from 'lucide-react';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<AdminBlogPost>({
    title: '',
    slug: '',
    content: '',
    author: {
      name: '',
      avatar: '',
      bio: ''
    },
    excerpt: '',
    publishedDate: new Date().toISOString().split('T')[0],
    category: '',
    featuredImage: '',
    tags: [],
    readingTime: 5
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      const loadBlog = async () => {
        try {
          setLoading(true);
          const blogs = await adminDataService.getBlogs();
          const blog = blogs.find(b => b.id === id);
          if (blog) {
            setFormData({
              ...blog,
              publishedDate: blog.publishedDate.split('T')[0] // Convert to date input format
            });
          } else {
            toast({
              title: "Blog post not found",
              description: "The blog post you're trying to edit doesn't exist.",
              variant: "destructive",
            });
            navigate('/admin/blogs');
          }
        } catch (error) {
          console.error('Error loading blog:', error);
          toast({
            title: "Error",
            description: "Failed to load blog post. Please try again.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };
      loadBlog();
    }
  }, [id, isEdit, navigate, toast]);

  // Auto-generate slug when title, category, or tags change
  useEffect(() => {
    if (formData.title && formData.category && !isEdit) {
      const generatedSlug = generateBlogSlug({
        title: formData.title,
        category: formData.category,
        publishedDate: formData.publishedDate,
        tags: formData.tags
      });
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title, formData.category, formData.tags, formData.publishedDate, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('BlogForm - Submitting form data:', formData);
    
    if (!formData.title || !formData.content || !formData.author.name) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Content cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      const blogData = {
        ...formData,
        publishedDate: new Date(formData.publishedDate).toISOString(),
        // Always generate slug from current form data
        slug: generateBlogSlug({
          title: formData.title,
          category: formData.category,
          publishedDate: formData.publishedDate,
          tags: formData.tags
        })
      };
      
      console.log('BlogForm - Final blog data being saved:', blogData);
      await adminDataService.saveBlog(blogData);
      toast({
        title: isEdit ? "Blog post updated" : "Blog post created",
        description: `The blog post has been successfully ${isEdit ? 'updated' : 'created'}.`,
      });
      navigate('/admin/blogs');
    } catch (error) {
      console.error('BlogForm - Error saving blog:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        <span className="ml-2 text-white">Loading blog post...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-3">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/blogs')} className="border-gray-600 text-gray-900 hover:bg-gray-700 hover:text-white">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blogs
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-black">
            {isEdit ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h1>
          <p className="text-gray-400">
            {isEdit ? 'Update blog post details' : 'Create a new blog post'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-200">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Blog post title"
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-gray-200">URL Slug (Auto-generated)</Label>
              <Input
                id="slug"
                value={formData.slug || generateBlogSlug({
                  title: formData.title,
                  category: formData.category,
                  publishedDate: formData.publishedDate,
                  tags: formData.tags
                })}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="url-friendly-slug (auto-generated from title)"
                disabled={true} // Always disabled since it's auto-generated
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500 disabled:bg-gray-800 disabled:text-gray-500"
              />
              <p className="text-sm text-gray-400">
                Slug is automatically generated from title, category and tags
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-gray-200">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of the blog post"
                rows={2}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author-name" className="text-gray-200">Author Name *</Label>
                <Input
                  id="author-name"
                  value={formData.author.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    author: { ...prev.author, name: e.target.value }
                  }))}
                  placeholder="Author name"
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publishedDate" className="text-gray-200">Date</Label>
                <Input
                  id="publishedDate"
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, publishedDate: e.target.value }))}
                  required
                  className="bg-gray-700 border-gray-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="readingTime" className="text-gray-200">Reading Time (minutes)</Label>
                <Input
                  id="readingTime"
                  type="number"
                  value={formData.readingTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, readingTime: parseInt(e.target.value) || 5 }))}
                  placeholder="5"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-200">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Technology, Design"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author-avatar" className="text-gray-200">Author Avatar URL</Label>
                <Input
                  id="author-avatar"
                  value={formData.author.avatar}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    author: { ...prev.author, avatar: e.target.value }
                  }))}
                  placeholder="https://example.com/avatar.jpg"
                  type="url"
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage" className="text-gray-200">Featured Image URL</Label>
              <Input
                id="featuredImage"
                value={formData.featuredImage}
                onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                type="url"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author-bio" className="text-gray-200">Author Bio</Label>
              <Textarea
                id="author-bio"
                value={formData.author.bio}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  author: { ...prev.author, bio: e.target.value }
                }))}
                placeholder="Brief bio about the author"
                rows={2}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
              />
              <Button type="button" onClick={addTag} className="bg-cyan-600 hover:bg-cyan-700 text-white">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span key={tag} className="bg-cyan-700 text-cyan-200 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-cyan-600">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-cyan-300 hover:text-cyan-100">×</button>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="content" className="text-gray-200">Blog Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => {
                  console.log('BlogForm - Content changed:', e.target.value);
                  setFormData(prev => ({ ...prev, content: e.target.value }));
                }}
                placeholder="Write your blog content here..."
                rows={15}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
              />
              <div className="text-sm text-gray-400 space-y-1">
                <p>You can use either plain text or HTML formatting for rich content.</p>
                <p><strong>Plain text tips:</strong> Use double line breaks to create paragraphs.</p>
                <p><strong>HTML examples:</strong> &lt;h2&gt;Heading&lt;/h2&gt;, &lt;p&gt;Paragraph&lt;/p&gt;, &lt;strong&gt;Bold&lt;/strong&gt;, &lt;em&gt;Italic&lt;/em&gt;</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button 
            type="submit" 
            disabled={saving}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {isEdit ? 'Update Blog Post' : 'Create Blog Post'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/blogs')}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
