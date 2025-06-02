
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Download, Upload, RefreshCw, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { dataBackupService, BackupData } from '@/services/dataBackupService';
import { adminDataService } from '@/services/adminDataService';

interface DataRecoveryPanelProps {
  onDataRestored: () => void;
}

const DataRecoveryPanel = ({ onDataRestored }: DataRecoveryPanelProps) => {
  const [backupHistory, setBackupHistory] = useState(dataBackupService.getBackupHistory());
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const handleValidateData = async () => {
    setIsValidating(true);
    const validation = dataBackupService.validateDataIntegrity();
    setIsValidating(false);

    if (validation.isValid) {
      toast({
        title: "Data Integrity Check Passed",
        description: "Your data is intact and valid.",
      });
    } else {
      toast({
        title: "Data Integrity Issues Found",
        description: `Issues: ${validation.issues.join(', ')}`,
        variant: "destructive",
      });
    }
  };

  const handleCreateBackup = () => {
    const projects = adminDataService.getProjects();
    const blogs = adminDataService.getBlogs();
    
    const success = dataBackupService.createBackup(projects, blogs);
    if (success) {
      setBackupHistory(dataBackupService.getBackupHistory());
      toast({
        title: "Backup Created",
        description: "Your data has been backed up successfully.",
      });
    } else {
      toast({
        title: "Backup Failed",
        description: "Could not create backup. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRestoreBackup = (backup: BackupData) => {
    const success = dataBackupService.restoreFromBackup(backup);
    if (success) {
      onDataRestored();
      toast({
        title: "Data Restored",
        description: `Data restored from backup created on ${new Date(backup.timestamp).toLocaleString()}`,
      });
    } else {
      toast({
        title: "Restore Failed",
        description: "Could not restore backup. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Data Recovery & Backup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={handleValidateData} disabled={isValidating}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isValidating ? 'animate-spin' : ''}`} />
            Validate Data
          </Button>
          <Button onClick={handleCreateBackup} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Create Backup
          </Button>
        </div>

        {backupHistory.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Available Backups</h4>
            <div className="space-y-2">
              {backupHistory.map((backup, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="text-sm font-medium">
                      {formatDate(backup.timestamp)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {backup.projects.length} portfolios, {backup.blogs.length} blogs
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRestoreBackup(backup)}
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Restore
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {backupHistory.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
            <p>No backups available</p>
            <p className="text-xs">Create your first backup to protect your data</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataRecoveryPanel;
