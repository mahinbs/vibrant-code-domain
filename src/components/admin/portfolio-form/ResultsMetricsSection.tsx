
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';
import { AdminProject } from '@/services/adminDataService';

interface ResultsMetricsSectionProps {
  formData: AdminProject;
  setFormData: (field: string, value: unknown) => void;
}

const ResultsMetricsSection = ({ formData, setFormData }: ResultsMetricsSectionProps) => {
  const [metricLabel, setMetricLabel] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [metricDescription, setMetricDescription] = useState('');

  const addDetailedMetric = () => {
    if (metricLabel.trim() && metricValue.trim() && metricDescription.trim()) {
      setFormData('detailedMetrics', [...formData.detailedMetrics, {
        label: metricLabel.trim(),
        value: metricValue.trim(),
        description: metricDescription.trim()
      }]);
      setMetricLabel('');
      setMetricValue('');
      setMetricDescription('');
    }
  };

  const removeDetailedMetric = (index: number) => {
    setFormData('detailedMetrics', formData.detailedMetrics.filter((_, i) => i !== index));
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Results & Impact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <Input
            value={metricLabel}
            onChange={(e) => setMetricLabel(e.target.value)}
            placeholder="Metric label"
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
          />
          <Input
            value={metricValue}
            onChange={(e) => setMetricValue(e.target.value)}
            placeholder="Value (e.g., +75%)"
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
          />
          <Input
            value={metricDescription}
            onChange={(e) => setMetricDescription(e.target.value)}
            placeholder="Description"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDetailedMetric())}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
          />
          <Button type="button" onClick={addDetailedMetric} className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Metric
          </Button>
        </div>
        
        <div className="space-y-2">
          {formData.detailedMetrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-700/50 p-3 rounded border border-gray-600">
              <div>
                <span className="font-semibold text-white">{metric.label}:</span>
                <span className="ml-2 text-cyan-400">{metric.value}</span>
                <p className="text-sm text-gray-300">{metric.description}</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => removeDetailedMetric(index)} className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
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
