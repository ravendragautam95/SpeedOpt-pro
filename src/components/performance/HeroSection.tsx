import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { ProgressRing } from '../ui/progress-ring';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface HeroSectionProps {
  overallScore: {
    mobile: number;
    desktop: number;
  };
  previousScore: {
    mobile: number;
    desktop: number;
  };
  trend: 'improving' | 'declining' | 'stable';
  lastUpdated: string;
}

const HeroSection = ({ overallScore, previousScore, trend, lastUpdated }: HeroSectionProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'improving':
        return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case 'declining':
        return <ArrowDownRight className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendText = () => {
    switch (trend) {
      case 'improving':
        return 'Performance is improving';
      case 'declining':
        return 'Performance needs attention';
      default:
        return 'Performance is stable';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Card className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Mobile Score</h3>
              <ProgressRing score={overallScore.mobile} />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Desktop Score</h3>
              <ProgressRing score={overallScore.desktop} />
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex items-center gap-2 mb-2">
              {getTrendIcon()}
              <span className="text-sm font-medium">{getTrendText()}</span>
            </div>
            <p className="text-sm text-gray-500">
              Last updated: {new Date(lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default HeroSection;