
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminDataService } from '@/services/adminDataService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, ExternalLink, Bug, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import DataRecoveryPanel from '@/components/admin/DataRecoveryPanel';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const BlogList = () => {
  const [blogs, setBlogs] = useState(adminDataService.getBlogs());
  const [showRecovery, setShowRecovery] = useState(false);
  const { toast } = useToast();

  // Refresh data on mount and storage changes
  useEffect(() => {
    const refreshData = () => {
      console.log('BlogList - Refreshing data...');
      setBlogs(adminDataService.getBlogs());
    };

    // Listen for storage changes
    window.addEventListener('storage', refreshData);
    window.addEventListener('focus', refreshData);

    return () => {
      window.removeEventListener('storage', refreshData);
      window.removeEventListener('focus', refreshData);
    };
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        adminDataService.deleteBlog(id);
        setBlogs(adminDataService.getBlogs());
        toast({
          title: "Blog post deleted",
          description: "The blog post has been successfully deleted.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete blog post. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDebugLocalStorage = () => {
    adminDataService.debugLocalStorage();
    // Refresh the data
    setBlogs(adminDataService.getBlogs());
  };

  const handleDataRestored = () => {
    setBlogs(adminDataService.getBlogs());
    setShowRecovery(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600">Manage your blog posts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowRecovery(!showRecovery)}>
            <Shield className="h-4 w-4 mr-2" />
            {showRecovery ? 'Hide' : 'Show'} Recovery
          </Button>
          <Button variant="outline" onClick={handleDebugLocalStorage}>
            <Bug className="h-4 w-4 mr-2" />
            Debug Data
          </Button>
          <Button asChild>
            <Link to="/secure-management-portal-x7k9/blogs/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Blog Post
            </Link>
          </Button>
        </div>
      </div>

      {showRecovery && (
        <DataRecoveryPanel onDataRestored={handleDataRestored} />
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Blog Posts ({blogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {blogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No blog posts found</p>
              <p className="text-sm text-gray-400 mb-4">
                Your data might be lost. Try using the Recovery panel above or create a new blog post.
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={() => setShowRecovery(true)}>
                  <Shield className="h-4 w-4 mr-2" />
                  Try Recovery
                </Button>
                <Button asChild>
                  <Link to="/secure-management-portal-x7k9/blogs/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create new blog post
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reading Time</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium">{blog.title}</TableCell>
                    <TableCell>{blog.author.name}</TableCell>
                    <TableCell>{formatDate(blog.publishedDate)}</TableCell>
                    <TableCell>{blog.readingTime} min read</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {blog.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 2 && (
                          <span className="text-gray-500 text-xs">+{blog.tags.length - 2} more</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/blog/${blog.id}`} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/secure-management-portal-x7k9/blogs/edit/${blog.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(blog.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogList;
