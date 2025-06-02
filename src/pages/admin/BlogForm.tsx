import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminDataService, AdminBlogPost } from '@/services/adminDataService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<AdminBlogPost>({
    title: '',
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
      const blogs = adminDataService.getBlogs();
      const blog = blogs.find(b => b.id === id);
      if (blog) {
        setFormData({
          ...blog,
          publishedDate: blog.publishedDate.split('T')[0] // Convert to date input format
        });
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.author.name) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const blogData = {
        ...formData,
        publishedDate: new Date(formData.publishedDate).toISOString()
      };
      
      adminDataService.saveBlog(blogData);
      toast({
        title: isEdit ? "Blog post updated" : "Blog post created",
        description: `The blog post has been successfully ${isEdit ? 'updated' : 'created'}.`,
      });
      navigate('/admin/blogs');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/blogs')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blogs
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h1>
          <p className="text-gray-600">
            {isEdit ? 'Update blog post details' : 'Create a new blog post'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Blog post title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Brief description of the blog post"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author-name">Author Name *</Label>
                <Input
                  id="author-name"
                  value={formData.author.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    author: { ...prev.author, name: e.target.value }
                  }))}
                  placeholder="Author name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publishedDate">Date</Label>
                <Input
                  id="publishedDate"
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, publishedDate: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="readingTime">Reading Time (minutes)</Label>
                <Input
                  id="readingTime"
                  type="number"
                  value={formData.readingTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, readingTime: parseInt(e.target.value) || 5 }))}
                  placeholder="5"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Technology, Design"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author-avatar">Author Avatar URL</Label>
                <Input
                  id="author-avatar"
                  value={formData.author.avatar}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    author: { ...prev.author, avatar: e.target.value }
                  }))}
                  placeholder="https://example.com/avatar.jpg"
                  type="url"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image URL</Label>
              <Input
                id="featuredImage"
                value={formData.featuredImage}
                onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author-bio">Author Bio</Label>
              <Textarea
                id="author-bio"
                value={formData.author.bio}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  author: { ...prev.author, bio: e.target.value }
                }))}
                placeholder="Brief bio about the author"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-blue-600 hover:text-blue-800">×</button>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="content">Blog Content *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Write your blog content here..."
                rows={15}
                required
              />
              <div className="text-sm text-gray-500 space-y-1">
                <p>You can use either plain text or HTML formatting for rich content.</p>
                <p><strong>Plain text tips:</strong> Use double line breaks to create paragraphs.</p>
                <p><strong>HTML examples:</strong> &lt;h2&gt;Heading&lt;/h2&gt;, &lt;p&gt;Paragraph&lt;/p&gt;, &lt;strong&gt;Bold&lt;/strong&gt;, &lt;em&gt;Italic&lt;/em&gt;</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit">
            {isEdit ? 'Update Blog Post' : 'Create Blog Post'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/blogs')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
