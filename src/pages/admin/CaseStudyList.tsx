
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminDataService } from '@/services/adminDataService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, ExternalLink, Loader2, ArrowLeft } from 'lucide-react';
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

const CaseStudyList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await adminDataService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);
  
  // Filter projects that have case study content
  const caseStudies = projects.filter(p => p.challenge && p.solution);

  const getServiceLabel = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    return service ? service.label : serviceId;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading case studies...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild>
          <Link to="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">Case Study Management</h1>
          <p className="text-gray-600">Manage your case studies</p>
        </div>
        <Button asChild>
          <Link to="/admin/portfolio/new">
            Add Portfolio with Case Study
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Case Studies ({caseStudies.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {caseStudies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No case studies found</p>
              <p className="text-sm text-gray-400 mb-4">
                Case studies are created by adding Challenge and Solution content to portfolios.
              </p>
              <Button asChild>
                <Link to="/admin/portfolio/new">
                  Create Portfolio with Case Study
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Has Challenge</TableHead>
                  <TableHead>Has Solution</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {caseStudies.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>{project.client}</TableCell>
                    <TableCell>{getServiceLabel(project.serviceId)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        project.challenge ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {project.challenge ? 'Yes' : 'No'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        project.solution ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {project.solution ? 'Yes' : 'No'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/case-study/${project.id}`} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/admin/portfolio/edit/${project.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
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

export default CaseStudyList;
