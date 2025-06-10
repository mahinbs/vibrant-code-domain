
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, FileText, MessageSquare, AlertCircle } from 'lucide-react';

interface DashboardStatsProps {
  totalProjects: number;
  totalBlogs: number;
  totalInquiries: number;
  newInquiries: number;
}

const DashboardStats = ({ totalProjects, totalBlogs, totalInquiries, newInquiries }: DashboardStatsProps) => {
  return (
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
  );
};

export default DashboardStats;
