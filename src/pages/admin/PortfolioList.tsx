
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminDataService } from '@/services/adminDataService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, ExternalLink, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const services = [
  { id: 'web-apps', label: 'Web Applications' },
  { id: 'saas', label: 'SaaS Solutions' },
  { id: 'mobile-apps', label: 'Mobile Applications' },
  { id: 'ai-automation', label: 'AI Automation' },
  { id: 'ai-calling', label: 'AI Calling' },
  { id: 'uxui-design', label: 'UX/UI Design' },
  { id: 'cloud-computing', label: 'Cloud Computing Services' },
  { id: 'ai-development', label: 'AI Development' },
  { id: 'ar-vr-development', label: 'AR/VR Development' },
  { id: 'blockchain-development', label: 'Blockchain Development' },
  { id: 'chatbot-development', label: 'Chatbot Development' },
  { id: 'data-analytics', label: 'Data Analytics & Business Intelligence' },
  { id: 'game-development', label: 'Game Development' },
  { id: 'iot-development', label: 'IoT Development' }
];

const PortfolioList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await adminDataService.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast({
        title: "Error",
        description: "Failed to load portfolios. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio?')) {
      try {
        await adminDataService.deleteProject(id);
        await loadProjects(); // Reload the list
        toast({
          title: "Portfolio deleted",
          description: "The portfolio has been successfully deleted.",
        });
      } catch (error) {
        console.error('Error deleting project:', error);
        toast({
          title: "Error",
          description: "Failed to delete portfolio. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const getServiceLabel = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.label : serviceId;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        <span className="ml-2 text-white">Loading portfolios...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-3">
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild className="border-gray-600 text-gray-900 hover:bg-gray-700 hover:text-white">
          <Link to="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-black">Portfolio Management</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
          <Link to="/admin/portfolio/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Portfolio
          </Link>
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">All Portfolios ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No portfolios found</p>
              <Button asChild className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                <Link to="/admin/portfolio/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create your first portfolio
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Title</TableHead>
                  <TableHead className="text-gray-300">Client</TableHead>
                  <TableHead className="text-gray-300">Service</TableHead>
                  <TableHead className="text-gray-300">Technologies</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id} className="border-gray-700 hover:bg-gray-700/50">
                    <TableCell className="font-medium text-white">{project.title}</TableCell>
                    <TableCell className="text-gray-300">{project.client}</TableCell>
                    <TableCell className="text-gray-300">{getServiceLabel(project.serviceId)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="bg-gray-700 text-gray-200 px-2 py-1 rounded text-xs border border-gray-600">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-gray-500 text-xs">+{project.technologies.length - 3} more</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild className="border-gray-600 text-gray-900 hover:bg-gray-700 hover:text-white">
                          <Link to={`/case-study/${project.id}`} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild className="border-gray-600 text-gray-900 hover:bg-gray-700 hover:text-white">
                          <Link to={`/admin/portfolio/edit/${project.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(project.id)} className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
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

export default PortfolioList;
