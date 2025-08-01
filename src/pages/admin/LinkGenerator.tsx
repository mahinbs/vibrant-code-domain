import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
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
      <div className="flex items-center justify-center h-48">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Link Generator</h1>
          <p className="text-muted-foreground">
            Generate personalized service links for your sales team
          </p>
        </div>
        {!showForm && (
          <Button onClick={handleAdd}>
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
          <Card>
            <CardHeader>
              <CardTitle>How it works</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Add salespersons to generate personalized links in the format: 
                <code className="mx-1 px-2 py-1 bg-muted rounded">
                  boostmysites.in/[salesperson-name]/[service]
                </code>
              </p>
              <p className="text-muted-foreground mt-2">
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
  );
};