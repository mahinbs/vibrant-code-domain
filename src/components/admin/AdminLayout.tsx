import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  FileText,
  Briefcase,
  LogOut,
  MessageSquare,
  Link2,
  UserCheck,
  Menu,
  X,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: BarChart3 },
    {
      name: "Customer Inquiries",
      href: "/admin/customer-inquiries",
      icon: MessageSquare,
    },
    { name: "Trial Leads", href: "/admin/trial-leads", icon: UserCheck },
    { name: "Portfolio", href: "/admin/portfolio", icon: Briefcase },
    { name: "Case Studies", href: "/admin/case-studies", icon: FileText },
    { name: "Blogs", href: "/admin/blogs", icon: Users },
    // { name: "Link Generator", href: "/admin/link-generator", icon: Link2 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    window.location.href = "/admin/login";
  };

  const SidebarContent = () => (
    <>
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
              onClick={() => isMobile && setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-cyan-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <span className="truncate">Logout</span>
        </button>
      </nav>
    </>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex w-full">
        {/* Mobile Header with Hamburger */}
        {isMobile && (
          <div className="fixed top-0 left-0 right-0 z-50 h-14 bg-gray-900 border-b border-gray-800 flex items-center px-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-gray-900 border-gray-800 p-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <h1 className="ml-4 text-lg font-bold text-cyan-400">Admin Panel</h1>
          </div>
        )}

        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="w-64 bg-gray-900 border-r border-gray-800 h-screen fixed left-0 top-0">
            <SidebarContent />
          </div>
        )}

        {/* Main content */}
        <div className={`flex-1 overflow-y-auto min-h-screen ${isMobile ? 'pt-14' : 'ml-64'}`}>
          <div className="p-4 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
