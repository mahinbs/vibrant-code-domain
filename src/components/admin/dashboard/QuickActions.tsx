
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, MessageSquare, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickActions = () => {
  return (
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
        <Button asChild className="w-full justify-start bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-lg transition-all duration-300">
          <Link to="/admin/blogs/new">
            <FileText className="h-4 w-4 mr-3" />
            Write New Blog Post
          </Link>
        </Button>
        <Button asChild className="w-full justify-start bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-lg transition-all duration-300">
          <Link to="/admin/customer-inquiries">
            <MessageSquare className="h-4 w-4 mr-3" />
            Manage Customer Inquiries
          </Link>
        </Button>
        <Button asChild className="w-full justify-start bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg transition-all duration-300">
          <Link to="/admin/case-studies">
            <Users className="h-4 w-4 mr-3" />
            Manage Case Studies
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
