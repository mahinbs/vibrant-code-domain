
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Users, FileText, Briefcase, LogOut, MessageSquare, Link2 } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: BarChart3 },
    { name: 'Customer Inquiries', href: '/admin/customer-inquiries', icon: MessageSquare },
    { name: 'Portfolio', href: '/admin/portfolio', icon: Briefcase },
    { name: 'Case Studies', href: '/admin/case-studies', icon: FileText },
    { name: 'Blogs', href: '/admin/blogs', icon: Users },
    { name: 'Link Generator', href: '/admin/link-generator', icon: Link2 },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen relative">
          <div className="p-6">
            <h1 className="text-xl font-bold text-cyan-400">Admin Panel</h1>
          </div>
          <nav className="px-4 space-y-2 pb-20">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-cyan-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-4 py-3 w-full text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">Logout</span>
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
