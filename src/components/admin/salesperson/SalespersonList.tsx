import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Copy, Edit, Trash2, ExternalLink } from 'lucide-react';
import { SalespersonLink, salespersonLinkService } from '@/services/salespersonLinkService';

interface SalespersonListProps {
  salespersons: SalespersonLink[];
  onEdit: (salesperson: SalespersonLink) => void;
  onRefresh: () => void;
}

export const SalespersonList: React.FC<SalespersonListProps> = ({
  salespersons,
  onEdit,
  onRefresh
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(`https://${url}`);
    toast.success('Link copied to clipboard!');
  };

  const handleCopyAllLinks = (salesperson: SalespersonLink) => {
    const links = salespersonLinkService.generateLinks(salesperson);
    const allLinks = links.map(link => `${link.serviceName}: https://${link.url}`).join('\n');
    navigator.clipboard.writeText(allLinks);
    toast.success('All links copied to clipboard!');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this salesperson?')) {
      return;
    }

    setDeletingId(id);
    try {
      await salespersonLinkService.deleteSalespersonLink(id);
      toast.success('Salesperson deleted successfully!');
      onRefresh();
    } catch (error) {
      console.error('Error deleting salesperson:', error);
      toast.error('Failed to delete salesperson');
    } finally {
      setDeletingId(null);
    }
  };

  if (salespersons.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">No salespersons added yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {salespersons.map((salesperson) => {
        const links = salespersonLinkService.generateLinks(salesperson);
        
        return (
          <Card key={salesperson.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {salesperson.display_name}
                    {!salesperson.is_active && (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{salesperson.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopyAllLinks(salesperson)}
                  >
                    <Copy className="h-4 w-4" />
                    Copy All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(salesperson)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(salesperson.id!)}
                    disabled={deletingId === salesperson.id}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="font-medium">Generated Links:</h4>
                {links.map((link) => (
                  <div
                    key={link.service}
                    className="flex items-center justify-between p-2 bg-muted rounded"
                  >
                    <div>
                      <span className="font-medium">{link.serviceName}</span>
                      <p className="text-sm text-muted-foreground">
                        https://{link.url}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyLink(link.url)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`https://${link.url}`, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};