import { Button } from '../ui/button';
import { Download } from 'lucide-react';
import { PerformanceData } from '../../services/performanceService';

interface ExportButtonProps {
  report: PerformanceData;
}

const ExportButton = ({ report }: ExportButtonProps) => {
  const handleExport = () => {
    const dataStr = JSON.stringify(report, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `performance-report-${new Date().toISOString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <Button onClick={handleExport} className="w-full">
      <Download className="w-4 h-4 mr-2" />
      Export Report
    </Button>
  );
};

export default ExportButton;