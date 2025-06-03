// Data backup and recovery service
export interface BackupData {
  projects: any[];
  blogs: any[];
  timestamp: string;
  version: string;
}

const BACKUP_KEY = 'admin_data_backup';
const BACKUP_HISTORY_KEY = 'admin_backup_history';
const MAX_BACKUPS = 5;

export const dataBackupService = {
  // Create automatic backup before any data operation
  createBackup: (projects: any[], blogs: any[]) => {
    console.log('DataBackupService - Creating backup...');
    const backup: BackupData = {
      projects,
      blogs,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    try {
      // Store current backup
      localStorage.setItem(BACKUP_KEY, JSON.stringify(backup));
      
      // Maintain backup history
      const history = dataBackupService.getBackupHistory();
      history.unshift(backup);
      
      // Keep only last MAX_BACKUPS
      const trimmedHistory = history.slice(0, MAX_BACKUPS);
      localStorage.setItem(BACKUP_HISTORY_KEY, JSON.stringify(trimmedHistory));
      
      console.log('DataBackupService - Backup created successfully:', backup);
      return true;
    } catch (error) {
      console.error('DataBackupService - Failed to create backup:', error);
      return false;
    }
  },

  // Get the latest backup
  getLatestBackup: (): BackupData | null => {
    try {
      const backup = localStorage.getItem(BACKUP_KEY);
      return backup ? JSON.parse(backup) : null;
    } catch (error) {
      console.error('DataBackupService - Failed to get latest backup:', error);
      return null;
    }
  },

  // Get backup history
  getBackupHistory: (): BackupData[] => {
    try {
      const history = localStorage.getItem(BACKUP_HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('DataBackupService - Failed to get backup history:', error);
      return [];
    }
  },

  // Restore from backup
  restoreFromBackup: (backup: BackupData) => {
    console.log('DataBackupService - Restoring from backup:', backup);
    try {
      localStorage.setItem('admin_projects', JSON.stringify(backup.projects));
      localStorage.setItem('admin_blogs', JSON.stringify(backup.blogs));
      
      // Trigger storage events for reactivity
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'admin_projects',
        newValue: JSON.stringify(backup.projects)
      }));
      
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'admin_blogs',
        newValue: JSON.stringify(backup.blogs)
      }));
      
      console.log('DataBackupService - Restore completed successfully');
      return true;
    } catch (error) {
      console.error('DataBackupService - Failed to restore backup:', error);
      return false;
    }
  },

  // Validate localStorage data integrity
  validateDataIntegrity: () => {
    console.log('DataBackupService - Validating data integrity...');
    const issues = [];
    
    try {
      // Check if keys exist
      const projectsData = localStorage.getItem('admin_projects');
      const blogsData = localStorage.getItem('admin_blogs');
      
      if (projectsData === null) {
        issues.push('Projects data is missing from localStorage');
      } else {
        try {
          JSON.parse(projectsData);
        } catch {
          issues.push('Projects data is corrupted');
        }
      }
      
      if (blogsData === null) {
        issues.push('Blogs data is missing from localStorage');
      } else {
        try {
          JSON.parse(blogsData);
        } catch {
          issues.push('Blogs data is corrupted');
        }
      }
      
      console.log('DataBackupService - Validation complete. Issues found:', issues);
      return { isValid: issues.length === 0, issues };
    } catch (error) {
      console.error('DataBackupService - Validation failed:', error);
      return { isValid: false, issues: ['Validation process failed'] };
    }
  }
};
