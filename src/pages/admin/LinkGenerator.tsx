import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { SalespersonForm } from '@/components/admin/salesperson/SalespersonForm';
import { SalespersonList } from '@/components/admin/salesperson/SalespersonList';
import { SalespersonLink, salespersonLinkService } from '@/services/salespersonLinkService';
import { toast } from 'sonner';

export const LinkGenerator = () => {
  const [salespersons, setSalespersons] = useState<SalespersonLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSalesperson, setEditingSalesperson] = useState<SalespersonLink | undefined>();

  const loadSalespersons = async () => {
    try {
      const data = await salespersonLinkService.getSalespersonLinks();
      setSalespersons(data);
    } catch (error) {
      console.error('Error loading salespersons:', error);
      toast.error('Failed to load salespersons');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSalespersons();
  }, []);

  const handleAdd = () => {
    setEditingSalesperson(undefined);
    setShowForm(true);
  };

  const handleEdit = (salesperson: SalespersonLink) => {
    setEditingSalesperson(salesperson);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingSalesperson(undefined);
    loadSalespersons();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingSalesperson(undefined);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-48">
          <p className="text-cyan-400">Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link
                to="/admin"
                className="flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Link>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Link Generator
            </h1>
            <p className="text-gray-400 mt-1">
              Generate personalized service links for your sales team
            </p>
          </div>
          {!showForm && (
            <Button
              onClick={handleAdd}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium shadow-lg transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Salesperson
            </Button>
          )}
        </div>

        {showForm ? (
          <SalespersonForm
            salesperson={editingSalesperson}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        ) : (
          <>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">How it works</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Add salespersons to generate personalized links in the format:
                  <code className="mx-1 px-2 py-1 bg-gray-700 text-cyan-300 rounded border border-gray-600">
                    services.boostmysites.in/[salesperson-name]/[service]
                  </code>
                </p>
                <p className="text-gray-300 mt-2">
                  Each salesperson can have links for multiple services. Use these links for tracking and personalized landing pages.
                </p>
              </CardContent>
            </Card>

            <SalespersonList
              salespersons={salespersons}
              onEdit={handleEdit}
              onRefresh={loadSalespersons}
            />
          </>
        )}
      </div>
    </AdminLayout>
  );
};