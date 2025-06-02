
import { useState, useEffect } from 'react';
import { adminDataService } from '@/services/adminDataService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Briefcase, MessageSquare, Database, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import DataRecoveryPanel from '@/components/admin/DataRecoveryPanel';
import DataMigrationPanel from '@/components/admin/DataMigrationPanel';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projectsData, blogsData] = await Promise.all([
        adminDataService.getProjects(),
        adminDataService.getBlogs()
      ]);
      setProjects(projectsData);
      setBlogs(blogsData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setProjects([]);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDataRestored = () => {
    loadData();
  };

  // Calculate basic stats
  const totalProjects = projects.length;
  const totalBlogs = blogs.length;
  const recentProjects = projects.slice(0, 5);
  const recentBlogs = blogs.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your portfolio and blog content</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolios</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              Active portfolio projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBlogs}</div>
            <p className="text-xs text-muted-foreground">
              Published articles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProjects + totalBlogs}</div>
            <p className="text-xs text-muted-foreground">
              Combined content pieces
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full justify-start">
              <Link to="/secure-management-portal-x7k9/portfolios/new">
                <Plus className="h-4 w-4 mr-2" />
                Add New Portfolio
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/secure-management-portal-x7k9/blogs/new">
                <FileText className="h-4 w-4 mr-2" />
                Write New Blog Post
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/secure-management-portal-x7k9/case-studies">
                <MessageSquare className="h-4 w-4 mr-2" />
                Manage Case Studies
              </Link>
            </Button>
          </CardContent>
        </Card>

        <DataMigrationPanel />
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Portfolios</CardTitle>
          </CardHeader>
          <CardContent>
            {recentProjects.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No portfolios yet</p>
            ) : (
              <div className="space-y-2">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{project.title}</p>
                      <p className="text-sm text-gray-500">{project.client}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/secure-management-portal-x7k9/portfolios/edit/${project.id}`}>
                        Edit
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {recentBlogs.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No blog posts yet</p>
            ) : (
              <div className="space-y-2">
                {recentBlogs.map((blog) => (
                  <div key={blog.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{blog.title}</p>
                      <p className="text-sm text-gray-500">{blog.author.name}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/secure-management-portal-x7k9/blogs/edit/${blog.id}`}>
                        Edit
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Data Recovery Panel */}
      <DataRecoveryPanel onDataRestored={handleDataRestored} />
    </div>
  );
};

export default AdminDashboard;
