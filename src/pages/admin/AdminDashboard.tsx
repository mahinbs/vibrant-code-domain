
import { useState, useEffect } from 'react';
import { adminDataService } from '@/services/adminDataService';
import { customerInquiryService } from '@/services/customerInquiryService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Briefcase, MessageSquare, Database, TrendingUp, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import DataRecoveryPanel from '@/components/admin/DataRecoveryPanel';
import DataMigrationPanel from '@/components/admin/DataMigrationPanel';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [projectsData, blogsData, inquiriesData] = await Promise.all([
        adminDataService.getProjects(),
        adminDataService.getBlogs(),
        customerInquiryService.getInquiries()
      ]);
      setProjects(projectsData);
      setBlogs(blogsData);
      setInquiries(inquiriesData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setProjects([]);
      setBlogs([]);
      setInquiries([]);
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

  // Calculate stats
  const totalProjects = projects.length;
  const totalBlogs = blogs.length;
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'new').length;
  const recentProjects = projects.slice(0, 3);
  const recentBlogs = blogs.slice(0, 3);
  const recentInquiries = inquiries.slice(0, 3);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
          <div className="text-xl text-cyan-400 animate-pulse">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 p-2">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 text-lg">Manage your portfolio, content, and customer inquiries</p>
          </div>
          <div className="flex space-x-3">
            <Button 
              onClick={loadData}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Total Portfolios</CardTitle>
              <div className="p-2 bg-cyan-500/10 rounded-full">
                <Briefcase className="h-5 w-5 text-cyan-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">{totalProjects}</div>
              <p className="text-xs text-gray-500">
                Active portfolio projects
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Blog Posts</CardTitle>
              <div className="p-2 bg-purple-500/10 rounded-full">
                <FileText className="h-5 w-5 text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">{totalBlogs}</div>
              <p className="text-xs text-gray-500">
                Published articles
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Customer Inquiries</CardTitle>
              <div className="p-2 bg-green-500/10 rounded-full">
                <MessageSquare className="h-5 w-5 text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">{totalInquiries}</div>
              <p className="text-xs text-gray-500">
                Total inquiries received
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">New Inquiries</CardTitle>
              <div className="p-2 bg-yellow-500/10 rounded-full">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">{newInquiries}</div>
              <p className="text-xs text-gray-500">
                Pending review
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center">
                <Plus className="h-5 w-5 mr-2 text-cyan-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg transition-all duration-300">
                <Link to="/admin/portfolio/new">
                  <Plus className="h-4 w-4 mr-3" />
                  Add New Portfolio
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300">
                <Link to="/admin/blogs/new">
                  <FileText className="h-4 w-4 mr-3" />
                  Write New Blog Post
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300">
                <Link to="/admin/customer-inquiries">
                  <MessageSquare className="h-4 w-4 mr-3" />
                  Manage Customer Inquiries
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300">
                <Link to="/admin/case-studies">
                  <Users className="h-4 w-4 mr-3" />
                  Manage Case Studies
                </Link>
              </Button>
            </CardContent>
          </Card>

          <DataMigrationPanel />
        </div>

        {/* Enhanced Recent Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-cyan-400" />
                Recent Portfolios
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentProjects.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500">No portfolios yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="flex justify-between items-center p-3 hover:bg-gray-700/50 rounded-lg transition-all duration-200">
                      <div className="flex-1">
                        <p className="font-medium text-white truncate">{project.title}</p>
                        <p className="text-sm text-gray-400 truncate">{project.client}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild className="border-gray-600 text-gray-300 hover:bg-cyan-600 hover:border-cyan-600 hover:text-white">
                        <Link to={`/admin/portfolio/edit/${project.id}`}>
                          Edit
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-400" />
                Recent Blog Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentBlogs.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500">No blog posts yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentBlogs.map((blog) => (
                    <div key={blog.id} className="flex justify-between items-center p-3 hover:bg-gray-700/50 rounded-lg transition-all duration-200">
                      <div className="flex-1">
                        <p className="font-medium text-white truncate">{blog.title}</p>
                        <p className="text-sm text-gray-400 truncate">{blog.author.name}</p>
                      </div>
                      <Button variant="outline" size="sm" asChild className="border-gray-600 text-gray-300 hover:bg-purple-600 hover:border-purple-600 hover:text-white">
                        <Link to={`/admin/blogs/edit/${blog.id}`}>
                          Edit
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-green-400" />
                Recent Inquiries
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentInquiries.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500">No inquiries yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="p-3 hover:bg-gray-700/50 rounded-lg transition-all duration-200">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <p className="font-medium text-white truncate">{inquiry.first_name} {inquiry.last_name}</p>
                          <p className="text-sm text-gray-400 truncate">{inquiry.email}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          inquiry.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                          inquiry.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400' :
                          inquiry.status === 'converted' ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {inquiry.status?.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{inquiry.service_interest}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  <Button asChild variant="outline" className="w-full mt-3 border-gray-600 text-gray-300 hover:bg-green-600 hover:border-green-600 hover:text-white">
                    <Link to="/admin/customer-inquiries">
                      View All Inquiries
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Data Recovery Panel */}
        <DataRecoveryPanel onDataRestored={handleDataRestored} />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
