
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { AdminProject } from '@/services/adminDataService';

interface ResultsMetricsSectionProps {
  formData: AdminProject;
  setFormData: React.Dispatch<React.SetStateAction<AdminProject>>;
}

const ResultsMetricsSection = ({ formData, setFormData }: ResultsMetricsSectionProps) => {
  const [metricLabel, setMetricLabel] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [metricDescription, setMetricDescription] = useState('');

  const addDetailedMetric = () => {
    if (metricLabel.trim() && metricValue.trim() && metricDescription.trim()) {
      setFormData(prev => ({
        ...prev,
        detailedMetrics: [...prev.detailedMetrics, {
          label: metricLabel.trim(),
          value: metricValue.trim(),
          description: metricDescription.trim()
        }]
      }));
      setMetricLabel('');
      setMetricValue('');
      setMetricDescription('');
    }
  };

  const removeDetailedMetric = (index: number) => {
    setFormData(prev => ({
      ...prev,
      detailedMetrics: prev.detailedMetrics.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Results & Impact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <Input
            value={metricLabel}
            onChange={(e) => setMetricLabel(e.target.value)}
            placeholder="Metric label"
          />
          <Input
            value={metricValue}
            onChange={(e) => setMetricValue(e.target.value)}
            placeholder="Value (e.g., +75%)"
          />
          <Input
            value={metricDescription}
            onChange={(e) => setMetricDescription(e.target.value)}
            placeholder="Description"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDetailedMetric())}
          />
          <Button type="button" onClick={addDetailedMetric}>
            <Plus className="h-4 w-4 mr-2" />
            Add Metric
          </Button>
        </div>
        
        <div className="space-y-2">
          {formData.detailedMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded border">
              <div>
                <span className="font-semibold">{metric.label}:</span>
                <span className="ml-2 text-blue-600">{metric.value}</span>
                <p className="text-sm text-gray-600">{metric.description}</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => removeDetailedMetric(index)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsMetricsSection;
