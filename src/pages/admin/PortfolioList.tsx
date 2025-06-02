
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

const services = [
  { id: 'web-apps', label: 'Web Applications' },
  { id: 'saas', label: 'SAAS Solutions' },
  { id: 'mobile-apps', label: 'Mobile Applications' },
  { id: 'ai-calling', label: 'AI Calling Agency' },
  { id: 'ai-automation', label: 'AI Automation' }
];

const PortfolioList = () => {
  const [projects, setProjects] = useState(adminDataService.getProjects());
  const [showRecovery, setShowRecovery] = useState(false);
  const { toast } = useToast();

  // Refresh data on mount and storage changes
  useEffect(() => {
    const refreshData = () => {
      console.log('PortfolioList - Refreshing data...');
      setProjects(adminDataService.getProjects());
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
    if (confirm('Are you sure you want to delete this portfolio?')) {
      try {
        adminDataService.deleteProject(id);
        setProjects(adminDataService.getProjects());
        toast({
          title: "Portfolio deleted",
          description: "The portfolio has been successfully deleted.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete portfolio. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDebugLocalStorage = () => {
    adminDataService.debugLocalStorage();
    // Refresh the data
    setProjects(adminDataService.getProjects());
  };

  const handleDataRestored = () => {
    setProjects(adminDataService.getProjects());
    setShowRecovery(false);
  };

  const getServiceLabel = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.label : serviceId;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Management</h1>
          <p className="text-gray-600">Manage your portfolio projects</p>
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
            <Link to="/secure-management-portal-x7k9/portfolios/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Portfolio
            </Link>
          </Button>
        </div>
      </div>

      {showRecovery && (
        <DataRecoveryPanel onDataRestored={handleDataRestored} />
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Portfolios ({projects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No portfolios found</p>
              <p className="text-sm text-gray-400 mb-4">
                Your data might be lost. Try using the Recovery panel above or create a new portfolio.
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={() => setShowRecovery(true)}>
                  <Shield className="h-4 w-4 mr-2" />
                  Try Recovery
                </Button>
                <Button asChild>
                  <Link to="/secure-management-portal-x7k9/portfolios/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Create new portfolio
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Technologies</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>{getServiceLabel(project.serviceId)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
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
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/case-study/${project.id}`} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/secure-management-portal-x7k9/portfolios/edit/${project.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(project.id)}>
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
