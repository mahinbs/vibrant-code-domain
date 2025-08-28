
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { dataMigrationService } from '@/services/dataMigrationService';

const DataMigrationPanel = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [dataStatus, setDataStatus] = useState(null);
  const { toast } = useToast();

  const checkCurrentData = async () => {
    setIsChecking(true);
    try {
      const status = await dataMigrationService.checkDataExists();
      setDataStatus(status);
      
      if (status.hasData) {
        toast({
          title: "Data Found",
          description: `Found ${status.projectsCount} portfolios and ${status.blogsCount} blog posts in database.`,
        });
      } else {
        toast({
          title: "No Data Found",
          description: "Database is empty. You can migrate your static data now.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check database status.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const migrateStaticData = async () => {
    setIsMigrating(true);
    try {
      const result = await dataMigrationService.migrateAllData();
      
      if (result.success) {
        toast({
          title: "Migration Successful! 🎉",
          description: `Migrated ${result.projectsCount} portfolios and ${result.blogsCount} blog posts to database.`,
        });
        // Refresh data status
        await checkCurrentData();
      } else {
        toast({
          title: "Migration Failed",
          description: result.error || "Unknown error during migration.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Migration Failed",
        description: "An error occurred during migration.",
        variant: "destructive",
      });
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Database className="h-5 w-5 text-cyan-400" />
          Data Migration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={checkCurrentData} 
            disabled={isChecking}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <CheckCircle className={`h-4 w-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
            Check Database
          </Button>
          
          <Button 
            onClick={migrateStaticData} 
            disabled={isMigrating || (dataStatus?.hasData && dataStatus.projectsCount > 0)}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            <Upload className={`h-4 w-4 mr-2 ${isMigrating ? 'animate-spin' : ''}`} />
            {isMigrating ? 'Migrating...' : 'Migrate Static Data'}
          </Button>
        </div>

        {dataStatus && (
          <div className="p-4 border border-gray-600 rounded-lg bg-gray-700/50">
            <div className="flex items-center gap-2 mb-2">
              {dataStatus.hasData ? (
                <CheckCircle className="h-5 w-5 text-green-400" />
              ) : (
                <AlertCircle className="h-5 w-5 text-orange-400" />
              )}
              <span className="font-medium text-white">
                {dataStatus.hasData ? 'Database Has Data' : 'Database Empty'}
              </span>
            </div>
            <div className="text-sm text-gray-300">
              <p>Portfolios: {dataStatus.projectsCount}</p>
              <p>Blog Posts: {dataStatus.blogsCount}</p>
            </div>
          </div>
        )}

        <div className="text-sm text-gray-400">
          <p><strong>Migration includes:</strong></p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>RetailMax E-commerce Platform</li>
            <li>MedCare Healthcare Portal</li>
            <li>ProjectFlow Management Platform</li>
            <li>LeadGen AI System</li>
            <li>6 Featured Blog Posts (AI, PWA, SaaS, etc.)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataMigrationPanel;
