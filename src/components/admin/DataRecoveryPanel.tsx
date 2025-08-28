
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

  const handleCreateBackup = async () => {
    try {
      const projects = await adminDataService.getProjects();
      const blogs = await adminDataService.getBlogs();
      
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
    } catch (error) {
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
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Shield className="h-5 w-5 text-cyan-400" />
          Data Recovery & Backup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={handleValidateData} 
            disabled={isValidating}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isValidating ? 'animate-spin' : ''}`} />
            Validate Data
          </Button>
          <Button 
            onClick={handleCreateBackup} 
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Create Backup
          </Button>
        </div>

        {backupHistory.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 text-white">Available Backups</h4>
            <div className="space-y-2">
              {backupHistory.map((backup, index) => (
                <div key={index} className="flex items-center justify-between p-2 border border-gray-600 rounded bg-gray-700/50">
                  <div>
                    <div className="text-sm font-medium text-white">
                      {formatDate(backup.timestamp)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {backup.projects.length} portfolios, {backup.blogs.length} blogs
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRestoreBackup(backup)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
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
          <div className="text-center py-4 text-gray-400">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-orange-400" />
            <p>No backups available</p>
            <p className="text-xs">Create your first backup to protect your data</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataRecoveryPanel;
