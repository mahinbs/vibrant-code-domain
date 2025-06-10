
import { useState, useEffect } from 'react';
import { adminDataService } from '@/services/adminDataService';
import { customerInquiryService } from '@/services/customerInquiryService';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import DataRecoveryPanel from '@/components/admin/DataRecoveryPanel';
import DataMigrationPanel from '@/components/admin/DataMigrationPanel';
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardStats from '@/components/admin/dashboard/DashboardStats';
import QuickActions from '@/components/admin/dashboard/QuickActions';
import RecentContent from '@/components/admin/dashboard/RecentContent';

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

        <DashboardStats 
          totalProjects={totalProjects}
          totalBlogs={totalBlogs}
          totalInquiries={totalInquiries}
          newInquiries={newInquiries}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <QuickActions />
          <DataMigrationPanel />
        </div>

        <RecentContent 
          recentProjects={recentProjects}
          recentBlogs={recentBlogs}
          recentInquiries={recentInquiries}
        />

        <DataRecoveryPanel onDataRestored={handleDataRestored} />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
