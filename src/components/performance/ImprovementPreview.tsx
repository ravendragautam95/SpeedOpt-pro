import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import ProgressRing from './ProgressRing';

interface ImprovementPreviewProps {
  improvements: {
    step: string;
    explanation: string;
    codeExample?: string;
  }[];
  currentMetrics?: {
    overallScore: number;
    lcp: number;
    fid: number;
    cls: number;
    loadTime: number;
  };
}

const ImprovementPreview = ({ improvements, currentMetrics }: ImprovementPreviewProps) => {
  console.log('ImprovementPreview: Rendering before/after improvement preview with data:', currentMetrics);

  // Use provided metrics or fallback to default values
  const defaultMetrics = {
    overallScore: 87,
    lcp: 1.2,
    fid: 45,
    cls: 0.08,
    loadTime: 1.45
  };

  const current = currentMetrics || defaultMetrics;

  // Generate improved metrics based on current performance
  const calculateImprovedMetrics = () => {
    const improvementFactors = {
      overallScore: 1.08, // 8% improvement
      lcp: 0.75,         // 25% reduction
      fid: 0.78,         // 22% reduction
      cls: 0.5,          // 50% reduction
      loadTime: 0.76     // 24% reduction
    };

    return {
      overallScore: Math.min(100, Math.round(current.overallScore * improvementFactors.overallScore)),
      lcp: parseFloat((current.lcp * improvementFactors.lcp).toFixed(1)),
      fid: Math.round(current.fid * improvementFactors.fid),
      cls: parseFloat((current.cls * improvementFactors.cls).toFixed(2)),
      loadTime: parseFloat((current.loadTime * improvementFactors.loadTime).toFixed(1))
    };
  };

  const improvedMetrics = calculateImprovedMetrics();

  // Calculate improvement percentages
  const getImprovementPercentage = (current: number, improved: number) => {
    const percentage = Math.round(((current - improved) / current) * 100);
    return percentage > 0 ? `↓ ${percentage}% better` : `↑ ${Math.abs(percentage)}% better`;
  };

  // Get impact level based on improvement potential
  const getImpactLevel = (improvementIndex: number, totalImprovements: number) => {
    if (improvementIndex < totalImprovements * 0.3) return 'High';
    if (improvementIndex < totalImprovements * 0.7) return 'Medium';
    return 'Low';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'recommended':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'easy':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  // Calculate potential score gain
  const totalScoreGain = improvedMetrics.overallScore - current.overallScore;

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-blue-600" />
          Performance Improvement Preview
        </CardTitle>
        <p className="text-gray-600">
          See the potential impact of recommended optimizations on your performance score
        </p>
      </CardHeader>
      <CardContent>
        {/* Before/After Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Current Performance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center">

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Performance</h3>
            <div className="flex justify-center mb-4">
              <ProgressRing score={current.overallScore} size={160} strokeWidth={10} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">LCP</div>
                <div className="text-lg font-bold text-gray-900">{current.lcp}s</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">FID</div>
                <div className="text-lg font-bold text-gray-900">{current.fid}ms</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">CLS</div>
                <div className="text-lg font-bold text-gray-900">{current.cls}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Load Time</div>
                <div className="text-lg font-bold text-gray-900">{current.loadTime}s</div>
              </div>
            </div>
          </motion.div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-full">
              <ArrowRight className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* Improved Performance */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center">

            <h3 className="text-xl font-semibold text-gray-900 mb-4">After Optimization</h3>
            <div className="flex justify-center mb-4">
              <ProgressRing score={improvedMetrics.overallScore} size={160} strokeWidth={10} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="text-sm text-green-600">LCP</div>
                <div className="text-lg font-bold text-green-900">{improvedMetrics.lcp}s</div>
                <div className="text-xs text-green-600">{getImprovementPercentage(current.lcp, improvedMetrics.lcp)}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="text-sm text-green-600">FID</div>
                <div className="text-lg font-bold text-green-900">{improvedMetrics.fid}ms</div>
                <div className="text-xs text-green-600">{getImprovementPercentage(current.fid, improvedMetrics.fid)}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="text-sm text-green-600">CLS</div>
                <div className="text-lg font-bold text-green-900">{improvedMetrics.cls}</div>
                <div className="text-xs text-green-600">{getImprovementPercentage(current.cls, improvedMetrics.cls)}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="text-sm text-green-600">Load Time</div>
                <div className="text-lg font-bold text-green-900">{improvedMetrics.loadTime}s</div>
                <div className="text-xs text-green-600">{getImprovementPercentage(current.loadTime, improvedMetrics.loadTime)}</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Improvement Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Recommended Optimizations
          </h3>
          <div className="space-y-4">
            {improvements.slice(0, 5).map((improvement, index) => {
              const impact = getImpactLevel(index, improvements.length);
              const pointsGain = Math.round((totalScoreGain / improvements.length) * (impact === 'High' ? 1.5 : impact === 'Medium' ? 1 : 0.5));
              
              return (
                <motion.div
                  key={improvement.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="p-4 bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">

                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getStatusIcon('recommended')}
                      <h4 className="font-semibold text-gray-900">{improvement.step}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getImpactColor(impact)}>
                        {impact} Impact
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        +{pointsGain} points
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{improvement.explanation}</p>
                  {improvement.codeExample && (
                    <div className="text-xs text-gray-500">
                      <strong>Code Example:</strong>
                      <pre className="bg-gray-50 p-3 rounded text-sm overflow-x-auto mt-2">
                        <code>{improvement.codeExample}</code>
                      </pre>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Expected Results Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">

          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Expected Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+{totalScoreGain}</div>
              <div className="text-sm text-gray-600">Performance Score Gain</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{improvements.length}</div>
              <div className="text-sm text-gray-600">Optimization Opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(((current.loadTime - improvedMetrics.loadTime) / current.loadTime) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Faster Load Time</div>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 mt-4">
            Implementing these optimizations could improve your overall performance score by {totalScoreGain} points 
            and reduce page load time by {(current.loadTime - improvedMetrics.loadTime).toFixed(1)} seconds, 
            significantly enhancing user experience and SEO rankings.
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ImprovementPreview;