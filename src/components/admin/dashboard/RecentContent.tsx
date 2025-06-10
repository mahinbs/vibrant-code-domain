
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, FileText, MessageSquare, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  client: string;
}

interface Blog {
  id: string;
  title: string;
  author: {
    name: string;
  };
}

interface Inquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  service_interest: string;
  status?: string;
  created_at: string;
}

interface RecentContentProps {
  recentProjects: Project[];
  recentBlogs: Blog[];
  recentInquiries: Inquiry[];
}

const RecentContent = ({ recentProjects, recentBlogs, recentInquiries }: RecentContentProps) => {
  return (
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
                <div key={project.id} className="flex justify-between items-start gap-3 p-3 hover:bg-gray-700/50 rounded-lg transition-all duration-200">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{project.title}</p>
                    <p className="text-sm text-gray-400 truncate">{project.client}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild className="border-gray-600 text-gray-300 hover:bg-cyan-600 hover:border-cyan-600 hover:text-white flex-shrink-0">
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
                <div key={blog.id} className="flex justify-between items-start gap-3 p-3 hover:bg-gray-700/50 rounded-lg transition-all duration-200">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{blog.title}</p>
                    <p className="text-sm text-gray-400 truncate">{blog.author.name}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild className="border-gray-600 text-gray-300 hover:bg-purple-600 hover:border-purple-600 hover:text-white flex-shrink-0">
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
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{inquiry.first_name} {inquiry.last_name}</p>
                      <p className="text-sm text-gray-400 truncate">{inquiry.email}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${
                      inquiry.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                      inquiry.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400' :
                      inquiry.status === 'converted' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {inquiry.status?.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate mb-2">{inquiry.service_interest}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{new Date(inquiry.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
              <Button asChild className="w-full mt-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg transition-all duration-300">
                <Link to="/admin/customer-inquiries">
                  View All Inquiries
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentContent;
